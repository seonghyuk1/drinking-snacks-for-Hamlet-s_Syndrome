/* disable-eslint */
import Login from "./Pages/Login";
import Main from "./Pages/Main";
import Signup from "./Pages/Signup";
import Detail from "./Pages/Detail";
import Result from "./Pages/Result";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Mypage from "./Pages/Mypage";
<<<<<<< HEAD
import Selection from "./Pages/Selection";
import ChangePassword from "./Pages/ChangePassword";
import Resign from "./Pages/Resign";

=======
import ChangePassword from "./Pages/ChangePassword";
import Resign from "./Pages/Resign";
>>>>>>> f68bdd87d92bd10905495c49b5e096d3d12d8f95
import { Routes, Route } from "react-router-dom";
import ChangeNickname from "./Pages/ChangeNickname";

function App() {
  return (
    <>
      {sessionStorage.getItem("Nickname") && <Header />}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="Main" element={<Main />} />
        <Route path="/Detail/:id" element={<Detail />} />
        <Route path="/Result" element={<Result />} />
<<<<<<< HEAD
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/Selection" element={<Selection/>}/>
=======
        <Route path="/Mypage" element={<Mypage />} />
        <Route path="/ChangeNickname" element={<ChangeNickname />} />
>>>>>>> f68bdd87d92bd10905495c49b5e096d3d12d8f95
        <Route path="/ChangePassword" element={<ChangePassword />} />
        <Route path="/Resign" element={<Resign />} />
      </Routes>
      {sessionStorage.getItem("Nickname") && <Footer />}
    </>
  );
}

export default App;
