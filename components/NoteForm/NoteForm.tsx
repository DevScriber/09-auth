"use client";

import { useId } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '@/lib/api/clientApi';
import { useNoteStore } from '@/lib/store/noteStore';
import css from './NoteForm.module.css';

interface NoteFormProps {
    onCancel: () => void;
}

export default function NoteForm({ onCancel }: NoteFormProps) {
    const fieldId = useId();
    const queryClient = useQueryClient();

    const draft = useNoteStore((state) => state.draft);
    const setDraft = useNoteStore((state) => state.setDraft);
    const clearDraft = useNoteStore((state) => state.clearDraft);

    const { mutate, isPending } = useMutation({
        mutationFn: createNote,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notes'] });
            clearDraft();
            onCancel();
        },
    });


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setDraft({ [name]: value });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        mutate(draft);
    };

    return (
        <form className={css.form} onSubmit={handleSubmit}>
            <div className={css.formGroup}>
                <label htmlFor={`${fieldId}-title`}>Title</label>
                <input
                    id={`${fieldId}-title`}
                    name="title"
                    type="text"
                    className={css.input}
                    required
                    value={draft.title} // Привязка к стору
                    onChange={handleChange}
                />
            </div>

            <div className={css.formGroup}>
                <label htmlFor={`${fieldId}-content`}>Content</label>
                <textarea
                    id={`${fieldId}-content`}
                    name="content"
                    rows={8}
                    className={css.textarea}
                    value={draft.content}
                    onChange={handleChange}
                />
            </div>

            <div className={css.formGroup}>
                <label htmlFor={`${fieldId}-tag`}>Tag</label>
                <select
                    id={`${fieldId}-tag`}
                    name="tag"
                    className={css.select}
                    required
                    value={draft.tag}
                    onChange={handleChange}
                >
                    <option value="Todo">Todo</option>
                    <option value="Work">Work</option>
                    <option value="Personal">Personal</option>
                    <option value="Meeting">Meeting</option>
                    <option value="Shopping">Shopping</option>
                </select>
            </div>

            <div className={css.actions}>
                <button
                    onClick={onCancel}
                    type="button"
                    className={css.cancelButton}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className={css.submitButton}
                    disabled={isPending}
                >
                    {isPending ? 'Creating...' : 'Create note'}
                </button>
            </div>
        </form>
    );
}