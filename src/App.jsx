import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumbersAllowed] = useState(false);
  const [symbols, setSymbolsAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "1234567890";
    if (symbols) str += "!@#$%^&*()";

    for (let i = 0; i < length; i++) {
      pass += str[Math.floor(Math.random() * str.length)];
    }
    setPassword(pass);
  }, [length, numberAllowed, symbols]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, symbols, passwordGenerator]);


  const passwordRef = useRef(null)
  
  const copyTextToClipboard = useCallback(()=>{
    window.navigator.clipboard.writeText(password);
    passwordRef.current.style.color="red";
    passwordRef.current.style.fontWeight="bolder";
  },[[password]])

  return (
    <>
      <h1 className="text-4xl text-center m-20 ">PASSWORD GENERATOR</h1>
      <div className="flex shadow rounded-lg overflow-hidden m-10 p-10 ">
        <input
          type="text"
          placeholder="Password"
          value={password}
          readOnly
          className="w-full p-5 rounded-lg"
          style={{ color: "black" }}
          ref={passwordRef}                 //  iska reference dena hai
        />
        <button id="copy" 
        onClick={copyTextToClipboard
        }
        
        className={'bg-blue-500 px-10 rounded-2xl ${buttonClicked? "text-2xl"} ' } // isko dena hai
        >

          COPY
        </button>
      </div>
      
      <div className="flex ">
        <input
          type="range"
          min={5}
          max={100}
          value={length}
          className=" ml-20 mr-2 cursor-pointer"
          onChange={(e) => {
            setLength(e.target.value);
          }}
        />
        <div className="text-xl text-orange-400">Length: {length}</div>

        <input
          type="checkbox"
          className="ml-10 mr-1"
          id="numberInput"
          defaultChecked={numberAllowed}
          onChange={() => {
            setNumbersAllowed((prev) => !prev);
          }}
        />
        <label htmlFor="numberInput" className="text-xl text-orange-400">
          Numbers
        </label>

        <input
          type="checkbox"
          className="ml-10 mr-1"
          id="symbolInput"
          defaultChecked={symbols}
          onChange={() => {
            setSymbolsAllowed((prev) => !prev);
          }}
        />
        <label htmlFor="symbolInput" className="text-xl text-orange-400">
          Symbols
        </label>
      </div>
    </>
  );
}

export default App;
