import React, { useEffect, useState, Fragment } from 'react';
import styled from 'styled-components';
import { search } from 'root/actions';

const Input = styled.input`
  appearance: none;
  position: relative;
  color: ${props => props.theme.text};
  border: 0 0 1px 0 solid ${props => props.theme.navLink} !important;
  border-right-width: 0;
  border-left-width: 0;
  border-top-width: 0;
  outline: none;
  border-radius: 0.1875rem;
  width: 200px;
  height: 20px;
  padding: 10px 10px 10px 0 !important;
  background: none;
  transition: all 250ms ease-out;
  margin-right: 10px;

  ::placeholder {
    color: ${props => props.theme.text};
  }
`;

const hasVideos = results => Object.keys(results.videos);
const hasCollections = results => Object.keys(results.collections);

const Search = props => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState({ videos: {}, collections: {} });

  useEffect(() => {
    if (searchTerm.length > 0) {
      search(searchTerm).then(searchResults => {
        console.log(searchResults);
        setResults(searchResults);
      });
    }
  }, [searchTerm]);

  return (
    <Fragment>
      <Input
        type='search'
        placeholder='Search videos and collections'
        onChange={e => setSearchTerm(e.target.value)}
      />
    </Fragment>
  );
};

export default Search;
