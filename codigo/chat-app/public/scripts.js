document.addEventListener('DOMContentLoaded', () => {
    const sendButton = document.getElementById('send-button');
    const attachButton = document.getElementById('attach-button');
    const fileInput = document.getElementById('file-input');
    const messageInput = document.getElementById('message-input');
    const chatMessages = document.getElementById('chat-messages');

    sendButton.addEventListener('click', sendMessage);
    attachButton.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', sendFile);

    function sendMessage() {
        const message = messageInput.value;
        if (message.trim() !== "") {
            const messageElement = document.createElement('div');
            messageElement.textContent = message;
            chatMessages.appendChild(messageElement);
            messageInput.value = "";
        }
    }

    function sendFile() {
        const file = fileInput.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            fetch('/upload', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                const fileLink = document.createElement('a');
                fileLink.href = data.fileUrl;
                fileLink.textContent = file.name;
                chatMessages.appendChild(fileLink);
            })
            .catch(error => console.error('Erro ao enviar arquivo:', error));
        }
    }
});
