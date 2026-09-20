document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('login-btn');
    const installBtn = document.getElementById('install-btn');
    const iosModal = document.getElementById('ios-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    
    let deferredPrompt = null;

    // 1. Navigation Flow
    loginBtn.addEventListener('click', () => {
        window.location.href = 'services.html';
    });

    // 2. Intercept install prompt for Android/Chrome
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
    });

    // 3. Platform Detection Helpers
    const isIos = () => {
        const userAgent = window.navigator.userAgent.toLowerCase();
        return /iphone|ipad|ipod/.test(userAgent);
    };

    const isInStandaloneMode = () => {
        return ('standalone' in window.navigator) && (window.navigator.standalone) || 
               window.matchMedia('(display-mode: standalone)').matches;
    };

    // If the app is already opened in standalone installed mode, hide the download button
    if (isInStandaloneMode()) {
        installBtn.style.display = 'none';
    }

    // 4. Handle Install Button Click
    installBtn.addEventListener('click', async () => {
        if (deferredPrompt) {
            // Android / Desktop Chromium native prompt
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            if (outcome === 'accepted') {
                installBtn.style.display = 'none';
            }
            deferredPrompt = null;
        } else if (isIos()) {
            // iOS manual installation guide
            iosModal.style.display = 'flex';
        } else {
            // Fallback for browsers that already installed it or don't support programmatic install
            alert("To install this app, tap your browser's menu (three dots) and select 'Install app' or 'Add to Home screen'.");
        }
    });

    // Close iOS Modal
    closeModalBtn.addEventListener('click', () => {
        iosModal.style.display = 'none';
    });
});
