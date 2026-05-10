import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import css from './ProfilePage.module.css';
import { getMeServer } from '@/lib/api/serverApi';

export async function generateMetadata(): Promise<Metadata> {
    const user = await getMeServer();
    return {
        title: `User: ${user.username}`,
        description: `Profile page of ${user.username} with email ${user.email}`,
        openGraph: {
            title: `User: ${user.username}`,
            description: `Profile page of ${user.username} with email ${user.email}`,
            url: `https://notehub.com/profile`,
            siteName: "NoteHub",
            images: [
                {
                    url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
                    width: 1200,
                    height: 630,
                    alt: `${user.username}'s page`,
                },
            ],
            type: "article",
        },
    };
}

const ProfilePage = async () => {
    const user = await getMeServer();
    return (
        <main className={css.mainContent}>
            <div className={css.profileCard}>
                <div className={css.header}>
                    <h1 className={css.formTitle}>Profile Page</h1>
                    <Link href="/profile/edit" className={css.editProfileButton}>
                        Edit Profile
                    </Link>
                </div>
                <div className={css.avatarWrapper}>
                    <Image
                        src={user?.avatar}
                        alt="User Avatar"
                        width={120}
                        height={120}
                        className={css.avatar}
                    />
                </div>
                <div className={css.profileInfo}>
                    <p>Username: {user?.username}</p>
                    <p>Email: {user?.email}</p>
                </div>
            </div>
        </main>
    );
};
export default ProfilePage;