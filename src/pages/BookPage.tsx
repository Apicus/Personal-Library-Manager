import React from 'react';
import { useBooks } from '../hooks/useBooks.ts';
import BookList from '../components/BookList.tsx';
import BookForm from '../components/BookForm.tsx';
// import { Container, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { Typography } from '@mui/material';

const BookPage = () => {
  const { books, addBook, deleteBook } = useBooks();

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Personal Library Manager
      </Typography>
      <BookForm initialValues={{ title: '', author: '', genre: '', description: '' }} onSubmit={addBook} />
      {books && <BookList books={books} onDelete={deleteBook} />}
    </Container>
  );
};

export default BookPage;