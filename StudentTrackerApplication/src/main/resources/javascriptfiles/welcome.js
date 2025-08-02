// Navigation auth logic
function requireAuth(action) {
    const choice = confirm('You must log in or sign up to access this feature. Press OK to log in, or Cancel to sign up.');
    if (choice) {
        window.location.href = 'login.html';
    } else {
        window.location.href = 'signup.html?from=welcome';
    }
}

// Navbar click handlers
document.getElementById('nav-home').onclick = function () {
    window.location.href = 'index.html';
};

document.getElementById('nav-all-tasks').onclick = function (e) {
    e.preventDefault();
    requireAuth('all-tasks');
};

document.getElementById('nav-completed-tasks').onclick = function (e) {
    e.preventDefault();
    requireAuth('completed-tasks');
};

// Button actions
document.getElementById('loginBtn').onclick = function () {
    window.location.href = 'login.html';
};

document.getElementById('signupBtn').onclick = function () {
    window.location.href = 'signup.html?from=welcome';
};

// Redirect if logged in
const params = new URLSearchParams(window.location.search);
const fromSignup = params.get('from') === 'signup' || params.get('from') === 'welcome';
const user = localStorage.getItem('user');
if (user && !fromSignup) {
    try {
        const userObj = JSON.parse(user);
        if (userObj.role === 'admin') {
            window.location.href = 'admin-dashboard.html';
        } else if (userObj.role === 'client') {
            window.location.href = 'client-dashboard.html';
        }
    } catch (e) {
        // Do nothing
    }
}

// Tab click navigation fallback
document.getElementById('nav-all-tasks').onclick = function (e) {
    e.preventDefault();
    window.location.href = 'index.html#tab-all';
};
document.getElementById('nav-completed-tasks').onclick = function (e) {
    e.preventDefault();
    window.location.href = 'index.html#tab-completed';
};
