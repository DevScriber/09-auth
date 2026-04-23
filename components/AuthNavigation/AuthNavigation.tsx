'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { logout as apiLogout } from '@/lib/api/clientApi';
import css from './AuthNavigation.module.css';

export default function AuthNavigation() {
    const router = useRouter();
    const { isAuthenticated, clearIsAuthenticated } = useAuthStore();

    const handleLogout = async () => {
        try {
            await apiLogout();
            clearIsAuthenticated();
            router.push('/sign-in');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <>
            {isAuthenticated ? (
                <>
                    <li className={css.navigationItem}>
                        <Link href="/profile" prefetch={false} className={css.navigationLink}>
                            Profile
                        </Link>
                    </li>
                    <li className={css.navigationItem}>
                        <button className={css.logoutButton} onClick={handleLogout}>
                            Logout
                        </button>
                    </li>
                </>
            ) : (
                <>
                    <li className={css.navigationItem}>
                        <Link href="/sign-up" prefetch={false} className={css.navigationLink}>
                            Register
                        </Link>
                    </li>
                    <li className={css.navigationItem}>
                        <Link href="/sign-in" prefetch={false} className={css.navigationLink}>
                            Login
                        </Link>
                    </li>
                </>
            )}
        </>
    );
}