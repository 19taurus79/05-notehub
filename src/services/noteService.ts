import axios from 'axios';
import type { Note } from '../types/note';
axios.defaults.baseURL = 'https://notehub-public.goit.study/api';
interface FetchNotesParams {
  search?: string;
  page?: number;
}
export default async function fetchNotes({ search, page }: FetchNotesParams) {
  try {
    const response = await axios.get<Note[]>('/notes', {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
      },
      params: {
        search: search,
        page: page,
      },
    });
    return console.log(response.data);
  } catch (error) {
    console.error('Error fetching notes:', error);
    throw error;
  }
}
