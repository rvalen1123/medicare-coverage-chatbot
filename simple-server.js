const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Serve static files
app.use(express.static('public'));
app.use(express.json());

// Main route
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Medicare Coverage Assistant</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f0f4f8;
          color: #333;
        }
        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 2rem;
        }
        header {
          background-color: #005eb8;
          color: white;
          padding: 1rem 0;
          text-align: center;
        }
        h1 {
          margin: 0;
        }
        .chat-container {
          margin-top: 2rem;
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          padding: 1rem;
        }
        .messages {
          min-height: 300px;
          max-height: 500px;
          overflow-y: auto;
          padding: 1rem;
          border-bottom: 1px solid #eee;
        }
        .message {
          margin-bottom: 1rem;
          padding: 0.75rem;
          border-radius: 8px;
        }
        .user-message {
          background-color: #e6f3ff;
          margin-left: 2rem;
        }
        .assistant-message {
          background-color: #f0f4f8;
          margin-right: 2rem;
        }
        .input-area {
          display: flex;
          margin-top: 1rem;
          padding: 0.5rem;
        }
        .input-area input {
          flex: 1;
          padding: 0.75rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 1rem;
        }
        .input-area button {
          background-color: #005eb8;
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          margin-left: 0.5rem;
          border-radius: 4px;
          cursor: pointer;
          font-size: 1rem;
        }
        .input-area button:hover {
          background-color: #004a8f;
        }
        .examples {
          margin-top: 2rem;
        }
        .examples h2 {
          color: #005eb8;
        }
        .examples ul {
          padding-left: 1.5rem;
        }
        .examples li {
          margin-bottom: 0.5rem;
        }
        footer {
          text-align: center;
          margin-top: 2rem;
          padding: 1rem 0;
          color: #666;
          font-size: 0.875rem;
        }
      </style>
    </head>
    <body>
      <header>
        <div class="container">
          <h1>Medicare Coverage Assistant</h1>
        </div>
      </header>
      
      <div class="container">
        <div class="chat-container">
          <div class="messages" id="messages">
            <div class="message assistant-message">
              Hello! I'm your Medicare Coverage Assistant. How can I help you today?
            </div>
          </div>
          <div class="input-area">
            <input type="text" id="user-input" placeholder="Ask about Medicare coverage...">
            <button id="send-button">Send</button>
          </div>
        </div>
        
        <div class="examples">
          <h2>Example Questions</h2>
          <ul>
            <li>What is an LCD and how does it work?</li>
            <li>Is physical therapy covered by Medicare?</li>
            <li>What's the coverage policy for cardiac rehabilitation?</li>
            <li>Can you check the coverage status for L33789?</li>
          </ul>
        </div>
      </div>
      
      <footer>
        <div class="container">
          <p>Medicare Coverage Assistant - A simple tool for healthcare providers</p>
        </div>
      </footer>
      
      <script>
        const messagesContainer = document.getElementById('messages');
        const userInput = document.getElementById('user-input');
        const sendButton = document.getElementById('send-button');
        
        function addMessage(text, isUser) {
          const messageDiv = document.createElement('div');
          messageDiv.classList.add('message');
          messageDiv.classList.add(isUser ? 'user-message' : 'assistant-message');
          messageDiv.textContent = text;
          messagesContainer.appendChild(messageDiv);
          messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
        
        function handleSend() {
          const text = userInput.value.trim();
          if (text) {
            addMessage(text, true);
            userInput.value = '';
            
            // Simulate response after a delay
            setTimeout(() => {
              addMessage("I'm a placeholder Medicare Coverage Assistant. This is a demo version while we complete the full implementation. The complete version will provide detailed Medicare coverage information.", false);
            }, 1000);
          }
        }
        
        sendButton.addEventListener('click', handleSend);
        userInput.addEventListener('keypress', (e) => {
          if (e.key === 'Enter') {
            handleSend();
          }
        });
      </script>
    </body>
    </html>
  `);
});

// Simple API endpoint for demo purposes
app.post('/api/chat', (req, res) => {
  const { message } = req.body;
  
  // In a real app, this would call an AI service or database
  res.json({
    response: "I'm a placeholder Medicare Coverage Assistant. This is a demo version while we complete the full implementation."
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 