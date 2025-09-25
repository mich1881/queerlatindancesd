from flask import Flask, send_from_directory, request
import os

app = Flask(__name__)

@app.route('/lessons-data.json')
def lessons_data():
    return send_from_directory('.', 'lessons-data.json')

@app.route('/<path:filename>')
def static_files(filename):
    return send_from_directory('.', filename)

@app.route('/')
def home():
    return send_from_directory('.', 'index.html')

@app.route('/upload-events-data', methods=['POST'])
def upload_events_data():
    if 'eventsFile' not in request.files:
        return 'No file part', 400
    file = request.files['eventsFile']
    if file.filename == '':
        return 'No selected file', 400
    if file and file.filename.endswith('.json'):
        file.save(os.path.join('.', 'events-data.json'))
        return 'File uploaded', 200
    return 'Invalid file type', 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)