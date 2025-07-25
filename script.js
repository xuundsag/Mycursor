// Global variables for the AI chat interface
let isTyping = false;
let messageHistory = [];

// AI Response templates for realistic simulation
const aiResponses = {
    greetings: [
        "Hello! I'm your Anonymous AI assistant. How can I help you today?",
        "Hi there! I'm ready to assist you with any questions or tasks.",
        "Greetings! What would you like to explore or learn about today?",
        "Hello! I'm here to help. What's on your mind?"
    ],
    
    technical: [
        "That's a fascinating technical question! Let me break this down for you...",
        "From a technical perspective, this involves several key components...",
        "This is an interesting problem that requires analyzing multiple factors...",
        "Let me explain the technical aspects of this step by step..."
    ],
    
    creative: [
        "I'd be happy to help you with that creative project! Here are some ideas...",
        "Creative work is one of my favorite areas to assist with. Let's explore...",
        "That sounds like an exciting creative challenge! Here's my approach...",
        "I love helping with creative endeavors. Let me suggest some directions..."
    ],
    
    general: [
        "That's an excellent question! Based on my analysis...",
        "I can definitely help you with that. Here's what I know...",
        "Let me provide you with a comprehensive answer...",
        "That's something I can assist with. Here's my response..."
    ],
    
    code: [
        "I'd be happy to help you with that coding task! Here's a solution...",
        "Let me write some code for you. This approach should work well...",
        "Programming is one of my strong areas. Here's how I'd approach this...",
        "I can definitely help with that code. Let me break it down..."
    ]
};

// Sample detailed responses
const detailedResponses = {
    "quantum computing": "Quantum computing is a revolutionary computational paradigm that leverages quantum mechanical phenomena like superposition and entanglement. Unlike classical bits that exist in either 0 or 1 states, quantum bits (qubits) can exist in multiple states simultaneously, enabling exponentially faster processing for certain types of problems...",
    
    "machine learning": "Machine learning is a subset of artificial intelligence that enables systems to automatically learn and improve from experience without explicit programming. It uses algorithms to build mathematical models based on training data to make predictions or decisions...",
    
    "blockchain": "Blockchain is a distributed ledger technology that maintains a continuously growing list of records, called blocks, which are linked and secured using cryptography. Each block contains a cryptographic hash of the previous block, a timestamp, and transaction data...",
    
    "cybersecurity": "Cybersecurity involves protecting digital systems, networks, and data from digital attacks, unauthorized access, and damage. It encompasses various practices including network security, application security, endpoint security, and cloud security...",
    
    "neural networks": "Neural networks are computing systems inspired by biological neural networks. They consist of interconnected nodes (neurons) that process information using a connectionist approach to computation, learning to perform tasks by considering examples..."
};

// Loading screen management
function initializeLoading() {
    const loadingScreen = document.getElementById('loading-screen');
    const mainInterface = document.getElementById('main-interface');
    
    // Show loading for 3 seconds, then transition to main interface
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            mainInterface.classList.remove('hidden');
            initializeChat();
        }, 500);
    }, 3000);
}

// Initialize chat functionality
function initializeChat() {
    const messageInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendButton');
    const charCount = document.querySelector('.char-count');
    
    // Update character count
    messageInput.addEventListener('input', () => {
        const count = messageInput.value.length;
        charCount.textContent = `${count}/500`;
        
        // Enable/disable send button
        sendButton.disabled = count === 0 || isTyping;
        
        // Color coding for character count
        if (count > 450) {
            charCount.style.color = '#ff4444';
        } else if (count > 400) {
            charCount.style.color = '#ffaa00';
        } else {
            charCount.style.color = 'var(--text-muted)';
        }
    });
    
    // Send message on Enter key
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey && !isTyping) {
            e.preventDefault();
            sendMessage();
        }
    });
    
    // Send button click
    sendButton.addEventListener('click', sendMessage);
    
    // Initialize stats animation
    animateStats();
    
    // Initialize background effects
    initializeBackgroundEffects();
}

// Send message function
function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();
    
    if (!message || isTyping) return;
    
    // Add user message
    addMessage(message, 'user');
    messageInput.value = '';
    document.querySelector('.char-count').textContent = '0/500';
    document.getElementById('sendButton').disabled = true;
    
    // Store message history
    messageHistory.push({ role: 'user', content: message });
    
    // Show typing indicator and generate AI response
    showTypingIndicator();
    setTimeout(() => {
        const aiResponse = generateAIResponse(message);
        hideTypingIndicator();
        addMessage(aiResponse, 'ai');
        messageHistory.push({ role: 'ai', content: aiResponse });
    }, 1500 + Math.random() * 2000); // Random delay between 1.5-3.5 seconds
}

// Add message to chat
function addMessage(content, sender) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    messageDiv.innerHTML = `
        <div class="message-avatar">
            <i class="fas ${sender === 'user' ? 'fa-user' : 'fa-robot'}"></i>
        </div>
        <div class="message-content">
            <div class="message-text">${content}</div>
            <div class="message-time">${currentTime}</div>
        </div>
    `;
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Show typing indicator
function showTypingIndicator() {
    isTyping = true;
    const chatMessages = document.getElementById('chatMessages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message ai-message typing-indicator';
    typingDiv.id = 'typing-indicator';
    
    typingDiv.innerHTML = `
        <div class="message-avatar">
            <i class="fas fa-robot"></i>
        </div>
        <div class="message-content">
            <div class="typing-indicator">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        </div>
    `;
    
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Hide typing indicator
function hideTypingIndicator() {
    isTyping = false;
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
    document.getElementById('sendButton').disabled = false;
}

// Generate AI response based on message content
function generateAIResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    // Check for specific topics
    for (const [topic, response] of Object.entries(detailedResponses)) {
        if (lowerMessage.includes(topic)) {
            return detailedResponses[topic];
        }
    }
    
    // Categorize message type
    let responseCategory = 'general';
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
        responseCategory = 'greetings';
    } else if (lowerMessage.includes('code') || lowerMessage.includes('function') || lowerMessage.includes('programming')) {
        responseCategory = 'code';
    } else if (lowerMessage.includes('create') || lowerMessage.includes('design') || lowerMessage.includes('write')) {
        responseCategory = 'creative';
    } else if (lowerMessage.includes('how') || lowerMessage.includes('what') || lowerMessage.includes('explain')) {
        responseCategory = 'technical';
    }
    
    // Get random response from category
    const responses = aiResponses[responseCategory];
    const baseResponse = responses[Math.floor(Math.random() * responses.length)];
    
    // Add some context based on the original message
    return generateContextualResponse(baseResponse, message);
}

// Generate contextual response
function generateContextualResponse(baseResponse, originalMessage) {
    const contextualPhrases = [
        "Based on your question about " + extractKeyTopic(originalMessage) + ", ",
        "Regarding your inquiry, ",
        "To address your question, ",
        "In response to what you've asked, ",
        ""
    ];
    
    const elaborations = [
        " This involves several important considerations that I'd be happy to explain further.",
        " There are multiple approaches we could explore together.",
        " I can provide more detailed information if you'd like to dive deeper.",
        " Feel free to ask if you need clarification on any part of this.",
        " I'm here to help you understand this topic better."
    ];
    
    const contextStart = contextualPhrases[Math.floor(Math.random() * contextualPhrases.length)];
    const elaboration = elaborations[Math.floor(Math.random() * elaborations.length)];
    
    return contextStart + baseResponse + elaboration;
}

// Extract key topic from message
function extractKeyTopic(message) {
    const words = message.toLowerCase().split(' ');
    const keyTopics = ['programming', 'coding', 'design', 'analysis', 'learning', 'development', 'technology', 'science', 'mathematics', 'business'];
    
    for (const topic of keyTopics) {
        if (message.toLowerCase().includes(topic)) {
            return topic;
        }
    }
    
    // Default fallback
    const importantWords = words.filter(word => word.length > 4);
    return importantWords.length > 0 ? importantWords[0] : 'this topic';
}

// Quick message function
function sendQuickMessage(message) {
    const messageInput = document.getElementById('messageInput');
    messageInput.value = message;
    sendMessage();
}

// Clear chat function
function clearChat() {
    const chatMessages = document.getElementById('chatMessages');
    // Keep only the initial AI greeting
    const initialMessage = chatMessages.querySelector('.ai-message');
    chatMessages.innerHTML = '';
    if (initialMessage) {
        chatMessages.appendChild(initialMessage);
    }
    messageHistory = [];
}

// Toggle settings (placeholder)
function toggleSettings() {
    // Placeholder for settings functionality
    console.log('Settings panel would open here');
}

// Animate AI stats
function animateStats() {
    function updateStats() {
        const neuralLoad = document.getElementById('neuralLoad');
        const processing = document.getElementById('processing');
        const memory = document.getElementById('memory');
        
        if (neuralLoad && processing && memory) {
            const neural = Math.floor(Math.random() * 30) + 60;
            const proc = Math.floor(Math.random() * 40) + 30;
            const mem = Math.floor(Math.random() * 20) + 80;
            
            neuralLoad.style.width = `${neural}%`;
            processing.style.width = `${proc}%`;
            memory.style.width = `${mem}%`;
            
            neuralLoad.parentElement.nextElementSibling.textContent = `${neural}%`;
            processing.parentElement.nextElementSibling.textContent = `${proc}%`;
            memory.parentElement.nextElementSibling.textContent = `${mem}%`;
        }
        
        setTimeout(updateStats, 3000 + Math.random() * 2000);
    }
    
    updateStats();
}

// Initialize background effects
function initializeBackgroundEffects() {
    // Animate neural network background
    const neuralNetwork = document.querySelector('.neural-network');
    if (neuralNetwork) {
        setInterval(() => {
            const intensity = 0.3 + Math.random() * 0.3;
            neuralNetwork.style.opacity = intensity;
        }, 5000);
    }
    
    // Add floating particles animation
    createFloatingParticles();
}

// Create floating particles effect
function createFloatingParticles() {
    const particlesContainer = document.querySelector('.floating-particles');
    if (!particlesContainer) return;
    
    // Add occasional glowing particles
    setInterval(() => {
        if (Math.random() < 0.3) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = '4px';
            particle.style.height = '4px';
            particle.style.background = 'var(--accent-green)';
            particle.style.borderRadius = '50%';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = '100%';
            particle.style.boxShadow = '0 0 10px var(--shadow-green)';
            particle.style.animation = 'float 8s linear forwards';
            
            particlesContainer.appendChild(particle);
            
            // Remove particle after animation
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 8000);
        }
    }, 2000);
}

// Handle mobile side panel
function toggleMobileSidePanel() {
    const sidePanel = document.querySelector('.side-panel');
    if (sidePanel) {
        sidePanel.classList.toggle('mobile-open');
    }
}

// Window resize handler
function handleResize() {
    // Handle mobile layout changes
    const sidePanel = document.querySelector('.side-panel');
    if (window.innerWidth <= 768 && sidePanel) {
        sidePanel.classList.remove('mobile-open');
    }
}

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeLoading();
    window.addEventListener('resize', handleResize);
    
    // Prevent right-click context menu for immersion
    document.addEventListener('contextmenu', e => e.preventDefault());
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + K to clear chat
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            clearChat();
        }
        
        // Escape to close mobile side panel
        if (e.key === 'Escape') {
            const sidePanel = document.querySelector('.side-panel');
            if (sidePanel && sidePanel.classList.contains('mobile-open')) {
                sidePanel.classList.remove('mobile-open');
            }
        }
    });
    
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
});

// Add some easter eggs for fun
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.keyCode);
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        // Secret effect - enhanced AI mode
        document.documentElement.style.setProperty('--accent-green', '#00ffff');
        document.documentElement.style.setProperty('--accent-green-dim', '#00cccc');
        addMessage("🤖 ENHANCED AI MODE ACTIVATED! Neural processing increased to maximum capacity.", 'ai');
        
        setTimeout(() => {
            document.documentElement.style.setProperty('--accent-green', '#00ff00');
            document.documentElement.style.setProperty('--accent-green-dim', '#00cc00');
        }, 10000);
        
        konamiCode = [];
    }
});