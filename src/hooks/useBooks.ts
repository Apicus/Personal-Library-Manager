import useSWR from 'swr';
import api from '../services/api.ts';
import { Book } from '../types';

const fetcher = (url: string) => api.get(url).then(res => res.data);

export const useBooks = () => {
  const { data, error, mutate } = useSWR<Book[]>('/books', fetcher);

  const addBook = async (newBook: Book) => {
    await api.post('/books', newBook);
    mutate();  // Revalidate the cache
  };

  const updateBook = async (id: string, updatedBook: Book) => {
    await api.put(`/books/${id}`, updatedBook);
    mutate();
  };

  const deleteBook = async (id: string) => {
    await api.delete(`/books/${id}`);
    mutate();
  };

  return {
    books: data,
    error,
    addBook,
    updateBook,
    deleteBook,
  };
};

export default useBooks;