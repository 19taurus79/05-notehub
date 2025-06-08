import { keepPreviousData, useQuery } from '@tanstack/react-query';
import NoteList from '../NoteList/NoteList';
import css from './App.module.css';
import { fetchNotes } from '../../services/noteService';
import Pagination from '../Pagination/Pagination';
import { useState } from 'react';

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreatePost, setIsCreatePost] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { data } = useQuery({
    queryKey: ['notes', currentPage],
    queryFn: () => fetchNotes({ search: searchQuery, page: currentPage }),
    placeholderData: keepPreviousData,
  });
  const notes = data?.data.notes;
  const totalPages = data?.data.totalPages;
  console.log(data);
  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        {/* Компонент SearchBox */}
        {
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        }
        <button className={css.button}>Create note +</button>
      </header>
      {data && <NoteList notes={notes} />}
    </div>
  );
}
