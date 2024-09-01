function sendMessage() {
    const userInput = document.getElementById('user-input').value.trim();
    if (userInput === '') return;

    // Display user message
    displayMessage(userInput, 'user-message');

    // Clear the input field
    document.getElementById('user-input').value = '';

    // Fetch and display bot response with suggestions
    fetchBotResponse(userInput);
}

function displayMessage(message, className) {
    const chatbotBody = document.getElementById('chatbot-body');
    const messageElement = document.createElement('div');
    messageElement.className = className;
    messageElement.textContent = message;
    chatbotBody.appendChild(messageElement);
    chatbotBody.scrollTop = chatbotBody.scrollHeight;
}

function fetchBotResponse(userInput) {
    let botResponse = '';

    switch (userInput.toLowerCase() || userInput.toUpperCase()) {
        case 'tell me about diwali':
            botResponse = 'Diwali, also known as the Festival of Lights, is celebrated with great enthusiasm across India. It symbolizes the victory of light over darkness and good over evil.';
            displaySuggestions(['Holi', 'Rangoli', 'Indian Festivals']);
            break;
        case 'who is mahatma gandhi?':
            botResponse = 'Mahatma Gandhi, also known as the Father of the Nation, led India to independence through non-violent civil disobedience.';
            displaySuggestions(['Indian Independence Day', 'Rabindranath Tagore', 'Indian Freedom Struggle']);
            break;
        case 'what is yoga?':
            botResponse = 'Yoga is an ancient practice that originated in India over 5,000 years ago. It integrates physical postures, breathing techniques, and meditation to promote mental and physical well-being.';
            displaySuggestions(['Ayurveda', 'Meditation', 'Indian Spiritual Practices']);
            break;
        case 'what are some famous indian dishes?':
            botResponse = 'India is known for its diverse cuisine. Famous dishes include Biryani, Samosa, Butter Chicken, Paneer Tikka, Dosa, and Chole Bhature.';
            displaySuggestions(['Indian Spices', 'South Indian Cuisine', 'Street Food in India']);
            break;
        case 'what is holi?':
            botResponse = 'Holi, also known as the Festival of Colors, is a popular Hindu festival that celebrates the arrival of spring and the victory of good over evil.';
            displaySuggestions(['Diwali', 'Indian Festivals', 'Spring Festivals']);
            break;
        case 'what is the taj mahal?':
            botResponse = 'The Taj Mahal is a magnificent white marble mausoleum located in Agra, India. It was built by the Mughal Emperor Shah Jahan in memory of his wife Mumtaz Mahal and is considered one of the Seven Wonders of the World.';
            displaySuggestions(['Mughal Architecture', 'UNESCO World Heritage Sites in India', 'Agra']);
            break;
        case 'what is bharatanatyam?':
            botResponse = 'Bharatanatyam is one of the oldest classical dance forms in India, originating from Tamil Nadu. It combines expressive dance, intricate footwork, and hand gestures to tell stories and convey emotions.';
            displaySuggestions(['Kathak', 'Indian Classical Dance', 'Folk Dances of India']);
            break;
        case 'what are the vedas?':
            botResponse = 'The Vedas are ancient Hindu scriptures that form the foundation of Hindu philosophy and spirituality. They consist of four main texts: Rigveda, Samaveda, Yajurveda, and Atharvaveda.';
            displaySuggestions(['Upanishads', 'Bhagavad Gita', 'Hindu Philosophy']);
            break;
        case 'what is rangoli?':
            botResponse = 'Rangoli is a traditional Indian art form where patterns are created on the ground using colored powders, rice, or flower petals. It is commonly made during festivals like Diwali to welcome guests and bring good luck.';
            displaySuggestions(['Diwali', 'Traditional Indian Art', 'Festival Decorations']);
            break;

        case 'hello':
            botResponse = 'Hello ! How can I help?';
            displaySuggestions(['Upanishads', 'Bhagavad Gita', 'Hindu Philosophy']);
            break;

        case 'c' :
            botResponse = 'You should type full sentence, I think ! 😅';
            break;

        case 'diwali':
            botResponse = 'Diwali, also known as the Festival of Lights, is one of the most important and widely celebrated Hindu festivals in India. It symbolizes the victory of light over darkness and good over evil. Traditionally, Diwali commemorates the return of Lord Rama to his kingdom, Ayodhya, after a 14-year exile and his victory over the demon king Ravana.';
            break;
        default:
            botResponse = 'I am not sure about that. Here are some topics you can ask me about:';
            displaySuggestions(['Indian Festivals', 'Indian Cuisine', 'Indian History', 'Yoga', 'Ayurveda']);
    }

    displayMessage(botResponse, 'bot-message');
}


function startVoiceRecognition() {
    if ('webkitSpeechRecognition' in window) {
        const recognition = new webkitSpeechRecognition();
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.start();

        recognition.onresult = function(event) {
            const userVoiceInput = event.results[0][0].transcript;
            document.getElementById('user-input').value = userVoiceInput;
            sendMessage(); // Automatically send the recognized text
        };

        recognition.onerror = function(event) {
            console.error('Speech recognition error', event.error);
        };

        recognition.onspeechend = function() {
            recognition.stop();
        };
    } else {
        alert('Your browser does not support speech recognition. Please use a different browser.');
    }
}



function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
}

function botResponse(message) {
    const botMessage = document.createElement('div');
    botMessage.className = 'chat-message bot-message';
    botMessage.textContent = message;
    document.querySelector('.chatbot-body').appendChild(botMessage);
    speak(message); // Speak the bot's response
    scrollToBottom();
}



function displaySuggestions(suggestions) {
    const chatbotBody = document.getElementById('chatbot-body');
    const suggestionContainer = document.createElement('div');
    suggestionContainer.className = 'bot-suggestions';

    suggestions.forEach(topic => {
        const suggestionElement = document.createElement('button');
        suggestionElement.className = 'suggestion-button';
        suggestionElement.textContent = topic;

        suggestionElement.onclick = function(){
            console.log('suggestion clicked:',topic);
            displayMessage(topic,'user-message');

            fetchBotResponse(topic);
            
        };
        suggestionContainer.appendChild(suggestionElement);
    });

    chatbotBody.appendChild(suggestionContainer);
    chatbotBody.scrollTop = chatbotBody.scrollHeight;

}












switch (normalizedInput) {
    case normalizedInput.includes('diwali'):
        botMessageText = 'Diwali, also known as the Festival of Lights, is one of the most popular Hindu festivals celebrated with great enthusiasm in India.';
        break;
    case normalizedInput.includes('holi'):
        botMessageText = 'Holi is a vibrant festival of colors celebrated in India, marking the arrival of spring and the victory of good over evil.';
        break;
    case normalizedInput.includes('independence day'):
        botMessageText = 'Independence Day in India is celebrated on August 15th each year, marking the end of British rule in 1947.';
        break;
    case normalizedInput.includes('yoga'):
        botMessageText = 'Yoga is an ancient practice from India that promotes physical, mental, and spiritual well-being.';
        break;
    case normalizedInput.includes('taj mahal'):
        botMessageText = 'The Taj Mahal is an iconic white marble mausoleum in Agra, India, built by Mughal Emperor Shah Jahan in memory of his wife Mumtaz Mahal.';
        break;
    case normalizedInput.includes('distance between Jammu kashmir and Kerala'):
        botMessageText = 'the distance between jammu kashmir and kerala is 3,284kilometers.';
        break;
    default:
        botMessageText = 'Sorry, I am not sure about that. Can you please ask something else related to Indian culture?';
}

appendBotMessage(botMessageText);
}