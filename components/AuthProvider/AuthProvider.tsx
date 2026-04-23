'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { checkSession, getMe } from '@/lib/api/clientApi';

const privateRoutes = ['/profile', '/notes'];

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState(true);
    const pathname = usePathname();
    const router = useRouter();
    const { setUser, clearIsAuthenticated, isAuthenticated } = useAuthStore();

    useEffect(() => {
        const initAuth = async () => {
            try {
                await checkSession();
                const user = await getMe();
                if (user) {
                    setUser(user);
                } else {
                    clearIsAuthenticated();
                }
            } catch {
                clearIsAuthenticated();
            } finally {
                setIsLoading(false);
            }
        };

        initAuth();
    }, [setUser, clearIsAuthenticated]);

    useEffect(() => {
        const isPrivateRoute = privateRoutes.some(route => pathname.startsWith(route));

        if (!isLoading && !isAuthenticated && isPrivateRoute) {
            router.push('/sign-in');
        }
    }, [isLoading, isAuthenticated, pathname, router]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return <>{children}</>;
}