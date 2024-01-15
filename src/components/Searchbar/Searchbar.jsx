import { useState } from 'react';
import { toast } from 'react-toastify';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { IconContext } from 'react-icons';

import css from './Searchbar.module.css';
import { Button } from 'components';

export const Searchbar = ({ onSubmit }) => {
  const [keyword, setKeyword] = useState('');

  const onChange = ({ target }) => {
    setKeyword(target.value);
  };

  const onFormSubmit = event => {
    event.preventDefault();

    if (keyword.trim() === '') {
      toast.error('Please, enter the keyword to search');
    }

    onSubmit(keyword);
  };

  return (
    <header className={css.searchBarContainer}>
      <form className={css.searchForm} onSubmit={onFormSubmit}>
        <Button className="icon" aria-label="Click to search">
          <IconContext.Provider value={{ size: '18px' }}>
            <FaMagnifyingGlass />
          </IconContext.Provider>
        </Button>
        <input
          type="text"
          name="search"
          autoComplete="off"
          autoFocus
          onChange={onChange}
          value={keyword}
        />
      </form>
    </header>
  );
};
