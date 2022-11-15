/* eslint-disable */
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
function Main() {
  const navigate = useNavigate();

  const myJWT = sessionStorage.getItem("JWT");
  // 토큰 없을 시 로그인으로
  const userName = sessionStorage.getItem("ID");

  // 무한 렌더링 방지
  useEffect(() => {
    {
      myJWT == null && navigate("/");
    }
  }, []);

  return (
    <>
      <nav class="navbar navbar-expand-lg bg-light">
        <p class="navbar-brand m-3 col-5">KWIC_WEB Shop 🏛</p>
      </nav>
      <div>
        <a class="nav-link disabled m-3 ">
          환영합니다💖! <b>{userName}</b> 고객님
        </a>
        <button
          class="btn btn-secondary mx-3 "
          onClick={(e) => {
            e.preventDefault();
            sessionStorage.clear();
            navigate("/");
          }}
        >
          로그아웃
        </button>
      </div>
      <div>
        <div class="nav justify-content-center my-4">
          <div class="card " style={{ width: 800 }}>
            <img src={`https://codingapple1.github.io/shop/shoes${1}.jpg`} class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">남자신발</h5>
              <p class="card-text">남자 신발입니다. 못삽니다. 링크 안 해놨거든요.</p>
            </div>
            <a href="#" class="btn btn-primary">
              사러가기!
            </a>
          </div>
        </div>

        <div class="nav justify-content-center my-4">
          <div class="card " style={{ width: 800 }}>
            <img src={`https://codingapple1.github.io/shop/shoes${2}.jpg`} class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">여자신발</h5>
              <p class="card-text">여자 신발입니다. 이것도 못삽니다. 링크 안 해놨거든요.</p>
            </div>
            <a href="#" class="btn btn-primary">
              사러가기!
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
