import axios from 'axios';
import type { Note } from '../types/note';
axios.defaults.baseURL = 'https://notehub-public.goit.study/api';
interface FetchNotesParams {
  search: string;
  page: number;
}
interface CreateNoteParams {
  title: string;
  content?: string;
  tag: string;
}
interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}
export const fetchNotes = async ({
  search,
  page,
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  if (search !== '') {
    const res = await axios.get<FetchNotesResponse>('/notes', {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
      },
      params: {
        search: search,
        page: page,
        perPage: 12,
      },
    });
    return res.data;
  } else {
    const res = await axios.get<FetchNotesResponse>('/notes', {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
      },
      params: {
        page: page,
        perPage: 12,
      },
    });
    return res.data;
  }
};

export const createNote = async ({
  title,
  content,
  tag,
}: CreateNoteParams): Promise<Note> => {
  const res = await axios.post<Note>(
    '/notes',
    { title, content, tag },
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
      },
    },
  );
  return res.data;
};

export const deleteNote = async (id: number): Promise<Note> => {
  const res = await axios.delete<Note>(`/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
    },
  });
  // console.log('del', res.data);
  return res.data;
};
