const express = require("express");
const path = require("path");
const app = express();

//Socket 사용하는 코드
// const http = require("http").createServer(app);
// const { Server } = require("socket.io");

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

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "react-app/build")));
app.use((req, res, next) => {
  res.setHeader("Set-Cookie", "SameSite=None; Secure"); // SameSite 속성 설정
  next();
});

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

// 안주 이름에 해당하는 식당 정보들 가지고 오기
app.post("/food", function (req, res) {
  db.collection("food")
    .findOne({ name: req.body.selectedFoodCate })
    .then((result) => {
      res.json(result);
      // console.log(result);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "서버 에러 발생" });
    });
});

// 데이터베이스 암호화 비밀번호 전달 API
app.get("/test", function (req, res) {
  // 배열로 전달 login 데이터베이스 정보 전달
  db.collection("food")
    .find()
    .toArray(function (err, result) {
      if (err) {
        console.log(err);
        res.status(500).json({ error: "서버 에러 발생" });
      } else {
        res.json(result);
        console.log(result);
      }
    });
});

//마이페이지 구현 - 저장 (각 음식 페이지에서 활용)
app.post("/selection", function (req, res) {
  db.collection("selection").insertOne({
    restaurantName: req.body.restaurantName,
    drink: req.body.drink,
    foodCategory: req.body.selectedFoodCate,
    avgPrice: req.body.avgPrice,
    feature: req.body.feature,
    userId: req.body.userId,
    storeLocation: req.body.storeLocation,
    wish: req.body.wish,
    deleteId: req.body.deleteId,
    foodImg: req.body.foodImg,
  });
});

// 내 id에 해당하는 찜목록
app.post("/mySelected", function (req, res) {
  db.collection("selection")
    .find({ userId: req.body.userId })
    .toArray(function (err, result) {
      res.json(result);
      // console.log(result);
    });
});

//마이페이지 찜 목록에서 삭제
app.post("/delete", function (req, res) {
  db.collection("selection").deleteOne({ deleteId: req.body.deleteId }, function (err, result) {
    // console.log(result);
    res.json("삭제완료");
  });
});

//닉네임 변경
app.post("/changeNickname", function (req, res) {
  db.collection("login").findOne({ 아이디: req.body.userId }, function (err, result) {
    if (result) {
      db.collection("login")
        .updateOne({ 아이디: req.body.userId }, { $set: { 닉네임: req.body.nickName } })
        .then(() => {
          res.json(req.body.nickName);
        });
    } else {
      console.log("찾는 아이디 없음");
    }
  });
});

// 데이터베이스에서 암호화된 비밀번호 갖고 오기 - 비밀번호 변경
app.post("/api/findPw", async (req, res) => {
  try {
    // id를 사용하여 데이터베이스에서 해당 사용자의 정보를 가져옴
    const user = await db.collection("login").findOne({ 아이디: req.body.userId });
    if (!user) {
      res.status(404).json({ error: "사용자를 찾을 수 없음" });
      return;
    }
    // 암호화된 비밀번호를 응답으로 전달
    res.json({ 패스워드: user.패스워드 });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "서버 에러 발생" });
  }
});

// 패스워드 변경 API 엔드포인트
app.post("/api/changePw", (req, res) => {
  db.collection("login").findOne({ 아이디: req.body.userId }, function (err, result) {
    if (result) {
      // 입력한 현재 비밀번호와 데이터베이스의 암호화 비밀번호의 일치 여부 확인
      bcrypt.compare(req.body.currentPw, req.body.saltPw).then((result) => {
        if (result) {
          //패스워드 일치
          //새 비밀번호와 다시 입력한게 다를때
          if (req.body.newPw != req.body.verifyPw) {
            res.json("Not match newPw, verifyPw");
          } else {
            //현재 비밀번호와 새로 작성한 비밀번호가 동일할때
            if (req.body.newPw == req.body.currentPw) {
              res.json("match nowPw, newPw");
            } else {
              //정상적으로 바꾸면 DB 업데이트 하고 홈 이동
              bcrypt.hash(req.body.newPw, saltRounds, (err, hash) => {
                db.collection("login")
                  .updateOne({ 아이디: req.body.userId }, { $set: { 패스워드: hash } })
                  .then(() => {
                    res.redirect("/Main");
                  });
              });
            }
          }
        } else {
          //패스워드 일치하지 않음
          res.json("Not match nowPw");
        }
      });
    }
  });
});

//회원탈퇴
app.post("/resign", function (req, res) {
  db.collection("login").findOne({ 아이디: req.body.userId }, function (err, result) {
    if (result) {
      bcrypt.compare(req.body.currentPw, req.body.saltPw).then((result) => {
        if (result) {
          // 갖고있던 찜목록 전부 삭제
          db.collection("selection").deleteMany({ userId: req.body.userId });

          //패스워드 일치
          db.collection("login")
            .deleteOne({ 아이디: req.body.userId })
            .then(() => {
              res.redirect("/");
            });
        } else {
          //패스워드 일치하지 않음
          res.json("Not match currentPw");
        }
      });
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
