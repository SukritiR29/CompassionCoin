"use client";
import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user'); // Default role

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await signIn('credentials', {
                email,
                password,
                role,
                redirect: false,
            });

            if (!result.error) {
                // Redirect based on user's role
                if (role === 'admin') {
                    router.push('/dashboard/adminPortal'); // Redirect admin to admin portal
                } else {
                    router.push('/dashboard/userPortal'); // Redirect user to user portal
                }
            } else {
                // Handle login error
                console.error('Login error:', result.error);
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
            {/* Add a field for selecting the role */}
            <select value={role} onChange={(e) => setRole(e.target.value)} required>
                <option value="user">User</option>
                <option value="admin">Admin</option>
            </select>
            <button type="submit">Login</button>
        </form>
    );
};

export default LoginForm;
