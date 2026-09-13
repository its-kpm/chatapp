const socket = io();

const joinSection = document.getElementById("join-section");
const chatSection = document.getElementById("chat-section");
const usernameInput = document.getElementById("username");
const messageInput = document.getElementById("message-input");
const messages = document.getElementById("messages");
const joinButton = document.getElementById("join-button");
const sendButton = document.getElementById("send-button");

joinButton.addEventListener("click", joinChat);
sendButton.addEventListener("click", sendMessage);

usernameInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        joinChat();
    }
});

messageInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        sendMessage();
    }
});

function joinChat() {
    const username = usernameInput.value.trim();

    if (!username) {
        alert("Please enter your name.");
        return;
    }

    socket.emit("join", { username });

    joinSection.classList.add("hidden");
    chatSection.classList.remove("hidden");
    messageInput.focus();
}

function sendMessage() {
    const message = messageInput.value.trim();

    if (!message) {
        return;
    }

    socket.emit("chat_message", { message });
    messageInput.value = "";
    messageInput.focus();
}

socket.on("chat_message", (data) => {
    addMessage(`${data.username}: ${data.message}`, "chat-message");
});

socket.on("system_message", (data) => {
    addMessage(data.message, "system-message");
});

function addMessage(text, className) {
    const messageElement = document.createElement("div");
    messageElement.className = className;
    messageElement.textContent = text;

    messages.appendChild(messageElement);
    messages.scrollTop = messages.scrollHeight;
}
