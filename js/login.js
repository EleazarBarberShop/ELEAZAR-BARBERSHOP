document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('login-btn');

    loginBtn.addEventListener('click', () => {
        // Direct routing to the services catalog for Beta
        window.location.href = 'services.html';
    });
});
