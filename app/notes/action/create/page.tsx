import { Metadata } from "next";
import css from './CreateNote.module.css';
import CreateNoteClient from "./CreateNote.client";

// Динамическая генерация метаданных (Best Practice)
export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "Create New Note | NoteHub",
        description: "Capture your thoughts and stay organized. Create a new note with a title, content, and tags.",
        openGraph: {
            title: "Create New Note | NoteHub",
            description: "Capture your thoughts and stay organized. Create a new note with a title, content, and tags.",
            url: "https://notehub-vercel-link.vercel.app/notes/action/create",
            images: [
                {
                    url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
                    width: 1200,
                    height: 630,
                    alt: "NoteHub App",
                },
            ],
        }
    };
}

export default function CreateNote() {
    return (
        <main className={css.main}>
            <div className={css.container}>
                <h1 className={css.title}>Create note</h1>
                <CreateNoteClient />
            </div>
        </main>
    );
}