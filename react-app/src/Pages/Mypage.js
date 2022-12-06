/* eslint-disable */
import { Link } from "react-router-dom";
import axios from "axios";
// import Show from "./Show";
import React, { useState, useEffect } from "react";

function Mypage() {
  //찜 목록을 보여주기 위해, views에 DB에 저장된 하나의 객체를 입력
  let [views, setView] = useState([]);
  const ID = sessionStorage.getItem("ID");
  let [state, setState] = useState(false);

  let [test, setTest] = useState([]);

  let 갖고온거 = [];

  useEffect(() => {
    axios.post("/mypage", { data: ID }).then((응답) => {
      setView([...views, ...응답.data]);
    });
  }, []);

  console.log("뷰", views);
  const count = views.length;

  // async function submitHandler(e) {
  //   e.preventDefault();
  //   try {
  //     await axios
  //       .delete("/delete", {
  //         data: {
  //           // 서버에서 req.body.{} 로 확인할 수 있다.
  //           deleteId: 내거._id,
  //         },
  //         withCredentials: true,
  //       })
  //       .then((res) => {
  //         setState(!state);
  //         //fadeout 시키면서 view에 있는 해당 내용 삭제
  //         // setUsers(users.filter(user => user.id !== id));
  //       })
  //       .then((res) => {
  //         setView(views.filter((view) => view.삭제용 !== 내거.삭제용));
  //       });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  return (
    <>
      {/* 메뉴바를 만들어서 해당 기능으로 이동 */}

      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <b>
                  <Link className="nav-link active" to="/Mypage">
                    찜 목록({count})
                  </Link>
                </b>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/ChangeNickname">
                  닉네임 변경
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/ChangePassword">
                  비밀번호 변경
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/Resign">
                  회원 탈퇴
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {views.length == 0 && <h1>텅</h1>}
      {views &&
        views.map((v, i) => {
          return (
            <div className="row row-cols-1 row-cols-md-3 g-4 mx-auto" style={{ display: "inline" }} key={i}>
              {/* style={state ? hidden : active} */}
              <div className="col">
                <div className="card h-100">
                  <h5 className="card-title">{views[i].drink}</h5>

                  <img src={"/assets/3/3.jpg"} className="card-img-top" alt="..." style={{ height: "100px", width: "100px" }} />
                  <div className="card-body">
                    <p className="card-text">식당 : {views[i].식당}</p>
                    <p className="card-text">종류 : {views[i].종류}</p>
                    <p className="card-text">위치 : {views[i].위치}</p>
                    <p className="card-text">평균가격 : {views[i].평균가격}</p>
                    <p className="card-text">특징 : {views[i].특징}</p>
                    <button
                      className="btn btn-dark mt-5 d-grid gap-2 col-6 mx-auto"
                      onClick={() => {
                        axios
                          .post(
                            "/delete",
                            {
                              data: views[i].삭제용,
                            },
                            { withCredentials: true }
                          )
                          .then((결과) => {
                            // setState(!state);
                            console.log(결과);
                            결과.data === "삭제완료" && alert("삭제가 완료 되었습니다. ");
                            // views = views.filter((e) => e.id == sessionStorage.getItem("ID"));
                            // console.log(views);
                            // setView([...결과]);
                            // 새로고침 함수 - 안먹음
                            // location.replace("/");
                            // history.go(0);
                          })
                          .then(
                            axios.post("/mypage", { data: ID }).then((응답) => {
                              갖고온거 = 응답.data;
                              console.log("갖고온거", 갖고온거);
                              setView([...갖고온거]);
                            })
                          );
                      }}
                    >
                      삭제하기
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
}

export default Mypage;
