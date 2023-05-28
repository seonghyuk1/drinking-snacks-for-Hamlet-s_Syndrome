const express = require("express");
const path = require("path");
const app = express();

//소켓용
const http = require("http");
const Server = require("socket.io").Server;

const server = http.createServer(app);
// 소켓 뚫기
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  // 연결시
  // console.log("연결 되었습니다.");
  // 연결 해제시
  socket.on("disconnect", () => {
    // console.log("연결 해제!");
  });

  // chat이벤트를 받으면 받은 말들을 전체에 뿌려주세요
  socket.on("chat", (data) => {
    io.emit("chat", data);
  });
});

const cors = require("cors");

//Socket 사용하는 코드
// const http = require("http").createServer(app);
// const { Server } = require("socket.io");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "react-app/build")));

// 환경변수
require("dotenv").config();

// JWT
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;

// bcrypt Salt
const bcrypt = require("bcrypt");
const saltRounds = 10;

const MongoClient = require("mongodb").MongoClient;
MongoClient.connect(process.env.DB_URL, function (err, client) {
  // if (err) return console.log(err);
  db = client.db("kwic");

  server.listen(process.env.PORT, function () {
    console.log("80에서 돌아가는 중");
  });
});

// ----------------------------------------------------------------------------

// 회원가입 정보 기입
app.post("/api/submitSignUp", function (req, res) {
  db.collection("login").findOne({ 아이디: req.body.id }, function (err, result) {
    if (err) return console.log(err);
    else if (result) {
      res.json("Exist");
    } else {
      // pw는 소금 + 해시값 동시 생성 및 DB 적재
      bcrypt.hash(req.body.pw, saltRounds, (err, hash) => {
        // console.log(`생성 hash\t${hash}`);
        db.collection("login").insertOne({ 아이디: req.body.id, 패스워드: hash, 닉네임: req.body.name }, function (err, result) {
          if (err) return console.log(err);
          res.json({ redirectUrl: "/" });
        });
      });
    }
  });
});

// 중복 ID 체크
app.post("/api/Signup/checkDuplicateID", function (req, res) {
  db.collection("login").findOne({ 아이디: req.body.id }, function (err, result) {
    if (err) return console.log(err);
    // console.log(result);
    if (result) {
      res.json("Exist");
    } else {
      res.json("notExist");
    }
  });
});

// 데이터베이스 암호화 비밀번호 전달 API
app.get("/api/pw", function (req, res) {
  // 배열로 전달 login 데이터베이스 정보 전달
  db.collection("login")
    .find()
    .toArray(function (err, result) {
      if (err) {
        console.log(err);
        res.status(500).json({ error: "서버 에러 발생" });
      } else {
        res.json(result);
        // console.log(result);
      }
    });
});

// 로그인
app.post("/api/login", async function (req, res) {
  try {
    // 입력한 아이디 조회
    const resultId = await db.collection("login").findOne({ 아이디: req.body.id });

    if (resultId) {
      // 입력한 패스워드로 사용자의 패스워드 조회
      const resultPw = await db.collection("login").findOne({ 패스워드: req.body.pw });

      if (resultPw) {
        // 입력한 폼 비밀번호와 저장된 암호화 비밀번호 비교
        const result = await bcrypt.compare(req.body.form_pw, req.body.pw);

        if (result) {
          // 인증 성공시 JWT 토큰 생성
          jwt.sign({ id: resultId._id, nickname: resultId.nickname }, secretKey, { expiresIn: "1d" }, (err, token) => {
            if (err) {
              console.log(err);
              res.status(500).json({ error: "서버 에러 발생" });
            } else {
              // 토큰 전달
              res.json(token);
            }
          });
        } else {
          // 비밀번호 미일치
          res.json("Not_Exist_Pw");
        }
      }
    } else {
      // 아이디 미존재
      res.json("Not_Exist_Id");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "서버 에러 발생" });
  }
});

//  해당 주류 id값에 해당하는 값을 데이터베이스 인덱스에서 가져옴
app.get("/detail/:id", function (req, res) {
  const detailId = req.params.id;
  db.collection("detail")
    .findOne({ id: detailId })
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "서버 에러 발생" });
    });
});

// 가장 힘들었었던 update부분 | 어레이 + 배열 조합이라 접근이 어려웠음
app.post("/wish", function (req, res) {
  const restaurant = req.body.restaurantName;
  const newWish = req.body.newWish;

  db.collection("food")
    .updateOne({ "food.식당": restaurant }, { $set: { "food.$.wish": newWish } })
    .then(() => {
      console.log("wish 업데이트 완료");
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "서버 에러 발생" });
    });
});

// 안주 이름에 해당하는 식당 정보들 가지고 오기
app.post("/food", function (req, res) {
  db.collection("food")
    .findOne({ name: req.body.foodCategory })
    .then((result) => {
      res.json(result);
      // console.log(result);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "서버 에러 발생" });
    });
});

//마이페이지 구현 - 저장 (각 음식 페이지에서 활용)
app.post("/selection", function (req, res) {
  db.collection("selection").insertOne({
    drink: req.body.drink,
    식당: req.body.식당,
    위치: req.body.위치,
    특징: req.body.특징,
    평균가격: req.body.평균가격,
    좋아요: req.body.좋아요,
    id: req.body.id,
    종류: req.body.종류,
    삭제용: req.body.삭제용,
    사진: req.body.사진,
  });
});

// 모든 찜목록 데이터 - 추후에 내 id를 통해 가져올 것
app.post("/mySelected", function (req, res) {
  db.collection("selection")
    .find({ id: req.body.data })
    .toArray(function (err, result) {
      res.json(result);
      // console.log(result);
    });
});

//마이페이지 찜 목록에서 삭제
app.post("/delete", function (req, res) {
  db.collection("selection").deleteOne({ 삭제용: req.body.data }, function (err, result) {
    // console.log(result);
    res.json("삭제완료");
  });
});

//비밀번호 변경
app.post("/changePW", function (req, res) {
  db.collection("login").findOne({ 아이디: req.body.id }, function (err, result) {
    if (result) {
      bcrypt.compare(req.body.current, req.body.hash).then((result) => {
        if (result) {
          //패스워드 일치
          //새 비밀번호와 다시 입력한게 다를때
          if (req.body.new != req.body.re) {
            res.json("비밀번호 재입력 오류");
          } else {
            //현재 비밀번호와 새로 작성한 비밀번호가 동일할때
            if (req.body.new == req.body.current) {
              res.json("비밀번호 동일");
            } else {
              //정상적으로 바꾸면 DB 업데이트 하고 홈 이동
              bcrypt.hash(req.body.new, saltRounds, (err, hash) => {
                db.collection("login").updateOne({ 아이디: req.body.id }, { $set: { 패스워드: hash } }, function (err, result) {
                  // console.log("수정완료");
                  res.redirect("/Main");
                });
              });
            }
          }
        } else {
          //패스워드 일치하지 않음
          res.json("현재 패스워드 안맞음");
        }
      });
    }
  });
});

//회원탈퇴
app.post("/resign", function (req, res) {
  db.collection("login").findOne({ 아이디: req.body.id }, function (err, result) {
    if (result) {
      bcrypt.compare(req.body.current, req.body.hash).then((result) => {
        if (result) {
          //패스워드 일치
          db.collection("login").deleteOne({ 아이디: req.body.id }, function (err, result) {
            // console.log("삭제완료");
            res.redirect("/");
          });
        } else {
          //패스워드 일치하지 않음
          res.json("현재 패스워드 안맞음");
        }
      });
    } else {
      db.collection("selection").deleteMany({ id: req.body.id });
    }
  });
});

//닉네임 변경
app.post("/changeNickname", function (req, res) {
  db.collection("login").findOne({ 아이디: req.body.id }, function (err, result) {
    if (result) {
      db.collection("login").updateOne({ 아이디: req.body.id }, { $set: { 닉네임: req.body.nickname } }, function (err, result) {
        res.json(req.body.nickname);
      });
    } else {
      console.log("찾는 아이디 없음");
    }
  });
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "/react-app/build/index.html"), function (err) {
    if (err) {
      req.status(500).send(err);
    }
  });
});
