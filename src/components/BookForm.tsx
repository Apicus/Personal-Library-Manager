import React from 'react';
import { useFormik } from 'formik';
import { TextField, Button, Stack } from '@mui/material';

interface BookFormProps {
  book?: any;
  onSubmit: (book: any) => void;
}

const BookForm: React.FC<BookFormProps> = ({ book, onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      title: book?.title || '',
      author: book?.author || '',
      genre: book?.genre || '',
      description: book?.description || '',
    },
    onSubmit: (values) => {
      const updatedBook = { ...book, ...values }; // Merge values with existing book data
      onSubmit(updatedBook);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={3}>
        <TextField
          label="Title"
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          fullWidth
        />
        <TextField
          label="Author"
          name="author"
          value={formik.values.author}
          onChange={formik.handleChange}
          fullWidth
        />
        <TextField
          label="Genre"
          name="genre"
          value={formik.values.genre}
          onChange={formik.handleChange}
          fullWidth
        />
        <TextField
          label="Description"
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          fullWidth
          multiline
        />
        <Button type="submit" variant="contained" color="primary">
          {book ? 'Update Book' : 'Add Book'}
        </Button>
      </Stack>
    </form>
  );
};

export default BookForm;