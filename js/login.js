document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('login-btn');
    const installBtn = document.getElementById('install-btn');
    let deferredPrompt;

    // 1. Navigation Logic
    loginBtn.addEventListener('click', () => {
        window.location.href = 'services.html';
    });

    // 2. Intercept the PWA install prompt
    window.addEventListener('beforeinstallprompt', (e) => {
        // Prevent the mini-infobar from appearing on mobile
        e.preventDefault();
        // Stash the event so it can be triggered later.
        deferredPrompt = e;
        // Update UI notify the user they can install the PWA
        installBtn.hidden = false;
    });

    // 3. Handle the Install Button click
    installBtn.addEventListener('click', async () => {
        if (!deferredPrompt) {
            return;
        }
        
        // Show the native install prompt
        deferredPrompt.prompt();
        
        // Wait for the user to respond to the prompt
        const { outcome } = await deferredPrompt.userChoice;
        
        // Optionally log the outcome
        console.log(`User response to the install prompt: ${outcome}`);
        
        // We've used the prompt, and can't use it again, throw it away
        deferredPrompt = null;
        
        // Hide the button regardless of outcome
        installBtn.hidden = true;
    });
});
