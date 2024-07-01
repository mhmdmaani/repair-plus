import { useState } from 'react';
export const useSortAndSearch = () => {
  const [sortBy, setSortBy] = useState('name');
  const [isASC, setIsASC] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(100);

  return {
    sortBy,
    setSortBy,
    isASC,
    setIsASC,
    search,
    setSearch,
    page,
    setPage,
    perPage,
    setPerPage,
  };
};
