import { useEffect, useRef, useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import { KeepaliveItem, KeepaliveScope, useCacheDestory } from './routeComponent/index.js'


function CompForm() {
  const [value, setValue] = useState("");
  const compFormDom = useRef()
  useEffect(() => {
    console.log("---compFormDom.current.attributes---",compFormDom.current.getAttributeNames())
  }, [])
  return (
      <div className='CompForm' ref={compFormDom}>
        <p>this is a form component</p>
        input content：{" "}
        <input value={value} onChange={(e) => setValue(e.target.value)}/>
      </div>
  );
}

function Atom({ propsNumber, type = 'normal' }) {
  const [number, setNumber] = useState(0);
  const [show, setShow] = useState(true);
  return (
      <div className='Atom'>
        {number !== 3 && <p>{type}</p> }
        propsNumber:{propsNumber} | current:{number}
        <button onClick={() => setNumber(number + 1)}>add++</button>
        <button onClick={() => setNumber(number - 1)}>del--</button>
      </div>
  );
}

function CompNumber() {
  const [number, setNumber] = useState(0);
  const [isShow, setShow] = useState(true);
  return (
      <div className='CompNumber'>
        <p>this is a number component</p>
        {isShow && <Atom propsNumber={number}/>}
        {isShow && (
            <KeepaliveItem cacheId="number_atom">
              <Atom type='cache' propsNumber={number} />
            </KeepaliveItem>
        )}
        <button onClick={() => setShow(!isShow)}>
          atom {isShow ? "hidden" : "show"}
        </button>
        <br/>
        <button onClick={() => setNumber(number + 1)}>add</button>
      </div>
  );
}

function CompText() {
  const destory = useCacheDestory();
  return (
      <div className='CompText'>
        component c
        <button onClick={() => destory("form")}>clean form cache</button>
      </div>
  );
}

function Menus() {
  const navigate = useNavigate();
  return (
      <div>
        router:
        <button style={{ marginRight: "10px" }} onClick={() => navigate("/form")}>
          form
        </button>
        <button
            style={{ marginRight: "10px" }}
            onClick={() => navigate("/number")}
        >
          number
        </button>
        <button style={{ marginRight: "10px" }} onClick={() => navigate("/text")}>
          text
        </button>
      </div>
  );
}


function App() {
  return (
      <BrowserRouter>
        <Menus/>
        <KeepaliveScope>
          <Routes>
            <Route
                element={
                  <KeepaliveItem cacheId="form">
                    <CompForm/>
                  </KeepaliveItem>
                }
                path="/form"
            />
            <Route element={<CompNumber/>} path="/number"/>
            <Route element={<CompText/>} path="/text"/>
          </Routes>
        </KeepaliveScope>
      </BrowserRouter>
  );
}

export default App
