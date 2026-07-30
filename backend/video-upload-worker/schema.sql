CREATE TABLE videos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    course_id TEXT NOT NULL,

    lesson TEXT NOT NULL,

    title TEXT NOT NULL,

    filename TEXT NOT NULL,

    r2_key TEXT NOT NULL,

    content_type TEXT,

    uploaded_at DATETIME DEFAULT CURRENT_TIMESTAMP
);