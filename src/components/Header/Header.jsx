import React from 'react';
import './Header.scss';
const Header = ({ dataRate }) => {

  return (
    <header className="header">
      <div className="container">
        {dataRate.length && (
          <ul className="list-currencies">
            {dataRate.map((el, index) => {
              const { ccy, buy } = el;
              return (
                <li className="list-currencies__item" key={index}>
                  <p className="list-currencies__text">{ccy}: </p>
                  <p className="list-currencies__total">
                    {Number(buy).toFixed(1)} UAH
                  </p>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </header>
  );
};

export default Header;
