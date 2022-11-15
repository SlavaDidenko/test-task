import Header from "components/Header/Header";
import Converter from "components/Сonverter/Converter";
import { useEffect, useState } from "react";

export const App = () => {
  const [dataRate, setDataRate] = useState([]);
  useEffect(() => {
    getRate();
  }, []);

  const getRate = async () => {
    try {
      const response = await fetch(
        'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5'
      );
      let data = await response.json();
      const necessaryData = data.slice(0, 2); /*took only the necessary data*/
      setDataRate(necessaryData);
    } catch (error) {}
  };

  return (
    <>
      <Header dataRate={dataRate}/>
      <main>
        <Converter dataRate={dataRate}/>
      </main>
    </>
  );
};
