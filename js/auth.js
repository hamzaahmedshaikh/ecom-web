const USERS_KEY = 'users';
const CURRENT_USER_KEY = 'currentUser';

function initUsers() {
    if (!localStorage.getItem(USERS_KEY)) {
        localStorage.setItem(USERS_KEY, JSON.stringify([]));
    }
}

function getUsers() {
    initUsers();
    return JSON.parse(localStorage.getItem(USERS_KEY));
}

function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function signupUser(name, email, password) {
    const users = getUsers();
    
    const existingUser = users.find(user => user.email.toLowerCase() === email.toLowerCase());
    if (existingUser) {
        return {
            success: false,
            message: 'Email already registered. Please use a different email or login.'
        };
    }
    
    const newUser = {
        id: Date.now().toString(),
        name: name,
        email: email.toLowerCase(),
        password: password,
        createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    saveUsers(users);
    
    return {
        success: true,
        message: 'Account created successfully!'
    };
}

function loginUser(email, password) {
    const users = getUsers();
    
    const user = users.find(user => user.email.toLowerCase() === email.toLowerCase());
    
    if (!user) {
        return {
            success: false,
            message: 'Email not found. Please check your email or signup.'
        };
    }
    
    if (user.password !== password) {
        return {
            success: false,
            message: 'Incorrect password. Please try again.'
        };
    }
    
    const userWithoutPassword = {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt
    };
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));
    
    return {
        success: true,
        message: 'Login successful!',
        user: userWithoutPassword
    };
}

function getCurrentUser() {
    const userJson = localStorage.getItem(CURRENT_USER_KEY);
    return userJson ? JSON.parse(userJson) : null;
}

function logout() {
    localStorage.removeItem(CURRENT_USER_KEY);
    window.location.href = 'index.html';
}

function isAuthenticated() {
    return getCurrentUser() !== null;
}

initUsers();
