import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
export default {

async fetch(request, env) {

const cors = {
"Access-Control-Allow-Origin":"*",
"Access-Control-Allow-Methods":"GET, POST, DELETE, OPTIONS",
"Access-Control-Allow-Headers":"Content-Type, Authorization"
};


if(request.method === "OPTIONS"){
return new Response(null,{headers:cors});
}

const url = new URL(request.url);


if(url.pathname === "/"){
return Response.json(
{
success:true,
message:"QLDSD Video Upload Worker Online"
},
{headers:cors}
);

}


if(
request.method === "POST" &&
url.pathname === "/api/admin/video-upload-url"
){


const auth =
request.headers.get("Authorization");


if(!auth){

return Response.json(
{
error:"Missing authorization"
},
{
status:401,
headers:cors
});

}




const body =
await request.json();



const {
filename,
contentType,
courseId,
lesson,
title
}=body;



if(!filename){

return Response.json(
{
error:"Missing filename"
},
{
status:400,
headers:cors
});

}



const key = `${courseId}/${lesson}/${filename}`;

const uploadUrl = await generatePresignedUrl(
env,
key,
contentType
);

return Response.json(
{
success:true,
uploadUrl,
key,
title,
courseId,
lesson
},
{
headers:cors
});

}

if(
request.method==="POST" &&
url.pathname==="/api/admin/video-upload-complete"
){

    const body = await request.json();

    await env.DB.prepare(
    `
    INSERT INTO videos
    (
        course_id,
        lesson,
        title,
        filename,
        r2_key,
        content_type
    )
    VALUES (?,?,?,?,?,?)
    `
    )
    .bind(
        body.courseId,
        body.lesson,
        body.title,
        body.filename,
        body.key,
        body.contentType
    )
    .run();


    return Response.json(
    {
        success:true,
        message:"Video metadata saved"
    },
    {
        headers:cors
    });

}
if(
request.method === "GET" &&
url.pathname === "/api/admin/videos"
){

    const {results} =
    await env.DB.prepare(
        `
        SELECT *
        FROM videos
        ORDER BY id DESC
        `
    )
    .all();

    return Response.json(
        {
            success:true,
            videos:results
        },
        {
            headers:cors
        });
}

if(
  request.method === "DELETE" &&
  url.pathname === "/api/admin/video-delete"
){

    const body = await request.json();

    const { id, r2_key } = body;

    if(!id || !r2_key){
        return Response.json(
            {
                error:"Missing video id or r2 key"
            },
            {
                status:400,
                headers:cors
            }
        );
    }


    // Delete from R2
    const client = new S3Client({

        region:"auto",

        endpoint:
        `https://${env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,

        credentials:{
            accessKeyId: env.R2_ACCESS_KEY_ID,
            secretAccessKey: env.R2_SECRET_ACCESS_KEY
        }

    });


    await client.send(
        new DeleteObjectCommand({
            Bucket: env.R2_BUCKET_NAME,
            Key: r2_key
        })
    );


    // Delete database record
    await env.DB.prepare(
        `
        DELETE FROM videos
        WHERE id = ?
        `
    )
    .bind(id)
    .run();


    return Response.json(
        {
            success:true,
            message:"Video deleted"
        },
        {
            headers:cors
        }
    );

}

if (
    request.method === "GET" &&
    url.pathname.startsWith("/api/course/")
) {

    const courseId = decodeURIComponent(
        url.pathname.replace("/api/course/", "")
    );

    const { results } = await env.DB.prepare(`
        SELECT
            id,
            title,
            lesson,
            r2_key,
            content_type
        FROM videos
        WHERE course_id = ?
        ORDER BY lesson, id
    `)
    .bind(courseId)
    .all();

    const lessons = results.map(video => ({
        id: video.id,
        title: video.title,
        video: video.r2_key,
        videoType: "r2",
        lesson: video.lesson,
        duration: "",
        description: ""
    }));

    return Response.json(lessons, {
        headers: cors
    });

}

if (
request.method === "GET" &&
url.pathname.startsWith("/api/video/")
){

    const key = decodeURIComponent(
        url.pathname.replace("/api/video/", "")
    );

    const object = await env.VIDEO_BUCKET.get(key);

    if(!object){

        return Response.json(
            {
                error:"Video not found",
                key
            },
            {
                status:404,
                headers:cors
            }
        );

    }


    return new Response(
        object.body,
        {
            headers:{
                ...cors,
                "Content-Type":
                    object.httpMetadata?.contentType || "video/mp4",
                "Cache-Control":
                    "public, max-age=3600"
            }
        }
    );

}

return new Response(
"Not Found",
{
status:404,
headers:cors
});


}

};

async function generatePresignedUrl(
  env,
  key,
  contentType
){

const client = new S3Client({

  region: "auto",

  endpoint:
  `https://${env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,

  credentials:{
    accessKeyId:
    env.R2_ACCESS_KEY_ID,

    secretAccessKey:
    env.R2_SECRET_ACCESS_KEY
  }

});

console.log("R2_BUCKET VALUE:", env.R2_BUCKET);
console.log("TYPE:", typeof env.R2_BUCKET);
console.log("ALL ENV KEYS:", Object.keys(env));

const command =
new PutObjectCommand({

  Bucket:
  env.R2_BUCKET_NAME,

  Key:
  key,

  ContentType:
  contentType

});


const url =
await getSignedUrl(
  client,
  command,
  {
    expiresIn: 3600
  }
);


return url;

}


async function sha256(message){

const data =
new TextEncoder().encode(message);

const hash =
await crypto.subtle.digest(
"SHA-256",
data
);

return [...new Uint8Array(hash)]
.map(b=>b.toString(16).padStart(2,"0"))
.join("");

}



async function hmac(key,data){

const cryptoKey =
await crypto.subtle.importKey(
"raw",
key,
{
name:"HMAC",
hash:"SHA-256"
},
false,
["sign"]
);


const sig =
await crypto.subtle.sign(
"HMAC",
cryptoKey,
new TextEncoder().encode(data)
);


return [...new Uint8Array(sig)]
.map(b=>b.toString(16).padStart(2,"0"))
.join("");

}



async function getSigningKey(secret,date){

const kDate =
await hmacRaw(
"AWS4"+secret,
date
);


const kRegion =
await hmacRaw(
kDate,
"auto"
);


const kService =
await hmacRaw(
kRegion,
"s3"
);


return await hmacRaw(
kService,
"aws4_request"
);

}



async function hmacRaw(key,data){

return await crypto.subtle.sign(
"HMAC",
await crypto.subtle.importKey(
"raw",
typeof key==="string"
? new TextEncoder().encode(key)
:key,
{
name:"HMAC",
hash:"SHA-256"
},
false,
["sign"]
),
new TextEncoder().encode(data)
);

}