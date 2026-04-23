"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import NoteForm from "@/components/NoteForm/NoteForm";

export default function CreateNoteClient() {
    const router = useRouter();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsMounted(true);
    }, []);

    const handleCancel = () => {
        router.push('/notes/filter/all');
    };

    if (!isMounted) return null;

    return <NoteForm onCancel={handleCancel} />;
}