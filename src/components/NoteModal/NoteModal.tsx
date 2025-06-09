import { useEffect } from 'react';
import NoteForm from '../NoteForm/NoteForm';
import css from './NoteModal.module.css';
import { createPortal } from 'react-dom';
interface NoteModalProps {
  onClose: () => void;
}
export default function NoteModal({ onClose }: NoteModalProps) {
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);
  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
    >
      <div className={css.modal}>
        <NoteForm />
      </div>
    </div>,
    document.body,
  );
}
