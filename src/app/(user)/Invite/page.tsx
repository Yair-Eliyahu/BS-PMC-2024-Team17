"use client";
import { Send, Loader2 } from 'lucide-react';
import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function Page() {
    const [formData, setFormData] = useState({ name: '', email: '' });
    const [message, setMessage] = useState('');
    const [showAnimation, setShowAnimation] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setMessage('');
        setShowAnimation(false);
        setLoading(true);
        try {
            const response = await fetch('/api/mail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                setShowAnimation(true);
                setFormData({ name: '', email: '' }); // Clear the fields
                setTimeout(() => setShowAnimation(false), 5000); // Hide animation after 5 seconds
                setMessage('🎉 Email Sent Successfully!');
            } else {
                setMessage('Failed to send email');
            }
        } catch (error) {
            setMessage('Failed to send email');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="text-white flex min-h-screen flex-col items-center justify-center p-6 gap-6">
            <h1 className="text-4xl mb-4 text-white font-bold">Send an Email Invite</h1>
            <form onSubmit={handleSubmit} className="text-black flex flex-col gap-4 border-2 border-gray-700 rounded-lg p-20">
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    required
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.name}
                    onChange={handleChange}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.email}
                    onChange={handleChange}
                />
                <div className="flex flex-row items-center justify-center mt-4">
                    <button
                        type="submit"
                        className="bg-blue-600 p-3 rounded-full text-white flex flex-row items-center justify-center gap-2 hover:bg-blue-700 disabled:bg-gray-400"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
                            </>
                        ) : (
                            <>
                                <Send />
                                <p>Send</p>
                            </>
                        )}
                    </button>
                </div>
            </form>
            {message && <p className="mt-4 text-center text-green-400">{message}</p>}
            {showAnimation && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    className="top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white p-4 rounded-lg shadow-lg"
                >
                    <p>{message}</p>
                </motion.div>
            )}
        </div>
    );
}
