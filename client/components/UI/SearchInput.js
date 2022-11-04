import React from 'react'

function SearchInput({ stateVariables = [], placeholder = 'Search by ID' }) {

  const [searchInput, setSearchInput] = stateVariables

  return (
    <>
      <input
        placeholder={placeholder}
        type="text"
        value={searchInput || ''}
        onChange={(evt) => setSearchInput(evt.target.value)}
        className={`pageSearchInput`}
      />
    </>
  )
}

export default SearchInput
