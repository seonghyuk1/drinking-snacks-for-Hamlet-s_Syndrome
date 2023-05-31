import axios from "axios";

// 회원가입 아이디 중복확인
export const checkDuplicateID = async (id) => {
  try {
    const res = await axios.post("api/signup/checkDuplicateID", id);
    console.log("검사여부 : " + res.data);
    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// 회원 가입 제출
export const submitSignUp = async (id, name, pw) => {
  const body = {
    id,
    name,
    pw,
  };
  // 서버로 데이터를 보낼 때 이미 존재하는 아이디라면 회원가입 불가
  try {
    const res = await axios.post("api/submitSignUp", body);

    if (res.data === "Exist") {
      alert("이미 존재하는 아이디이오니 다른 아이디를 사용하여 주세요.");
    } else {
      window.location.href = res.data.redirectUrl;
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// -----------------------------Mypage-------------------------

// 닉네임 변경
export const updateNickName = async (userId, nickName, navigate) => {
  try {
    axios.post("changeNickname", { userId, nickName }).then((res) => {
      sessionStorage.setItem("Nickname", res.data);
      navigate("/Main");
    });
  } catch (err) {
    console.log(err);
  }
};

// 비밀번호 변경
export const changePw = async (userId, currentPw, newPw, verifyPw, navigate) => {
  try {
    await axios.post("/api/findPw", { userId }).then((res) => {
      // 암호화된 비밀번호를 변수에 저장
      const saltPw = res.data.패스워드;

      axios.post("/api/changePw", { userId, currentPw, saltPw, newPw, verifyPw }).then((res) => {
        if (res.data === "Not match nowPw") {
          alert("현재 패스워드를 잘못 입력하셨습니다.");
        } else if (res.data === "Not match newPw, verifyPw") {
          alert("입력하신 비밀번호와 비밀번호 확인이 맞지 않습니다.");
        } else if (res.data === "match nowPw, newPw") {
          alert("기존 비밀번호와 새로운 비밀번호가 동일합니다.");
        } else {
          navigate("/Main");
          alert("비밀번호 변경이 완료되었습니다.");
        }
      });
    });
  } catch (err) {
    console.log(err);
  }
};
