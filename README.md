# Python Chat App

A beginner-friendly real-time chat application built with Flask and Flask-SocketIO.

## Features

- Enter a username
- Join one shared chat room
- Send messages in real time
- See when users join
- See when users leave

## Tech Stack

- Python
- Flask
- Flask-SocketIO
- HTML
- CSS
- JavaScript

## Project Structure

```text
chatapp/
├── app.py
├── requirements.txt
├── templates/
│   └── index.html
└── static/
    ├── chat.js
    └── style.css
```

## Run Locally

1. Clone the repository.

```bash
git clone https://github.com/its-kpm/chatapp.git
cd chatapp
```

2. Create a virtual environment.

```bash
python3 -m venv venv
source venv/bin/activate
```

On Windows:

```bash
venv\Scripts\activate
```

3. Install dependencies.

```bash
pip install -r requirements.txt
```

4. Start the app.

```bash
python app.py
```

5. Open this address in two browser tabs to test chatting between users:

```text
http://127.0.0.1:5000
```

## How It Works

The browser connects to the Flask server using Socket.IO. When a user sends a message, the server receives it and broadcasts it to every connected browser.

This version intentionally keeps everything in memory and does not use a database, authentication, Redis, or other advanced infrastructure so the code stays easy to understand.
