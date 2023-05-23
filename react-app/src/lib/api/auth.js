import axios from "axios";

export async function loginSubmit(id, pw, navigate) {
  try {
    const response = await axios.get("api/pw");
    const data = response.data;

    const user = data.find((item) => item.아이디 === id);

    if (!user) {
      alert("존재하지 않는 아이디입니다.");
      return;
    }

    const { 패스워드, 닉네임 } = user;

    sessionStorage.setItem("Nickname", 닉네임);

    const body = {
      id: id,
      pw: 패스워드,
      form_pw: pw,
    };

    const loginResponse = await axios.post("api/login", body);
    const loginData = loginResponse.data;

    if (loginData === "Not_Exist_Id") {
      alert("아이디를 잘못 입력하셨습니다.");
    } else if (loginData === "Not_Exist_Pw") {
      alert("비밀번호가 틀렸습니다.");
    } else {
      sessionStorage.setItem("JWT", loginData);
      if (sessionStorage.JWT !== null) {
        navigate("/main"); // navigate 함수 사용

        window.location.reload();
      }
    }
  } catch (error) {
    console.log(error);
  }
}
