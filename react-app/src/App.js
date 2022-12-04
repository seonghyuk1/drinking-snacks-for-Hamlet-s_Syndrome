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
import ChangePassword from "./Pages/ChangePassword";
import Resign from "./Pages/Resign";

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
        <Route path="/Mypage" element={<Mypage />} />
        <Route path="/Selection" element={<Selection />} />
        <Route path="/ChangePassword" element={<ChangePassword />} />
        <Route path="/Resign" element={<Resign />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
