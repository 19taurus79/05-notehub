import axios from 'axios';
// import type { Note } from '../types/note';
axios.defaults.baseURL = 'https://notehub-public.goit.study/api';
interface FetchNotesParams {
  search: string;
  page: number;
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
