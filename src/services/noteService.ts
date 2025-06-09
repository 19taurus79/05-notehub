import axios from 'axios';
// import type { Note } from '../types/note';
axios.defaults.baseURL = 'https://notehub-public.goit.study/api';
interface FetchNotesParams {
  search: string;
  page: number;
}
interface CreateNoteParams {
  data: {
    title: string;
    content: string;
    tag: string;
  };
}
export const fetchNotes = async ({ search, page }: FetchNotesParams) => {
  if (search !== '') {
    return await axios.get('/notes', {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
      },
      params: {
        search: search,
        page: page,
        perPage: 12,
      },
    });
  } else {
    return await axios.get('/notes', {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
      },
      params: {
        page: page,
        perPage: 12,
      },
    });
  }
};

export const createNote = async ({ data }: CreateNoteParams) => {
  return await axios.post('/notes', data, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
    },
  });
};

export const deleteNote = async (id: number) => {
  return await axios.delete(`/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
    },
  });
};
