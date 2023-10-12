import { useCallback, useEffect, useRef, useState } from "react";
import "./css/style.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  // useRef hook
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let password = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$&?_";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      password += str.charAt(char);
    }

    setPassword(password);
  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyToClipboard = useCallback(()=>{
    passwordRef.current?.select();
      window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <>
      <div className="container">
        <h1 className="heading">Password Generator</h1>
        <div className="password-generator">
          <input
            type="text"
            value={password}
            className="password-input"
            placeholder="password"
            readOnly
            ref={passwordRef}
          />
          <button className="button" onClick={copyToClipboard}>Copy</button>
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            className="range-bar"
            onChange={(e) => setLength(e.target.value)}
          />
          <label>Length {length}</label>
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            id="numberInput"
            onChange={() => {
              setNumberAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="numberInput">Numbers</label>
          <input
            type="checkbox"
            defaultChecked={charAllowed}
            id="charInput"
            onChange={() => {
              setCharAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="charInput">Character</label>
        </div>
      </div>
    </>
  );
}

export default App;
