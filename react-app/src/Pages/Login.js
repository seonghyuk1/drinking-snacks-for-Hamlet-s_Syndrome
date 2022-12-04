/* eslint-disable */
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
// import Header from "../components/Header";

function Login() {
  let [id, setId] = useState("");
  let [pw, setPw] = useState("");
  let NickName;
  const navigate = useNavigate();

  const idHandler = (e) => {
    e.preventDefault();
    setId(e.target.value);
  };

  const pwHandler = (e) => {
    e.preventDefault();
    setPw(e.target.value);
  };

  async function submitHandler(e) {
    e.preventDefault();

    let saltPw;
    // 폼에 입력한 ID를 세션 스토리지에 저장 (회원정보 띄울용)

    try {
      await axios.get("api/pw").then((응답) => {
        // 입력한 아이디와 데이터베이스 속 아이디가 같다면 그 암호화 비밀번호를 SALT_pw에 저장
        {
          for (let i = 0; i < 응답.data.length; i++) {
            // 암호화된 비밀번호를 변수에 저장
            응답.data[i].아이디 == id && (saltPw = 응답.data[i].패스워드);
            응답.data[i].아이디 == id && (NickName = 응답.data[i].닉네임);
          }
        }

        console.log("암호화 비번", saltPw);
        console.log("입력한 비번", pw);
        console.log(응답.data);
        // 암호화된 비밀번호와 입력 비밀번호 둘 다 전달
        let body = {
          id: id,
          pw: saltPw,
          form_pw: pw,
        };

        axios.post("api/login", body).then((res) => {
          console.log(res);
          if (res.data == "아이디미존재") {
            alert("아이디가 존재하지 않습니다.");
          } else if (res.data == "비번미존재") {
            alert("비밀번호가 틀렸습니다.");
          } else {
            {
              NickName !== "" ? sessionStorage.setItem("Nickname", NickName) : sessionStorage.setItem("Nickname", id);
            }
            sessionStorage.setItem("ID", id);
            // 세션에 토큰 저장
            sessionStorage.setItem("JWT", res.data);
            // 토큰 발급 안 됐을시 제자리
            {
              sessionStorage.JWT != null && navigate("/main");
            }
          }
        });
      });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <h4 className="container mt-5 col-6">로그인</h4>
      <div className="container mt-3 col-6 mx-auto">
        <form onSubmit={submitHandler}>
          <div className="form-group">
            <label>ID</label>
            <input type="text" className="form-control" value={id} onChange={idHandler}></input>
          </div>
          <div className="form-group">
            <label>Password</label>

            <input type="password" className="form-control" value={pw} onChange={pwHandler}></input>
          </div>
          <button className="btn btn-dark mt-5 d-grid gap-2 col-6 mx-auto" type="submit">
            로그인하기
          </button>
        </form>
        <Link className="btn btn-primary m-5 btn-lg d-grid gap-2 col-6 mx-auto" to="/Signup">
          회원가입
        </Link>
      </div>
    </>
  );
}

export default Login;

// /* eslint-disable */
// import { Link, useNavigate } from "react-router-dom";
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Header from "../components/Header";

// function Login() {
//   let [id, setId] = useState("");
//   let [pw, setPw] = useState("");
//   let [NickName, setNickName] = useState("");
//   const navigate = useNavigate();

//   const idHandler = (e) => {
//     e.preventDefault();
//     setId(e.target.value);
//   };

//   const pwHandler = (e) => {
//     e.preventDefault();
//     setPw(e.target.value);
//   };

//   async function submitHandler(e) {
//     e.preventDefault();

//     let body = {
//       SALT_pw: pw,
//     };
//     // 폼에 입력한 ID를 세션 스토리지에 저장 (회원정보 띄울용)
//     sessionStorage.setItem("ID", id);

//     try {
//       await axios.get("api/pw").then((응답) => {
//         console.log("입력한 아이디", id);
//         {
//           for (let i = 0; i < 응답.data.length; i++) {
//             // 암호화된 비밀번호를 전달하기 위해 폼 비밀번호에 대입
//             응답.data[i].아이디 == id && (saltPw = 응답.data[i].패스워드);
//             응답.data[i].아이디 == id && (NickName = 응답.data[i].닉네임);
//           }
//         }

//         sessionStorage.setItem("Nickname", NickName);
//         console.log("암호화 비번", body.SALT_pw);
//         console.log("입력한 비번", pw);
//         console.log(응답.data);
//         // 암호화된 비밀번호와 그냥 비밀번호 둘 다 전달
//         let R_body = {
//           id: id,
//           pw: body.SALT_pw,
//           form_pw: pw,
//         };
//         console.log(R_body);

//         axios.post("api/login", R_body).then((res) => {
//           console.log(res);
//           if (res.data == "아이디미존재") {
//             alert("아이디를 잘못 입력하셨습니다.");
//           } else if (res.data == "비번미존재") {
//             alert("비밀번호가 틀렸습니다.");
//           } else {
//             console.log("받아온 토큰 ", res.data);
//             // 세션에 토큰 저장
//             sessionStorage.setItem("JWT", res.data);
//             // 토큰 발급 안 됐을시 제자리
//             {
//               sessionStorage.JWT != null && navigate("/main");
//             }
//           }
//         });
//       });
//     } catch (err) {
//       console.log(err);
//     }
//   }

//   return (
//     <>
//       <h4 className="container mt-5 col-6">로그인</h4>
//       <div className="container mt-3 col-6 mx-auto">
//         <form onSubmit={submitHandler}>
//           <div className="form-group">
//             <label>ID</label>
//             <input type="text" className="form-control" value={id} onChange={idHandler}></input>
//           </div>
//           <div className="form-group">
//             <label>Password</label>

//             <input type="password" className="form-control" value={pw} onChange={pwHandler}></input>
//           </div>
//           <button className="btn btn-dark mt-5 d-grid gap-2 col-6 mx-auto" type="submit">
//             로그인하기
//           </button>
//         </form>
//         <Link className="btn btn-primary m-5 btn-lg d-grid gap-2 col-6 mx-auto" to="/Signup">
//           회원가입
//         </Link>
//       </div>
//     </>
//   );
// }

// export default Login;
