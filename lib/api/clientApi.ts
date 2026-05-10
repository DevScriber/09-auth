import { nextServer } from "@/lib/api/api";
import { User } from "@/types/user";
import Note, { Tags } from "@/types/note";

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface FetchNotesProps {
  page: number;
  perPage?: number;
  search: string;
  tag?: string;
}

interface CreateNoteProps {
  title: string;
  content: string;
  tag: Tags;
}

interface UserAuthDataProps {
  email: string;
  password: string;
}

export const fetchNotes = async ({
  page,
  perPage = 12,
  search,
  tag,
}: FetchNotesProps): Promise<FetchNotesResponse> => {
  try {
    const { data } = await nextServer.get<FetchNotesResponse>("/notes", {
      params: {
        page,
        perPage,
        search,
        ...(tag && tag !== "all" ? { tag } : {}),
      },
    });
    return data;
  } catch {
    throw new Error("Failed to fetch notes");
  }
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await nextServer.get<Note>(`/notes/${id}`);
  return data;
};

export const createNote = async (newNote: CreateNoteProps): Promise<Note> => {
  const { data } = await nextServer.post<Note>("/notes", newNote);
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await nextServer.delete<Note>(`/notes/${id}`);
  return data;
};

export const register = async (userData: UserAuthDataProps): Promise<User> => {
  const { data } = await nextServer.post<User>("/auth/register", userData);
  return data;
};

export const login = async (userData: UserAuthDataProps): Promise<User> => {
  const { data } = await nextServer.post<User>("/auth/login", userData);
  return data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post("/auth/logout");
};

export const checkSession = async (): Promise<User> => {
  const { data } = await nextServer.get<User>("/auth/session");
  return data;
};

export const getMe = async (): Promise<User> => {
  const { data } = await nextServer.get<User>("/users/me");
  return data;
};

export const updateMe = async (userData: {
  username: string;
}): Promise<User> => {
  const { data } = await nextServer.patch<User>("/users/me", userData);
  return data;
};
