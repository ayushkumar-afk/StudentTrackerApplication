// ...existing code from auth.js...

// Common authentication check function
function checkAuth() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    // If not on login or signup page and not logged in, redirect to login
    const path = window.location.pathname;
    const isAuthPage = path.endsWith('login.html') || path.endsWith('signup.html');
    if (!currentUser && !isAuthPage) {
        window.location.href = 'login.html';
    }
    // If on login/signup page and already logged in, redirect to dashboard
    if (currentUser && isAuthPage) {
        window.location.href = 'index.html';
    }
}
// Handle Signup
const signupForm = document.getElementById('signupForm');
if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('signupName').value;
        const username = document.getElementById('signupUsername').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;
        const role = document.getElementById('signupRole').value;

        let users = JSON.parse(localStorage.getItem('users')) || [];

        const existingUser = users.find(u => u.username === username);
        if (existingUser) {
            alert("Username already exists. Please choose another.");
            return;
        }

        const newUser = { name, username, email, password, role };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        location.href = 'index.html';
    });
}

// Handle Login
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const matchedUser = users.find(u => u.username === username && u.password === password);

        if (matchedUser) {
            localStorage.setItem('currentUser', JSON.stringify(matchedUser));
            location.href = 'index.html';
        } else {
            alert("Invalid username or password.");
        }
    });
}




// 