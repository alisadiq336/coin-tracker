const API_KEY = 'AIzaSyDY1sbV_jQh_ob6xvZafkDIY_2qhPvwOaI'; // Replace with your Gemini API key
const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}`;

document.getElementById('send-btn').addEventListener('click', async function() {
    const userInput = document.getElementById('user-input').value;
    if (userInput.trim() === "") return;

    // Display user message
    const chatBox = document.getElementById('chat-box');
    const userMessage = document.createElement('div');
    userMessage.textContent = "You: " + userInput;
    chatBox.appendChild(userMessage);

    // Clear input
    document.getElementById('user-input').value = "";

    // Get bot response from Gemini API
    try {
        const botResponse = await getGeminiResponse(userInput);
        const botMessage = document.createElement('div');
        botMessage.textContent = "Bot: " + botResponse;
        chatBox.appendChild(botMessage);
    } catch (error) {
        console.error("Error fetching response from Gemini API:", error);
        const errorMessage = document.createElement('div');
        errorMessage.textContent = "Bot: Sorry, I couldn't process your request.";
        chatBox.appendChild(errorMessage);
    }

    // Scroll to bottom
    chatBox.scrollTop = chatBox.scrollHeight;
});

async function getGeminiResponse(userInput) {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            contents: [{
                parts: [{
                    text: userInput
                }]
            }]
        })
    });

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
}