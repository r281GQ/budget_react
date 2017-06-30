import React from 'react';

const Searchbar = ({isVisible, onChangeHandler}) => {
  if(!isVisible) return null;
  return (
    <input
        className="form-control"
        type="text"
        onChange={onChangeHandler}
        placeholder="Search in names and memos..."
      />
  );
}


export default Searchbar;
