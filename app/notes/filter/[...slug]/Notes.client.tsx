"use client";

import { useState } from "react";
import css from "./NotesPage.module.css";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import { useDebouncedCallback } from "use-debounce";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";
import { Toaster } from "react-hot-toast";
import Link from "next/link";

interface NotesClientProps {
    tag?: string;
}

const NotesClient = ({ tag }: NotesClientProps) => {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");

    const handleSearch = useDebouncedCallback((value: string) => {
        setSearch(value);
        setPage(1);
    }, 500);

    const { data } = useQuery({
        queryKey: ["notes", page, search, tag],
        queryFn: () => fetchNotes({ page, search, tag }),
        placeholderData: keepPreviousData,
    });

    return (
        <div className={css.app}>
            <header className={css.toolbar}>
                <SearchBox onChange={handleSearch} />
                {data && (
                    <Pagination
                        currentPage={page}
                        setCurrentPage={setPage}
                        totalPages={data.totalPages}
                    />
                )}
                <Link href="/notes/action/create" className={css.button}>
                    Create note
                </Link>
            </header>
            <main>{data && <NoteList notes={data.notes} />}</main>

            <Toaster />
        </div>
    );
};

export default NotesClient;