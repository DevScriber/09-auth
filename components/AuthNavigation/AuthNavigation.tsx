'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { logout } from '@/lib/api/clientApi';
import css from './AuthNavigation.module.css';

export default function AuthNavigation() {
    const router = useRouter();
    const isAuthenticated = useAuthStore(state => state.isAuthenticated);
    const clearIsAuthenticated = useAuthStore(state => state.clearIsAuthenticated);

    const handleLogout = async () => {
        try {
            await logout();
        } finally {
            // Используем finally: очищаем стор и редиректим в любом случае
            clearIsAuthenticated();
            router.push('/sign-in');
        }
    };

    if (isAuthenticated) {
        return [
            <li key="profile" className={css.navigationItem}>
                <Link href="/profile" prefetch={false} className={css.navigationLink}>
                    Profile
                </Link>
            </li>,
            <li key="logout" className={css.navigationItem}>
                <button className={css.logoutButton} onClick={handleLogout}>
                    Logout
                </button>
            </li>
        ];
    }

    return [
        <li key="signup" className={css.navigationItem}>
            <Link href="/sign-up" prefetch={false} className={css.navigationLink}>
                Register
            </Link>
        </li>,
        <li key="signin" className={css.navigationItem}>
            <Link href="/sign-in" prefetch={false} className={css.navigationLink}>
                Login
            </Link>
        </li>
    ];
}