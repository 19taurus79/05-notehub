import { keepPreviousData, useQuery } from '@tanstack/react-query';
import NoteList from '../NoteList/NoteList';
import css from './App.module.css';
import { fetchNotes } from '../../services/noteService';
import Pagination from '../Pagination/Pagination';
import { useState } from 'react';
import NoteModal from '../NoteModal/NoteModal';
import SearchBar from '../SearchBox/SearchBar';
import { useDebounce } from 'use-debounce';
export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateTask, setIsCreateTask] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery] = useDebounce(searchQuery, 300);
  const { data } = useQuery({
    queryKey: ['notes', currentPage, debouncedQuery],
    queryFn: () => fetchNotes({ search: searchQuery, page: currentPage }),
    placeholderData: keepPreviousData,
  });
  const notes = data?.data.notes;
  const totalPages = data?.data.totalPages;
  const togleModal = () => setIsModalOpen(!isModalOpen);
  // console.log(data);
  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBar
          value={searchQuery}
          onSearch={setSearchQuery}
          setPage={setCurrentPage}
        />
        {
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        }
        <button className={css.button} onClick={togleModal}>
          Create note +
        </button>
      </header>
      {data && <NoteList notes={notes} />}
      {isModalOpen && <NoteModal onClose={togleModal} />}
    </div>
  );
}
