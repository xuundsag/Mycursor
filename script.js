// Global variables
let animationStartTime = 0;
const ANIMATION_DURATION = 60000; // 1 minute in milliseconds

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
            startMainAnimation();
        }, 500);
    }, 3000);
}

// Matrix rain effect
function initializeMatrix() {
    const canvas = document.getElementById('matrix-canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()";
    const matrixArray = matrix.split("");
    
    const fontSize = 10;
    const columns = canvas.width / fontSize;
    
    const drops = [];
    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }
    
    function drawMatrix() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00ff00';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(drawMatrix, 35);
}

// Terminal animation
function startTerminalAnimation() {
    const terminalContent = document.getElementById('terminal-content');
    const commands = [
        { text: "INITIATING SECURE CONNECTION...", type: "normal", delay: 500 },
        { text: "Connecting to remote server: 192.168.1.100", type: "normal", delay: 800 },
        { text: "Authentication required...", type: "warning", delay: 1200 },
        { text: "Bypassing firewall...", type: "normal", delay: 1600 },
        { text: "ERROR: Access denied", type: "error", delay: 2000 },
        { text: "Attempting alternative route...", type: "warning", delay: 2400 },
        { text: "Scanning for vulnerabilities...", type: "normal", delay: 2800 },
        { text: "Found: Buffer overflow in service port 3389", type: "success", delay: 3200 },
        { text: "Exploiting vulnerability...", type: "normal", delay: 3600 },
        { text: "SUCCESS: Root access granted", type: "success", delay: 4000 },
        { text: "Downloading encrypted files...", type: "normal", delay: 4400 },
        { text: "File 1/247: financial_records.enc", type: "normal", delay: 4800 },
        { text: "File 2/247: user_database.sql", type: "normal", delay: 5200 },
        { text: "File 3/247: password_hashes.txt", type: "normal", delay: 5600 },
        { text: "Decrypting data streams...", type: "normal", delay: 6000 },
        { text: "Running brute force attack on passwords...", type: "normal", delay: 6400 },
        { text: "Password cracked: admin123", type: "success", delay: 6800 },
        { text: "Accessing secure vault...", type: "normal", delay: 7200 },
        { text: "Extracting classified documents...", type: "normal", delay: 7600 },
        { text: "Installing backdoor...", type: "warning", delay: 8000 },
        { text: "Backdoor installed successfully", type: "success", delay: 8400 },
        { text: "Covering tracks...", type: "normal", delay: 8800 },
        { text: "Logs cleared", type: "success", delay: 9200 },
        { text: "Connection terminated", type: "warning", delay: 9600 },
        { text: "MISSION ACCOMPLISHED", type: "success", delay: 10000 }
    ];
    
    function displayCommand(index) {
        if (index >= commands.length) {
            // Animation complete, schedule restart
            setTimeout(() => {
                terminalContent.innerHTML = '';
                startTerminalAnimation();
            }, 5000);
            return;
        }
        
        const command = commands[index];
        const div = document.createElement('div');
        div.className = `command-line ${command.type}`;
        
        // Typing effect
        let charIndex = 0;
        div.textContent = '';
        terminalContent.appendChild(div);
        
        const typeInterval = setInterval(() => {
            if (charIndex < command.text.length) {
                div.textContent += command.text[charIndex];
                charIndex++;
            } else {
                clearInterval(typeInterval);
                setTimeout(() => displayCommand(index + 1), 200);
            }
        }, 30);
        
        // Auto scroll
        terminalContent.scrollTop = terminalContent.scrollHeight;
    }
    
    displayCommand(0);
}

// Process list animation
function animateProcesses() {
    const processList = document.getElementById('process-list');
    const processes = [
        "kernel_exploit.exe",
        "password_cracker.py",
        "network_scanner.sh",
        "data_extractor.bin",
        "crypto_miner.exe",
        "keylogger.dll",
        "backdoor_server.py",
        "wifi_deauth.sh",
        "sql_injector.rb",
        "buffer_overflow.c"
    ];
    
    function addProcess() {
        const processName = processes[Math.floor(Math.random() * processes.length)];
        const pid = Math.floor(Math.random() * 9999) + 1000;
        const cpu = Math.floor(Math.random() * 100);
        const mem = Math.floor(Math.random() * 1024);
        
        const div = document.createElement('div');
        div.className = 'process-item';
        div.innerHTML = `
            <div>PID: ${pid} | ${processName}</div>
            <div>CPU: ${cpu}% | MEM: ${mem}MB</div>
        `;
        
        processList.appendChild(div);
        
        // Remove old processes
        if (processList.children.length > 15) {
            processList.removeChild(processList.firstChild);
        }
        
        // Schedule next process
        setTimeout(addProcess, Math.random() * 3000 + 1000);
    }
    
    addProcess();
}

// Data stream animation
function animateDataStream() {
    const streamContent = document.getElementById('stream-content');
    const dataTypes = [
        "0x7f454c46010101000000000000000000",
        "GET /admin/login.php HTTP/1.1",
        "SELECT * FROM users WHERE admin=1",
        "AES-256 KEY: 3a7f8b2c9d1e4f5a6b8c7d9e0f1a2b3c",
        "PORT SCAN: 22,80,443,3389 [OPEN]",
        "PACKET CAPTURE: TCP SYN FLOOD DETECTED",
        "HASH COLLISION: MD5 VULNERABILITY FOUND",
        "BUFFER OVERFLOW: ESP 0x08048000",
        "PRIVILEGE ESCALATION: UID 0 ACHIEVED",
        "ENCRYPTED TRAFFIC: RSA-2048 BROKEN"
    ];
    
    function addDataEntry() {
        const data = dataTypes[Math.floor(Math.random() * dataTypes.length)];
        const timestamp = new Date().toLocaleTimeString();
        
        const div = document.createElement('div');
        div.innerHTML = `[${timestamp}] ${data}`;
        streamContent.appendChild(div);
        
        // Auto scroll
        streamContent.scrollTop = streamContent.scrollHeight;
        
        // Remove old entries
        if (streamContent.children.length > 50) {
            streamContent.removeChild(streamContent.firstChild);
        }
        
        // Schedule next entry
        setTimeout(addDataEntry, Math.random() * 2000 + 500);
    }
    
    addDataEntry();
}

// System status updates
function updateSystemStatus() {
    const cpuValue = document.getElementById('cpu-value');
    const ramValue = document.getElementById('ram-value');
    const netValue = document.getElementById('net-value');
    
    function updateValues() {
        const cpu = Math.floor(Math.random() * 40) + 60;
        const ram = Math.floor(Math.random() * 30) + 70;
        const net = Math.floor(Math.random() * 60) + 20;
        
        cpuValue.textContent = `${cpu}%`;
        ramValue.textContent = `${ram}%`;
        netValue.textContent = `${net}%`;
        
        // Update progress bars
        document.querySelector('.cpu-usage').style.width = `${cpu}%`;
        document.querySelector('.ram-usage').style.width = `${ram}%`;
        document.querySelector('.net-usage').style.width = `${net}%`;
        
        setTimeout(updateValues, 2000);
    }
    
    updateValues();
}

// Network nodes animation
function animateNetworkNodes() {
    const nodes = document.querySelectorAll('.node');
    
    function randomizeNodes() {
        nodes.forEach(node => {
            const rand = Math.random();
            node.className = 'node';
            
            if (rand < 0.3) {
                node.classList.add('active');
            } else if (rand < 0.5) {
                node.classList.add('scanning');
            }
        });
        
        setTimeout(randomizeNodes, 3000);
    }
    
    randomizeNodes();
}

// Main animation controller
function startMainAnimation() {
    animationStartTime = Date.now();
    
    // Initialize all animations
    initializeMatrix();
    startTerminalAnimation();
    animateProcesses();
    animateDataStream();
    updateSystemStatus();
    animateNetworkNodes();
    
    // Set up 1-minute restart cycle
    setTimeout(restartAnimation, ANIMATION_DURATION);
}

function restartAnimation() {
    // Clear terminal content
    document.getElementById('terminal-content').innerHTML = '';
    
    // Restart the animation cycle
    startMainAnimation();
}

// Glitch effects
function addGlitchEffects() {
    const glitchOverlay = document.querySelector('.glitch-overlay');
    
    setInterval(() => {
        if (Math.random() < 0.1) {
            glitchOverlay.style.display = 'block';
            setTimeout(() => {
                glitchOverlay.style.display = 'none';
            }, 100);
        }
    }, 5000);
}

// Window resize handler
function handleResize() {
    const canvas = document.getElementById('matrix-canvas');
    if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
}

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeLoading();
    addGlitchEffects();
    window.addEventListener('resize', handleResize);
    
    // Prevent right-click context menu for immersion
    document.addEventListener('contextmenu', e => e.preventDefault());
    
    // Prevent text selection
    document.addEventListener('selectstart', e => e.preventDefault());
});

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.keyCode);
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        // Secret effect - add more intensity
        document.body.style.filter = 'hue-rotate(180deg) saturate(2)';
        setTimeout(() => {
            document.body.style.filter = '';
        }, 5000);
        konamiCode = [];
    }
});