'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import axios from 'axios';
import { useAuthStore } from '@/lib/store/authStore';
import { updateMe } from '@/lib/api/clientApi';
import css from './EditProfilePage.module.css';

export default function EditProfilePage() {
    const router = useRouter();
    const { user, setUser } = useAuthStore();
    const [username, setUsername] = useState(user?.username || '');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);

        try {
            const updatedUser = await updateMe({ username });
            setUser(updatedUser);
            router.push('/profile');
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                const serverMessage = err.response?.data?.message;
                setError(typeof serverMessage === 'string' ? serverMessage : 'Failed to update profile');
            } else {
                setError('An unexpected error occurred');
            }
        }
    };

    const handleCancel = () => {
        router.push('/profile');
    };

    if (!user) return null;

    return (
        <main className={css.mainContent}>
            <div className={css.profileCard}>
                <h1 className={css.formTitle}>Edit Profile</h1>

                <Image
                    src={user.avatar}
                    alt="User Avatar"
                    width={120}
                    height={120}
                    className={css.avatar}
                    priority
                />

                <form className={css.profileInfo} onSubmit={handleSubmit}>
                    <div className={css.usernameWrapper}>
                        <label htmlFor="username">Username:</label>
                        <input
                            id="username"
                            type="text"
                            className={css.input}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <p>Email: {user.email}</p>

                    {error && <p className={css.error}>{error}</p>}

                    <div className={css.actions}>
                        <button type="submit" className={css.saveButton}>
                            Save
                        </button>
                        <button
                            type="button"
                            className={css.cancelButton}
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}