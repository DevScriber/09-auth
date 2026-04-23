import { nextServer } from "./api";
import { cookies } from "next/headers";
import User from "@/types/user";
import Note from "@/types/note";

const getAuthHeaders = async () => {
  const cookieStore = await cookies();
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
  const authHeaders = await getAuthHeaders();
  const { data } = await nextServer.get<FetchNotesResponse>("/notes", {
    ...authHeaders,
    params: {
      perPage: 12,
      ...params,
      ...(params.tag === "all" ? { tag: undefined } : {}),
    },
  });

  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await nextServer.get<Note>(
    `/notes/${id}`,
    await getAuthHeaders(),
  );
  return data;
};

export const getMe = async (): Promise<User> => {
  const { data } = await nextServer.get<User>(
    "/users/me",
    await getAuthHeaders(),
  );
  return data;
};

export const checkSession = async (): Promise<User | null> => {
  try {
    const { data } = await nextServer.get<User>(
      "/auth/session",
      await getAuthHeaders(),
    );
    return data;
  } catch {
    return null;
  }
};
