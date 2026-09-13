from flask import Flask, render_template, request
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config["SECRET_KEY"] = "beginner-chat-secret"

socketio = SocketIO(app, cors_allowed_origins="*")

# Keep usernames in memory for this beginner project.
# Key = browser connection id, value = username
connected_users = {}


@app.route("/")
def home():
    return render_template("index.html")


@socketio.on("join")
def handle_join(data):
    username = data.get("username", "Guest").strip() or "Guest"
    connected_users[request.sid] = username

    emit(
        "system_message",
        {"message": f"{username} joined the chat"},
        broadcast=True,
    )


@socketio.on("chat_message")
def handle_chat_message(data):
    username = connected_users.get(request.sid, "Guest")
    message = data.get("message", "").strip()

    if not message:
        return

    emit(
        "chat_message",
        {
            "username": username,
            "message": message,
        },
        broadcast=True,
    )


@socketio.on("disconnect")
def handle_disconnect():
    username = connected_users.pop(request.sid, None)

    if username:
        emit(
            "system_message",
            {"message": f"{username} left the chat"},
            broadcast=True,
        )


if __name__ == "__main__":
    socketio.run(app, debug=True)
