import { Metadata } from 'next';
import css from './not-found.module.css'


export const metadata: Metadata = {
    title: "Page Not Found | NoteHub",
    description: "Oops! The page you are looking for does not exist. Please return to the NoteHub home page.",
    openGraph: {
        title: "Page Not Found | NoteHub",
        description: "Oops! The page you are looking for does not exist. Please return to the NoteHub home page.",
        url: "https://notehub-vercel-link.vercel.app/not-found",
        images: [
            {
                url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
                width: 1200,
                height: 630,
                alt: "NoteHub App",
            },
        ],
    }
}

export default function NotFound() {

    return (
        <div className={css.container}>
            <h1 className={css.title}>404 - Page not found</h1>
            <p className={css.description}>
                Sorry, the page you are looking for does not exist.
            </p>
        </div>
    );
}