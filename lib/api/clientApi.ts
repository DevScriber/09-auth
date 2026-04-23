import { nextServer } from "./api";
import User from "@/types/user";
import Note, { Tags } from "@/types/note";

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface FetchNoteProps {
  page: number;
  perPage?: number;
  search: string;
  tag?: string;
}

interface CreateNoteParams {
  title: string;
  content: string;
  tag: Tags;
}

interface UserRegisterData {
  email: string;
  password: string;
}

export const fetchNotes = async ({
  page,
  perPage = 12,
  search,
  tag,
}: FetchNoteProps): Promise<FetchNotesResponse> => {
  const { data } = await nextServer.get<FetchNotesResponse>("/notes", {
    params: {
      page,
      perPage,
      search,
      ...(tag && tag !== "all" ? { tag } : {}),
    },
  });
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await nextServer.get<Note>(`/notes/${id}`);
  return data;
};

export const createNote = async (newNote: CreateNoteParams): Promise<Note> => {
  const { data } = await nextServer.post<Note>("/notes", newNote);
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await nextServer.delete<Note>(`/notes/${id}`);
  return data;
};

export const register = async (user: UserRegisterData): Promise<User> => {
  const { data } = await nextServer.post<User>("/auth/register", user);
  return data;
};

export const login = async (user: UserRegisterData): Promise<User> => {
  const { data } = await nextServer.post<User>("/auth/login", user);
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
