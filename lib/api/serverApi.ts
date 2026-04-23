import { api } from "./api";
import { cookies } from "next/headers";
import User from "@/types/user";
import Note from "@/types/note";

const getAuthHeaders = () => {
  const cookieStore = cookies();
  return {
    headers: {
      Cookie: cookieStore.toString(),
    },
  };
};

interface FetchNoteProps {
  page: number;
  perPage?: number;
  search: string;
  tag?: string;
}
interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  params: FetchNoteProps,
): Promise<FetchNotesResponse> => {
  const { data } = await api.get<FetchNotesResponse>("/notes", {
    ...getAuthHeaders(),
    params: {
      ...params,
      ...(params.tag && params.tag !== "all" ? { tag: params.tag } : {}),
    },
  });

  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await api.get<Note>(`/notes/${id}`, getAuthHeaders());
  return data;
};

export const getMe = async (): Promise<User> => {
  const { data } = await api.get("/users/me", getAuthHeaders());
  return data;
};

export const checkSession = async (): Promise<User | null> => {
  try {
    const { data } = await api.get("/auth/session", getAuthHeaders());
    return data;
  } catch {
    return null;
  }
};
