import Select from 'components/UI/Select/Select';
import React, { useState } from 'react';
import { useMemo } from 'react';
import { HiArrowsRightLeft } from 'react-icons/hi2';
import './Converter.scss';
const Converter = ({dataRate}) => {
  const options = [{ value: 'UAN' }, { value: 'EUR' }, { value: 'USD' }];
  const [leftInputValue, setLeftInputValue] = useState('');
  const [rigthInputValue, setRigthInputValue] = useState('');
  const [leftSelected, setLeftSelected] = useState('USD');
  const [rigthSelected, setRigthSelected] = useState('UAN');
  const [changeInput, setChangeInput] = useState(true);

  const calcСurrency = (value, setInputValue) => {
    if (dataRate.length) {
      if (leftSelected === 'EUR' && rigthSelected === 'UAN') {
        changeInput
          ? setRigthInputValue((Number(value) * dataRate[1].buy).toFixed(2))
          : setInputValue((Number(value) / dataRate[1].buy).toFixed(2));
      } else if (leftSelected === 'USD' && rigthSelected === 'UAN') {
        changeInput
          ? setInputValue((Number(value) * dataRate[0].buy).toFixed(2))
          : setInputValue((Number(value) / dataRate[0].buy).toFixed(2));
      } else if (leftSelected === 'UAN' && rigthSelected === 'EUR') {
        changeInput
          ? setInputValue((Number(value) / dataRate[1].buy).toFixed(2))
          : setInputValue((Number(value) * dataRate[1].buy).toFixed(2));
      } else if (leftSelected === 'UAN' && rigthSelected === 'USD') {
        changeInput
          ? setInputValue((Number(value) / dataRate[0].buy).toFixed(2))
          : setInputValue((Number(value) * dataRate[0].buy).toFixed(2));
      } else if (leftSelected === 'EUR' && rigthSelected === 'USD') {
        setInputValue(
          ((Number(value) * dataRate[0].buy) / dataRate[1].buy).toFixed(2)
        );
      } else if (leftSelected === 'USD' && rigthSelected === 'EUR') {
        setInputValue(
          ((Number(value) * dataRate[1].buy) / dataRate[0].buy).toFixed(2)
        );
      } else {
        setInputValue(Number(value).toFixed(2));
      }
    }
  };

  useMemo(() => {
    if (changeInput) {
      calcСurrency(leftInputValue, setRigthInputValue);
    } else {
      calcСurrency(rigthInputValue, setLeftInputValue);
    }
  }, [rigthSelected, leftSelected,rigthInputValue,leftInputValue]);

  return (
    <div className="container">
      <div className="converter">
        <div className="converter__wrapper">
          <Select
            setSelected={setLeftSelected}
            selected={leftSelected}
            options={options}
          />
          <button
            onClick={() => {
              setLeftInputValue(rigthInputValue);
              setRigthInputValue(leftInputValue);
              setLeftSelected(rigthSelected);
              setRigthSelected(leftSelected);
            }}
            className="converter__btn"
          >
            <HiArrowsRightLeft fontSize={24} />
          </button>
          <Select
            selected={rigthSelected}
            setSelected={setRigthSelected}
            options={options}
          />
        </div>
        <div className="converter__wrapper-bottom">
          <input
            value={leftInputValue}
            onChange={e => {
              setLeftInputValue(e.target.value);
              setChangeInput(true);
            }}
            className="converter__input converter__input--letf"
            type="text"
          />
          <input
            value={rigthInputValue}
            onChange={e => {
              setRigthInputValue(e.target.value);
              setChangeInput(false);
            }}
            className="converter__input"
            type="text"
          />
        </div>
      </div>
    </div>
  );
};

export default Converter;
