import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import './Select.scss';
const Select = ({ selected, options, setSelected }) => {
  const rootEl = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onClick = e => rootEl.current.contains(e.target) || setIsOpen(false);
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return (
    <div
      ref={rootEl}
      onClick={e => {
        setIsOpen(!isOpen);
        console.log(e.currentTarget);
      }}
      className="select"
    >
      <p className="select__text">{selected}</p>
      <div
        onClick={e => {
          e.stopPropagation();
        }}
        className={`select__wrapper-options ${
          isOpen && 'select__wrapper-options--active'
        }`}
      >
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => {
              setSelected(option.value);
              setIsOpen(false);
            }}
            className="select__option"
          >
            {option.value}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Select;
