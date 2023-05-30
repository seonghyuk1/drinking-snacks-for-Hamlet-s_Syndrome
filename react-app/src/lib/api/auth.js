import axios from "axios";

// SOLID 원칙에 따라 코드를 분할, 단일 책임 원칙 (Single responsibility principle)
// 로그인 처리 함수
export async function loginSubmit(id, pw, navigate) {
  try {
    const user = await findUser(id);

    if (!user) {
      alert("존재하지 않는 아이디입니다.");
      return;
    }

    const { 패스워드, 닉네임 } = user;

    sessionStorage.setItem("Nickname", 닉네임);
    sessionStorage.setItem("userId", id);

    const loginData = await login(id, 패스워드, pw);

    handleLoginData(loginData, navigate);
  } catch (error) {
    console.log(error);
  }
}

// 아이디로 사용자 찾기
async function findUser(id) {
  try {
    const response = await axios.get("api/pw");
    const data = response.data;

    return data.find((item) => item.아이디 === id);
  } catch (error) {
    console.log(error);
    return null;
  }
}

// 로그인 처리
async function login(id, 패스워드, form_pw) {
  try {
    const body = {
      id: id,
      pw: 패스워드,
      form_pw: form_pw,
    };

    const response = await axios.post("api/login", body);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

// 로그인 데이터 처리
function handleLoginData(loginData, navigate) {
  if (loginData === "Not_Exist_Id") {
    alert("아이디를 잘못 입력하셨습니다.");
  } else if (loginData === "Not_Exist_Pw") {
    alert("비밀번호가 틀렸습니다.");
  } else {
    sessionStorage.setItem("JWT", loginData);
    if (sessionStorage.JWT !== null) {
      navigate("/main");
      window.location.reload();
    }
  }
}
