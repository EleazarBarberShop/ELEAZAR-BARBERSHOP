document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('beta-login-form');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent page reload
        
        // In Alpha, this is where you will send credentials to your backend.
        // For Beta, we simply route the user to the services page.
        window.location.href = 'services.html';
    });
});
