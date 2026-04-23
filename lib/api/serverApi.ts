import { cookies } from "next/headers";
import { nextServer } from "./api";
import { User } from "@/types/user";
import type Note from "@/types/note";

export const checkSessionServer = async () => {
  const cookieStore = await cookies();
  const res = await nextServer.get("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res;
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

interface GetNotesHttpResponse {
  notes: Note[];
  totalPages: number;
}
type GetNotesByIdHttpResponse = Note;

export async function fetchNotes(
  nameSearch: string,
  tag: string = "all",
  pageCurrent: number = 1,
): Promise<GetNotesHttpResponse> {
  let options;
  const cookieStore = await cookies();

  if (tag === "all") {
    options = {
      headers: {
        Cookie: cookieStore.toString(),
      },
      params: {
        search: nameSearch,
        page: pageCurrent,
        perPage: 12,
      },
    };
  } else {
    options = {
      headers: {
        Cookie: cookieStore.toString(),
      },
      params: {
        search: nameSearch,
        page: pageCurrent,
        tag: tag,
        perPage: 12,
      },
    };
  }

  const response = await nextServer.get<GetNotesHttpResponse>(
    "/notes",
    options,
  );
  return {
    notes: response.data.notes,
    totalPages: response.data.totalPages,
  };
}

export async function fetchNoteById(
  noteId: string,
): Promise<GetNotesByIdHttpResponse> {
  if (noteId !== "") {
    const cookieStore = await cookies();
    const response = await nextServer.get<GetNotesByIdHttpResponse>(
      `/notes/${noteId}`,
      {
        headers: {
          Cookie: cookieStore.toString(),
        },
      },
    );
    return response.data;
  } else {
    throw new Error("Note ID is required for deletion");
  }
}
