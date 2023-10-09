import { Component, useEffect, useState } from "react";
import axios from "axios";

import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [convertText, setConvertText] = useState("");
  const [textLang, setLangText] = useState([]);
  const [convTextLang, setConvTextlang] = useState("hi");
  const [convTextLangData, setConvTextlangData] = useState("");


  useEffect(() => {
    const options = {
      method: "GET",
      url:"https://google-translate1.p.rapidapi.com/language/translate/v2/languages",
      headers: {
        "Accept-Encoding": "application/gzip",
        "X-RapidAPI-Key": "your api key",
        "X-RapidAPI-Host": "google-translate1.p.rapidapi.com",
      },
    };

    axios.request(options).then((data) => {
      setLangText(data.data.data.languages);
    }).catch((e)=>{
console.log(e);
    });
  }, []);

  const textConInputChange = (e) => {
    setConvertText(e.target.value);
  };

  const swapHandler = () => {
    setText(convTextLangData);
    setConvTextlangData(text);
  };

  const setlang = (e) => {
    setConvTextlang(e.target.value);
  };
  const submitHandler = () => {
    const encodedParams = new URLSearchParams();
    encodedParams.set("q", text);
    encodedParams.set("target", convTextLang);

    const options = {
      method: "POST",
      url: "https://google-translate1.p.rapidapi.com/language/translate/v2",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "Accept-Encoding": "application/gzip",
        "X-RapidAPI-Key": "your api key",
        "X-RapidAPI-Host": "google-translate1.p.rapidapi.com",
      },
      data: encodedParams,
    };

    axios.request(options).then((e) => {
      setConvTextlangData(e.data.data.translations[0].translatedText);
      console.log(e);
    });
  };

  const textInputChange = (e) => {
    setText(e.target.value);
  };

  return (
    <>
      <h1 className="text-center">Text Translater</h1>
      <div className="container">
        <div>
          <label
            htmlFor="Enter Text"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Enter Text
          </label>
          <div className="relative mt-2 rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>
            <input
              type="text"
              name="Enter Text"
              id="Enter Text"
              className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Enter text"
              value={text}
              onChange={textInputChange}
            />
            <div className="absolute inset-y-0 right-0 flex items-center">
              <label htmlFor="currency" className="sr-only">
                Currency
              </label>
              <select
                onClick={setlang}
                id="currency"
                name="currency"
                className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              >
                {textLang.map((e, i) => {
                  return <option key={i}>{e.language}</option>;
                })}
              </select>
            </div>
          </div>
        </div>
        <br />
        <div className="container text-center">
          <button className="bg-dark" onClick={swapHandler}>
            SWAP
          </button>
        </div>
        <div>
          <div className="relative mt-2 rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>
            <input
              type="text"
              name="Enter Text"
              id="Enter Text"
              className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Convert Text"
              value={convTextLangData}
              onChange={textConInputChange}
            />
            <div className="absolute inset-y-0 right-0 flex items-center">
              <label htmlFor="currency" className="sr-only">
                Currency
              </label>
            
            </div>
          </div>
        </div>
        <br />
        <div className="container text-center">
          <button className="bg-dark" onClick={submitHandler}>
            Submit
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
