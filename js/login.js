
document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('container');
    const loginButton = document.getElementById('login');
    const registerButton = document.getElementById('register');

    // Show Sign Up form by default
    container.classList.remove('active');

    // Toggle between Sign In and Sign Up forms
    registerButton.addEventListener('click', () => {
        container.classList.add('active');
    });

    loginButton.addEventListener('click', () => {
        container.classList.remove('active');
    });

    // Signup Form Submission
    const signupForm = document.getElementById('signup-form');
    signupForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('signup-name').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;

        if (name && email && password) {
            const user = {
                name: name,
                email: email,
                password: password,
            };
            localStorage.setItem('user', JSON.stringify(user));

            alert('Signup successful! Redirecting to Sign In...');
            container.classList.add('active'); // Switch to Sign In form
        } else {
            alert('Please fill in all fields.');
        }
    });

    // Login Form Submission
    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        const user = JSON.parse(localStorage.getItem('user'));

        if (user && user.email === email && user.password === password) {
            alert('Login successful! Redirecting to Home...');
            window.location.href = 'home.html'; // Redirect to home page
        } else {
            alert('Invalid email or password. Please try again.');
        }
    });

    // Initialize label behavior
    const inputGroups = document.querySelectorAll('.input-group');
    inputGroups.forEach((group) => {
        const input = group.querySelector('input');
        const label = group.querySelector('label');

        input.addEventListener('focus', () => {
            group.classList.add('active');
        });

        input.addEventListener('blur', () => {
            if (!input.value) {
                group.classList.remove('active');
            }
        });

        input.addEventListener('input', () => {
            if (input.value) {
                group.classList.add('active');
            } else {
                group.classList.remove('active');
            }
        });

        // Initialize the label state on page load
        if (input.value) {
            group.classList.add('active');
        }
    });
});