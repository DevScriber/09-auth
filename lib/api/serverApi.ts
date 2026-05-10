import { cookies } from "next/headers";
import { nextServer } from "./api";
import { User } from "@/types/user";
import type Note from "@/types/note";

interface FetchNotesProps {
  search: string;
  perPage?: number;
  page: number;
  tag?: string;
}

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async ({
  page,
  perPage = 12,
  search,
  tag,
}: FetchNotesProps): Promise<FetchNotesResponse> => {
  const { data } = await nextServer.get<FetchNotesResponse>("/notes", {
    params: {
      page,
      perPage,
      search,
      ...(tag && tag !== "all" ? { tag } : {}),
    },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

export const fetchNoteById = async (noteId: string): Promise<Note> => {
  const cookieStore = await cookies();
  const response = await nextServer.get<Note>(`/notes/${noteId}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
};

export const checkSessionServer = async () => {
  const cookieStore = await cookies();
  const response = await nextServer.get("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
};

export const getMeServer = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};
