import axios from "axios";

// 회원가입 아이디 중복확인
export const checkDuplicateID = async (id) => {
  const body = {
    id: id,
  };
  try {
    const res = await axios.post("api/signup/checkDuplicateID", body);
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
    id: id,
    name: name,
    pw: pw,
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
