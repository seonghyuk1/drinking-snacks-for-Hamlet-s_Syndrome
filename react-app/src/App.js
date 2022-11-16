/* disable-eslint */
import Login from "./Pages/Login";
import Main from "./Pages/Main";
import Signup from "./Pages/Signup";
import Detail from "./Pages/Detail";
import Result from "./Pages/Result";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="Main" element={<Main />} />
        <Route path="/Detail/:id" element={<Detail />} />
        <Route path="/Result" element={<Result />} />
      </Routes>
    </>
  );
}

export default App;
