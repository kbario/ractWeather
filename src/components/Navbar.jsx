import React from 'react';

function Navbar({handleSearch, city}) {

  return (
    <div className='flex w-full h-20 justify-between items-center px-6 bg-zinc-200'>
        <h1 className='text-4xl'>{city}</h1>
        <button className='flex gap-3 group items-center '>
            <input type="text" name="city-input" id="city-input" onKeyUp={handleSearch}  />
            <svg id='search-icon' xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
        </button>
    </div>
  );
}

export default Navbar;
