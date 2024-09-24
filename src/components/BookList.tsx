import React, { useState } from 'react';
import { List, ListItem, ListItemText, IconButton, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import useBooks from '../hooks/useBooks.ts'; // Custom hook for fetching books
import BookForm from './BookForm.tsx'; // Import the BookForm component

const BookList: React.FC = () => {
  const { books, isLoading, isError, mutate } = useBooks(); // SWR hook for data fetching
  const [editingBook, setEditingBook] = useState<any | null>(null); // State for editing book

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading books</div>;

  // Function to handle deleting a book
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`/books/${id}`);
      mutate(); // Re-fetch the books after deletion
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  // Function to handle editing a book (set the selected book to the form)
  const handleEdit = (book: any) => {
    setEditingBook(book); // Set the selected book for editing
  };

  // Function to handle book form submission (update the book)
  const handleSubmit = async (updatedBook: any) => {
    try {
      await axios.put(`/books/${updatedBook.id}`, updatedBook);
      mutate(); // Re-fetch books after the update
      setEditingBook(null); // Clear the editing state
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  return (
    <div>
      <List>
        {books.map((book: any) => (
          <ListItem key={book.id} sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <ListItemText primary={book.title} secondary={book.author} />
            <div>
              <IconButton onClick={() => handleEdit(book)} aria-label="edit">
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => handleDelete(book.id)} aria-label="delete">
                <DeleteIcon />
              </IconButton>
            </div>
          </ListItem>
        ))}
      </List>

      {editingBook && (
        <div style={{ marginTop: '20px' }}>
          <h2>Edit Book</h2>
          <BookForm book={editingBook} onSubmit={handleSubmit} />
          <Button variant="outlined" color="secondary" onClick={() => setEditingBook(null)}>
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
};

export default BookList;