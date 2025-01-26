document.getElementById('send-button').addEventListener('click', sendMessage);
document.getElementById('user-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    if (userInput.trim() === '') return;

    displayMessage(userInput, 'user');
    document.getElementById('user-input').value = '';
    document.getElementById('loading-indicator').style.display = 'block';

    //fetch('https://<your-custom-service-endpoint>.cognitiveservices.azure.com/language/:query-knowledgebases', {
        fetch('https://hackathonchatbot.cognitiveservices.azure.com/language/:query-knowledgebases?projectName=TeacherStudentChatBot&api-version=2021-10-01&deploymentName=test', {
        method: 'POST',
        headers: {
            //'Ocp-Apim-Subscription-Key': '<your-key>',
            'Ocp-Apim-Subscription-Key': 'D8Lokeq9fVDrgqCFNgl5iS6Lm9B3mJ02ykC4u0NamhyzqXeU2TH6JQQJ99BAACYeBjFXJ3w3AAAaACOG2Eje',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ question: userInput })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('loading-indicator').style.display = 'none';
        const botResponse = data.answers[0]?.answer || "I'm sorry, I couldn't find an answer to that question.";
        displayMessage(botResponse, 'bot');
    })
    .catch(error => {
        document.getElementById('loading-indicator').style.display = 'none';
        displayMessage("An error occurred. Please try again.", 'bot');
    });
}

function displayMessage(message, sender) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.className = sender === 'user' ? 'user-message' : 'bot-message';
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
}
