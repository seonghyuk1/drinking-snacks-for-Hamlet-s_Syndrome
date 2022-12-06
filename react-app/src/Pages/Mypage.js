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

  let 갖고온거 = [];

  useEffect(() => {
    axios.get("/selection").then((응답) => {
      갖고온거 = 응답.data;
      console.log("갖고온거", 갖고온거);
      // views에 DB로부터 가져온 json 객체를 저장하고, 밑에서 map 함수를 통해 렌더링
      // console.log(요청);
      // console.log(요청.data);
      // let test = 요청.data.pop();
      // console.log(test);
      // test.id != null &&
      //   setView((views) => [
      //     ...views,
      //     {
      //       ID: 요청.data.ID,
      //       drink: 요청.data.drink,
      //       식당: 요청.data.식당,
      //       위치: 요청.data.위치,
      //       특징: 요청.data.특징,
      //       평균가격: 요청.data.평균가격,
      //       좋아요: 요청.data.좋아요,
      //       id: 요청.data.id,
      //     },
      //   ]);

      // setView(갖고온거.filter((e) => e.id != essionStorage.getItem("ID")));
      console.log(갖고온거);
      setView([...views, ...갖고온거]);
    });
  }, []);

  console.log("뷰", views);
  // let 내거 = views.filter((e) => e.삭제용 == sessionStorage.getItem("ID") + e.식당);
  let 내거 = views.filter((e) => e.id == sessionStorage.getItem("ID"));

  console.log("내거", 내거);
  //DB에서 가져온 찜한 데이터는 반복문을 돌면서 Show에서 렌더링
  // const viewList = views.map((obj) => <Show obj={obj} views={views} setView={setView} />);
  //찜목록 옆에 현재 찜한 개수 표현하기
  const count = 내거.length;

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
                <Link className="nav-link active" to="/selection">
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

      {내거.length == 0 && <h1>텅</h1>}
      {내거 &&
        내거.map((v, i) => {
          return (
            <div className="row row-cols-1 row-cols-md-3 g-4 mx-auto" style={{ display: "inline" }} key={i}>
              {/* style={state ? hidden : active} */}
              <div className="col">
                <div className="card h-100">
                  <h5 className="card-title">{내거[i].drink}</h5>

                  <img src={"/assets/3/3.jpg"} className="card-img-top" alt="..." style={{ height: "100px", width: "100px" }} />
                  <div className="card-body">
                    <p className="card-text">식당 : {내거[i].식당}</p>
                    <p className="card-text">종류 : {내거[i].종류}</p>
                    <p className="card-text">위치 : {내거[i].위치}</p>
                    <p className="card-text">평균가격 : {내거[i].평균가격}</p>
                    <p className="card-text">특징 : {내거[i].특징}</p>
                    <button
                      className="btn btn-dark mt-5 d-grid gap-2 col-6 mx-auto"
                      onClick={() => {
                        axios
                          .post(
                            "/delete",
                            {
                              data: 내거[i].삭제용,
                            },
                            { withCredentials: true }
                          )
                          .then((결과) => {
                            // setState(!state);
                            console.log(결과);
                            결과.data === "삭제완료" && alert("삭제가 완료 되었습니다. ");
                            내거 = views.filter((e) => e.id == sessionStorage.getItem("ID"));
                            console.log(내거);
                            // 새로고침 함수 - 안먹음
                            // location.replace("/");
                            // history.go(0);
                          });
                      }}
                    >
                      삭제하기
                    </button>
                  </div>
                </div>
              </div>
              {/* {console.log(내거[i].삭제용)} */}
            </div>
          );
        })}
    </>
  );
}

export default Mypage;
