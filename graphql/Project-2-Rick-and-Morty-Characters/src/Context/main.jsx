import { createContext, useState, useContext } from 'react';

export const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [page, setPage] = useState(1);
  const [gender, setGender] = useState('');
  const [species, setSpecies] = useState('');
  const [name, setName] = useState('');
  const [filtered, setFiltered] = useState(true);
  const [search, setSearch] = useState('');

  const values = { page, setPage, gender, setGender, species, setSpecies, filtered, setFiltered, name, setName, search, setSearch };
  return <FilterContext.Provider value={values}>{children}</FilterContext.Provider>;
};

export const useFilter = () => useContext(FilterContext);