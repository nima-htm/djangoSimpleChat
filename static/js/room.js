document.getElementById('message-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const messageInput = document.getElementById('message-input');
    const message = messageInput.value;
    const username = document.getElementById('username').value;
    const roomId = document.getElementById('room_id').value;

    if (message.trim() === '') return;

    fetch('/sendMessage', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': document.querySelector('[name=csrfmiddlewaretoken]').value
        },
        body: JSON.stringify({
            message: message,
            username: username,
            room_id: roomId
        })
    })
    .then(response => response.text())
    .then(data => {
        console.log(data);
        messageInput.value = ''; // Clear the input field after sending
    })
    .catch(error => console.error('Error:', error));
});

const username = document.getElementById('username').value;
const roomName = document.getElementById('room_name').value;

function fetchMessages(room, currentUsername) {
    fetch(`/getMessages/${room}/`)
        .then(response => response.text())
        .then(text => {
            console.log("Response TEXT:", text);
            try {
                const data = JSON.parse(text);
                console.log("Parsed JSON:", data);

                // Optional: display messages
                const chatBox = document.getElementById("messages-box");
                chatBox.innerHTML = "";
                data.messages.forEach(msg => {
                    const box = document.createElement("div");
                    box.classList.add("message-box");
                    if (msg.username === currentUsername) {
                        box.classList.add("current-user-message");
                    }
                    box.innerHTML = `<strong>${msg.username}</strong><hr /> ${msg.content} <p>${msg.timestamp}</p>`;
                    chatBox.appendChild(box);
                });

            } catch (err) {
                console.error("JSON parse error:", err);
            }
        });
}

fetchMessages(roomName, username);
setInterval(() => fetchMessages(roomName, username), 3000);