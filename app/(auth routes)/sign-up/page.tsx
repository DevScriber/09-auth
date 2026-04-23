'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { register } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import css from './SignUpPage.module.css';

export default function SignUpPage() {
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const setUser = useAuthStore((state) => state.setUser);

    const handleFormAction = async (formData: FormData) => {
        setError(null);

        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        try {
            const userData = await register({ email, password });
            setUser(userData);
            router.push('/profile');

        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                const serverMessage = err.response?.data?.message;
                setError(typeof serverMessage === 'string' ? serverMessage : 'Registration failed');
            } else {
                setError('An unexpected error occurred');
            }
        }
    };

    return (
        <main className={css.mainContent}>
            <h1 className={css.formTitle}>Sign up</h1>
            <form action={handleFormAction} className={css.form}>
                <div className={css.formGroup}>
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        className={css.input}
                        required
                    />
                </div>

                <div className={css.formGroup}>
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        className={css.input}
                        required
                    />
                </div>

                <div className={css.actions}>
                    <button type="submit" className={css.submitButton}>
                        Register
                    </button>
                </div>

                {error && <p className={css.error}>{error}</p>}
            </form>
        </main>
    );
}