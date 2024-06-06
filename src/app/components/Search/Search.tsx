import React, { useCallback, useState} from 'react';

import styles from './search.module.css'

export const Search: React.FC<{updateInput: (input: string) => void}> = ({ updateInput }) => {
  const [searchInput, setSearchInput] = useState('')

  const handleChange = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchInput(e.currentTarget.value);
  }, []);

  const handleSubmit = () => {
    updateInput(searchInput)
  }

  return (
    <div>
        <input
          className={styles.search}
          type="text"
          placeholder='Input a LinkedIn URL to to generate a pdf resume'
          onChange={handleChange}
          value={searchInput}
        />
        <button className={styles.button} onClick={handleSubmit}> Submit </button>
    </div>
  );
};