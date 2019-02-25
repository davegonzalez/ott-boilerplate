import React, { useEffect, useState } from 'react';
import { search } from 'root/actions';

const Search = props => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (searchTerm.length > 0) {
      search(searchTerm).then(results => {
        console.log(results);
        setResults(results);
      });
    }
  }, [searchTerm]);

  return <input type='search' onChange={e => setSearchTerm(e.target.value)} />;
};

export default Search;
