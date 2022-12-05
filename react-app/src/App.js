/* disable-eslint */
import Login from "./Pages/Login";
import Main from "./Pages/Main";
import Signup from "./Pages/Signup";
import Detail from "./Pages/Detail";
import Result from "./Pages/Result";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Mypage from "./Pages/Mypage";
import Selection from "./Pages/Selection";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      {sessionStorage.getItem("Nickname") && <Header />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/Main" element={<Main />} />
        <Route path="/Detail/:id" element={<Detail />} />
        <Route path="/Result" element={<Result />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/Selection" element={<Selection />} />
      </Routes>
      {sessionStorage.getItem("Nickname") && <Footer />}
    </>
  );
}

export default App;
