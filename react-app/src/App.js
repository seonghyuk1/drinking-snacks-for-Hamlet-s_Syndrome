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
=======
>>>>>>> d27c97a42f5ea01dc134cdbe6ce96369c63fd9ae
import { Routes, Route } from "react-router-dom";

function App() {
  return (
<<<<<<< HEAD
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
=======
    <> 
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/Main" element={<Main />} />
        <Route path="/Detail/:id" element={<Detail />} />
        <Route path="/Result" element={<Result />} />
        <Route path="/mypage" element={<Mypage />} />
>>>>>>> d27c97a42f5ea01dc134cdbe6ce96369c63fd9ae
      </Routes>
      <Footer />
    </>
  );
}

export default App;