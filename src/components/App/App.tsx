import { keepPreviousData, useQuery } from '@tanstack/react-query';
import NoteList from '../NoteList/NoteList';
import css from './App.module.css';
import { fetchNotes } from '../../services/noteService';
import Pagination from '../Pagination/Pagination';
import { useState } from 'react';
import NoteModal from '../NoteModal/NoteModal';
import SearchBox from '../SearchBox/SearchBox';
import { useDebounce } from 'use-debounce';
export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [isCreateTask, setIsCreateTask] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery] = useDebounce(searchQuery, 300);
  const { data } = useQuery({
    queryKey: ['notes', currentPage, debouncedQuery],
    queryFn: () => fetchNotes({ search: debouncedQuery, page: currentPage }),
    placeholderData: keepPreviousData,
  });
  // const notes = data?.data.notes;
  const handleSearch = (searchQuery: string) => {
    setSearchQuery(searchQuery);
    setCurrentPage(1);
  };
  const notes = data?.notes;
  const totalPages = data?.totalPages;
  const togleModal = () => setIsModalOpen(!isModalOpen);
  // console.log(data);
  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox
          value={searchQuery}
          onSearch={handleSearch}
          // setPage={setCurrentPage}
        />
        {totalPages && totalPages > 1 && (
          <Pagination
            totalPages={totalPages || 1}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
        <button className={css.button} onClick={togleModal}>
          Create note +
        </button>
      </header>
      {notes && <NoteList notes={notes} />}
      {isModalOpen && <NoteModal onClose={togleModal} />}
    </div>
  );
}
