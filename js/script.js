/**
 * EchoAI Voice Assistant
 * A modern and futuristic AI voice assistant with speech recognition and visual feedback
 */

// DOM Elements
const domElements = {
    navbar: document.getElementById('navbar'),
    mobileMenuBtn: document.getElementById('mobile-menu-btn'),
    navLinks: document.getElementById('nav-links'),
    voiceButton: document.getElementById('voice-button'),
    listeningIndicator: document.getElementById('listening-indicator'),
    statusLight: document.getElementById('status-light'),
    chatMessages: document.getElementById('chat-messages'),
    messageInput: document.getElementById('message-input'),
    sendButton: document.getElementById('send-button'),
    suggestionChips: document.querySelectorAll('.suggestion-chip')
};

// State
const appState = {
    isListening: false,
    recognition: null,
    messages: []
};

// Initialize Speech Recognition
function initSpeechRecognition() {
    // Check browser support
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        alert('Your browser does not support speech recognition. Please try Chrome or Edge.');
        return false;
    }

    // Create speech recognition instance
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    appState.recognition = new SpeechRecognition();

    // Configure recognition
    appState.recognition.continuous = false;
    appState.recognition.lang = 'en-US';
    appState.recognition.interimResults = false;
    appState.recognition.maxAlternatives = 1;

    // Speech recognition event handlers
    appState.recognition.onstart = function () {
        setListeningState(true);
        console.log('Speech recognition started');
    };

    appState.recognition.onresult = function (event) {
        const transcript = event.results[0][0].transcript;
        console.log('Result received:', transcript);

        // Add user message
        addMessageToChat('user', transcript);

        // Process the command
        processCommand(transcript);

        // Stop listening
        appState.recognition.stop();
    };

    appState.recognition.onerror = function (event) {
        console.error('Speech recognition error:', event.error);
        setListeningState(false);

        // Show error message if needed
        if (event.error === 'no-speech') {
            addAssistantMessage("I didn't hear anything. Please try again.");
        } else if (event.error === 'network') {
            addAssistantMessage("There seems to be a network issue. Please check your connection.");
        } else {
            addAssistantMessage("Sorry, there was an error. Please try again.");
        }
    };

    appState.recognition.onend = function () {
        setListeningState(false);
        console.log('Speech recognition ended');
    };

    return true;
}

// Set listening state UI
function setListeningState(isListening) {
    appState.isListening = isListening;

    if (isListening) {
        domElements.voiceButton.classList.add('listening');
        domElements.statusLight.classList.add('listening');
        domElements.listeningIndicator.classList.remove('hidden');
    } else {
        domElements.voiceButton.classList.remove('listening');
        domElements.statusLight.classList.remove('listening');
        domElements.listeningIndicator.classList.add('hidden');
    }
}

// Toggle voice recognition
function toggleVoiceRecognition() {
    if (appState.isListening) {
        appState.recognition.stop();
    } else {
        if (!appState.recognition) {
            if (!initSpeechRecognition()) return;
        }
        appState.recognition.start();
    }
}

// Process user's command
function processCommand(command) {
    // Convert to lowercase for easier matching
    const lowerCommand = command.toLowerCase();

    // Simulate processing with a short delay
    setTimeout(() => {
        let response = '';

        // Basic command matching
        if (lowerCommand.includes('hello') || lowerCommand.includes('hi')) {
            response = "Hello! How can I assist you today?";
        }
        else if (lowerCommand.includes('time')) {
            const now = new Date();
            response = `The current time is ${now.toLocaleTimeString()}.`;
        }
        else if (lowerCommand.includes('date')) {
            const now = new Date();
            response = `Today is ${now.toLocaleDateString()}.`;
        }
        else if (lowerCommand.includes('weather')) {
            response = "I'm sorry, I don't have access to real-time weather data at the moment. This would require integration with a weather API.";
        }
        else if (lowerCommand.includes('timer') || lowerCommand.includes('alarm')) {
            const matches = lowerCommand.match(/\\d+/);
            const minutes = matches ? parseInt(matches[0]) : 5;
            response = `I've set a timer for ${minutes} minutes. (Note: This is a simulation, no actual timer is set)`;
        }
        else if (lowerCommand.includes('play') && lowerCommand.includes('music')) {
            response = "I would start playing music now, but that would require integration with a music service API.";
        }
        else if (lowerCommand.includes('search')) {
            response = "I would perform a web search for you, but that would require integration with a search API.";
        }
        else if (lowerCommand.includes('joke')) {
            const jokes = [
                "Why don't scientists trust atoms? Because they make up everything!",
                "Why did the scarecrow win an award? Because he was outstanding in his field!",
                "What do you call a fake noodle? An impasta!"
            ];
            response = jokes[Math.floor(Math.random() * jokes.length)];
        }
        else if (lowerCommand.includes('thank')) {
            response = "You're welcome! Is there anything else I can help you with?";
        }
        else if (lowerCommand.includes('help')) {
            response = "I can help you with setting timers, telling jokes, providing the time and date, and more. What would you like me to do?";
        }
        else {
            response = "I'm not sure how to respond to that. You can ask me for help to see what I can do.";
        }

        // Add assistant response
        addAssistantMessage(response);
    }, 1000);
}

// Add user message to chat
function addMessageToChat(sender, text) {
    // Create message object
    const message = {
        sender,
        text,
        timestamp: new Date()
    };

    // Add to messages array
    appState.messages.push(message);

    // Create DOM elements
    const messageElement = document.createElement('div');
    messageElement.className = `message ${sender}`;

    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';

    // Add appropriate icon
    if (sender === 'user') {
        avatar.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>';
    } else {
        avatar.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><path d="M12 19v3"></path></svg>';
    }

    const bubble = document.createElement('div');
    bubble.className = 'message-bubble';
    bubble.textContent = text;

    // Assemble message
    messageElement.appendChild(avatar);
    messageElement.appendChild(bubble);

    // Add to chat
    domElements.chatMessages.appendChild(messageElement);

    // Scroll to bottom
    domElements.chatMessages.scrollTop = domElements.chatMessages.scrollHeight;

    // If user message, clear input
    if (sender === 'user') {
        domElements.messageInput.value = '';
    }
}

// Helper to add assistant message
function addAssistantMessage(text) {
    addMessageToChat('assistant', text);
}

// Handle sending message from input field
function sendMessage() {
    const message = domElements.messageInput.value.trim();
    if (message === '') return;

    // Add user message
    addMessageToChat('user', message);

    // Process the command
    processCommand(message);
}

// Initialize wave animation for the voice button
function initWaveAnimation(container) {
    // Remove any existing content
    container.innerHTML = '';

    // Add wave circles
    const numCircles = 5;
    for (let i = 0; i < numCircles; i++) {
        const circle = document.createElement('div');
        const size = (numCircles - i) / numCircles;

        circle.className = 'wave-circle';
        circle.style.width = `${size * 100}%`;
        circle.style.height = `${size * 100}%`;
        circle.style.backgroundColor = 'var(--accent)';
        circle.style.opacity = `${0.1 + (i * (0.1 / numCircles))}`;
        circle.style.position = 'absolute';
        circle.style.borderRadius = '50%';
        circle.style.animation = `wave ${2000}ms ease-in-out infinite ${i * 400}ms`;
        circle.style.transformOrigin = 'center';

        container.appendChild(circle);
    }

    // Define wave animation if not already defined
    if (!document.getElementById('wave-keyframes')) {
        const style = document.createElement('style');
        style.id = 'wave-keyframes';
        style.textContent = `
        @keyframes wave {
          0%, 100% { transform: scale(0.8); opacity: var(--base-opacity, 0.3); }
          50% { transform: scale(1); opacity: var(--max-opacity, 0.8); }
        }
      `;
        document.head.appendChild(style);
    }
}

// Add a welcome message
function addWelcomeMessage() {
    setTimeout(() => {
        addAssistantMessage("Hello! I'm SkyAI, your personal voice assistant. How can I help you today?");
    }, 500);
}

// Event listeners
function setupEventListeners() {
    // Mobile menu toggle
    domElements.mobileMenuBtn.addEventListener('click', () => {
        domElements.mobileMenuBtn.classList.toggle('active');
        domElements.navLinks.classList.toggle('active');
    });

    // Voice button
    domElements.voiceButton.addEventListener('click', toggleVoiceRecognition);

    // Send button
    domElements.sendButton.addEventListener('click', sendMessage);

    // Message input (Enter key)
    domElements.messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Suggestion chips
    domElements.suggestionChips.forEach(chip => {
        chip.addEventListener('click', () => {
            const command = chip.getAttribute('data-command');
            domElements.messageInput.value = command;
            sendMessage();
        });
    });

    // Handle smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            // Close mobile menu if open
            domElements.mobileMenuBtn.classList.remove('active');
            domElements.navLinks.classList.remove('active');

            // Scroll to section
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize application
function initApp() {
    console.log('Initializing SkyAI Voice Assistant...');

    // Get DOM elements again (in case the DOM wasn't fully loaded at the top)
    Object.keys(domElements).forEach(key => {
        if (!domElements[key] && key !== 'suggestionChips') {
            domElements[key] = document.getElementById(key);
        }
    });
    domElements.suggestionChips = document.querySelectorAll('.suggestion-chip');

    // Setup event listeners
    setupEventListeners();

    // Initialize speech recognition
    initSpeechRecognition();

    // Add welcome message
    addWelcomeMessage();

    console.log('SkyAI Voice Assistant initialized successfully');
}

// Run initialization when DOM is fully loaded
document.addEventListener('DOMContentLoaded', initApp);

// Add scroll event for navbar
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        domElements.navbar.style.backgroundColor = 'rgba(26, 33, 56, 0.95)';
        domElements.navbar.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';
    } else {
        domElements.navbar.style.backgroundColor = 'rgba(26, 33, 56, 0.9)';
        domElements.navbar.style.boxShadow = 'none';
    }
});