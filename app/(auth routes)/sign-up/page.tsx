'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { register } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import { ApiError } from '@/app/api/api';
import css from './SignUpPage.module.css';

const SignUpPage = () => {
    const router = useRouter();
    const [error, setError] = useState('');

    const setUser = useAuthStore(state => state.setUser);

    const handleSubmit = async (formData: FormData) => {
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        console.log('Email:', email);
        console.log('Password:', password);

        try {
            const res = await register({ email, password });

            console.log('Registration response:', res);
            if (res) {
                setUser(res);
                router.push('/profile');
            } else {
                setError('Invalid email or password');
            }
        } catch (error) {
            setError(
                (error as ApiError).response?.data?.error ??
                (error as ApiError).message ??
                'Oops... some error'
            );
        }
    };

    return (
        <section className={css.mainContent}>
            <h1 className={css.formTitle}>Sign up</h1>
            <form action={handleSubmit} className={css.form}>
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
        </section>
    );
};

export default SignUpPage;