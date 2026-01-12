const API_BASE_URL = window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost'
    ? 'http://127.0.0.1:8000/api'
    : '/api';

const apiService = {
    async login(email, password) {
        const res = await fetch(`${API_BASE_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        if (!res.ok) throw new Error('Invalid credentials');
        return await res.json();
    },

    async signup(name, email, password) {
        const res = await fetch(`${API_BASE_URL}/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });
        if (!res.ok) throw new Error('Email already registered');
        return await res.json();
    },

    async getProducts() {
        const res = await fetch(`${API_BASE_URL}/products`);
        return await res.json();
    },

    async placeOrder(orderData) {
        const res = await fetch(`${API_BASE_URL}/orders`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData)
        });
        return await res.json();
    },

    async getOrderHistory(userId) {
        const res = await fetch(`${API_BASE_URL}/orders/${userId}`);
        return await res.json();
    }
};

// You can use these methods in your main.js to replace localStorage logic
// Example: apiService.login(email, password).then(user => localStorage.setItem('hesha_user', JSON.stringify(user)));
