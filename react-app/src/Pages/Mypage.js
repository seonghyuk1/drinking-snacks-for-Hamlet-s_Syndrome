/* eslint-disable */
import { Link } from "react-router-dom";
import axios from "axios";
// import Show from "./Show";
import React, { useState, useEffect } from "react";
import "../styles/Mypage.css";

function Mypage() {
  //찜 목록을 보여주기 위해, views에 DB에 저장된 하나의 객체를 입력
  let [views, setView] = useState([]);
  const ID = sessionStorage.getItem("ID");
  let [state, setState] = useState(false);

  let [test, setTest] = useState([]);

  let 갖고온거 = [];
  let 내거 = views.filter((e) => e.id == sessionStorage.getItem("ID"));
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

      <div className=" bg-light rounded m-3 p-3 containerBox2 ">
        <div className="row">
          {views.length == 0 && (
            <div class="bg-light rounded containerBox col text-center rounded mx-auto">
              <div className="col-6  m-2 position-absolute top-50 start-50 translate-middle ">
                <h2 className="pt-2 text-secondary">찜 목록이 비어있습니다.</h2>
                <h4 className="pt-2 text-secondary">가게를 찾아보아요😋</h4>
              </div>
            </div>
          )}
          {views &&
            views.map((v, i) => {
              return (
                <div className="col-6 col-lg-3 pt-3" key={i}>
                  {/* style={state ? hidden : active} */}
                  <div className="d-flex justify-content-center">
                    <div className="card h-100" style={{ width: "18rem;" }}>
                      <h5 className="text-center card-title p-1">
                        {views[i].drink}
                      </h5>

                      <img
                        src={"/assets/3/3.jpg"}
                        className="card-img-top p-1"
                        alt="..."
                        style={{ height: "10rem;" }}
                      />
                      <div className="card-body">
                        <p className="card-text">
                          <strong>식당</strong> : {views[i].식당}
                        </p>
                        <p className="card-text">
                          <strong>종류</strong> : {views[i].종류}
                        </p>
                        <p className="card-text">
                          <strong>위치</strong> : {views[i].위치}
                        </p>
                        <p className="card-text">
                          <strong>평균가격</strong> : {views[i].평균가격}
                        </p>
                        <p className="card-text">
                          <strong>특징</strong> : {views[i].특징}
                        </p>
                        <button
                          className="btn btn-dark mt-3 d-grid gap-2 col-6 mx-auto"
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
                                결과.data === "삭제완료" &&
                                  alert("삭제가 완료 되었습니다. ");
                                // views = views.filter((e) => e.id == sessionStorage.getItem("ID"));
                                // console.log(views);
                                // setView([...결과]);
                                // 새로고침 함수 - 안먹음
                                // location.replace("/");
                                // history.go(0);
                              })
                              .then(
                                axios
                                  .post("/mypage", { data: ID })
                                  .then((응답) => {
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
        </div>
      </div>
    </>
  );
}

export default Mypage;
