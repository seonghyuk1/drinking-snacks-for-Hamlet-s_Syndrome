/* eslint-disable*/
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Header() {
  const userName = sessionStorage.getItem("ID");
  let navigate = useNavigate();
  const myJWT = sessionStorage.getItem("JWT");

  // 무한 렌더링 방지
  // 토큰 없을 시 로그인으로

  useEffect(() => {
    myJWT == null && navigate("/");
  }, []);
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light" style={{ width: "100%" }}>
        <div className="container-fluid">
          <a className="navbar-brand m-3" href="/main">
            우리는 오늘 어떤 한 잔의 추억을 쌓을까? 🍻
          </a>
        </div>
        {myJWT != null && (
          <div>
            <p className="nav-link disabled m-3 ">
              환영합니다💖! <b>{userName}</b> 고객님
            </p>
            <button
              className="btn btn-secondary mx-3 "
              onClick={(e) => {
                e.preventDefault();
                sessionStorage.clear();
                navigate("/");
              }}
            >
              로그아웃
            </button>
          </div>
        )}
      </nav>
    </>
  );
}

export default Header;
