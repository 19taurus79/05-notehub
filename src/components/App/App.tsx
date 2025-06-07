import { useState } from 'react';
import fetchNotes from '../../services/noteService';
import css from './App.module.css';
export default function App() {
  return (
    <>
      <button onClick={() => fetchNotes({ search: null, page: 1 })}>
        Fetch Notes
      </button>
    </>
  );
}
