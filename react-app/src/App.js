/* disable-eslint */
import Login from "./Pages/Login";
import Main from "./Pages/Main";
import Signup from "./Pages/Signup";
import Detail from "./Pages/Detail";
import Result from "./Pages/Result";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Mypage from "./Pages/Mypage";
import ChangePassword from "./Pages/ChangePassword";
import Resign from "./Pages/Resign";
import { Routes, Route } from "react-router-dom";
import ChangeNickname from "./Pages/ChangeNickname";

function App() {
  return (
    <>
      {sessionStorage.getItem("ID") && <Header />}
      {/* {!sessionStorage.getItem("ID") && } */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="Main" element={<Main />} />
        <Route path="/Detail/:id" element={<Detail />} />
        <Route path="/Result" element={<Result />} />
        <Route path="/Mypage" element={<Mypage />} />
        <Route path="/ChangeNickname" element={<ChangeNickname />} />
        <Route path="/ChangePassword" element={<ChangePassword />} />
        <Route path="/Resign" element={<Resign />} />
      </Routes>
      {sessionStorage.getItem("ID") && <Footer />}
    </>
  );
}

export default App;
