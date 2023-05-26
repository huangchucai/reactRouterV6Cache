import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate
} from "react-router-dom";
import { KeepaliveScope, KeepaliveItem } from "./routeComponent/KeepaliveScope";
import {useCacheDestroy} from "./routeComponent/useCacheDestroy";
function CompForm() {
  const [value, setValue] = React.useState("");
  return (
    <div>
      <p>this is a form component</p>
      input content：{" "}
      <input value={value} onChange={(e) => setValue(e.target.value)} />
    </div>
  );
}

function Atom({ propsNumber }) {
  const [number, setNumber] = React.useState(0);
  return (
    <div>
      propsNumber:{propsNumber} | current:{number}
      <button onClick={() => setNumber(number + 1)}>add++</button>
      <button onClick={() => setNumber(number - 1)}>del--</button>
    </div>
  );
}

function CompNumber() {
  const [number, setNumber] = React.useState(0);
  const [isShow, setShow] = React.useState(true);
  return (
    <div>
      <p>this is a number component</p>
      {isShow && <Atom propsNumber={number} />}
      {isShow && (
         // 缓存 Atom 组件 
        <KeepaliveItem cacheId="number_atom">
          <Atom propsNumber={number} />
        </KeepaliveItem>
      )}
      <button onClick={() => setShow(!isShow)}>
        atom {isShow ? "hidden" : "show"}
      </button>
      <br />
      <button onClick={() => setNumber(number + 1)}>add</button>
    </div>
  );
}

function CompText() {
  const destroy = useCacheDestroy();
  return (
    <div>
      component c
      {/* 销毁 cacheId = form 的组件 */}
      <button onClick={() => destroy("form")}>clean form cache</button>
    </div>
  );
}
/* 菜单栏组件 */
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

export default function Index() {
  return (
    <Router>
      <Menus />
      <KeepaliveScope>
        <Routes>
          <Route
            element={
              // 缓存路由 /form
              <KeepaliveItem cacheId="form">
                <CompForm />
              </KeepaliveItem>
            }
            path="/form"
          />
          <Route element={<CompNumber />} path="/number" />
          <Route element={<CompText />} path="/text" />
        </Routes>
      </KeepaliveScope>
    </Router>
  );
}