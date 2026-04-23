import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api/api";
import NotesClient from "./Notes.client";
import { Metadata } from "next";

interface Props {
    params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const filterName = slug[0] || 'all';
    const capitalizedFilter = filterName.charAt(0).toUpperCase() + filterName.slice(1);
    const description = filterName === "all" ? "Browse all your personal notes in one place." :
        `Check out your ${filterName} notes and keep track of your tasks on NoteHub.`
    return {
        title: `Notes: ${capitalizedFilter} | NoteHub`,
        description,
        openGraph: {
            title: `${capitalizedFilter} Notes - NoteHub`,
            description,
            url: `https://notehub.vercel.app/notes/filter/${filterName}`,
            images: [
                {
                    url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
                    width: 1200,
                    height: 630,
                    alt: `NoteHub ${capitalizedFilter}`,
                },
            ],
        }

    }

}

const NotesPage = async ({ params }: Props) => {
    const { slug } = await params;
    const tag = slug[0] === "all" ? undefined : slug[0];

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ["notes", 1, "", tag],
        queryFn: () => fetchNotes({ page: 1, search: "", tag }),
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NotesClient tag={tag} />
        </HydrationBoundary>
    );
};

export default NotesPage;