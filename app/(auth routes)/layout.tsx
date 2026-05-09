'use client';

import { useEffect, useState, startTransition } from 'react';
import { useRouter } from 'next/navigation';
// import { Metadata } from 'next';

// export const metadata: Metadata = {
//     title: "Authentication | NoteHub",
//     description: "Log in to your account or create a new one to manage your notes.",
// };

type Props = {
    children: React.ReactNode;
};

export default function PublicLayout({ children }: Props) {
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        router.refresh();

        startTransition(() => {
            setLoading(false);
        });
    }, [router]);

    return <>{loading ? <div>Loading...</div> : children}</>;
}