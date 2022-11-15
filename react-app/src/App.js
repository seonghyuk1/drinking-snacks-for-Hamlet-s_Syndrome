import Login from "./Pages/Login";
import Main from "./Pages/Main";
import Signup from "./Pages/Signup";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <nav class="navbar navbar-expand-lg bg-light">
        <div class="container-fluid">
          <a class="navbar-brand m-3" href="/">
            우리는 오늘 어떤 추억을 쌓을까?
          </a>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="Main" element={<Main />} />
      </Routes>
    </>
  );
}

export default App;
