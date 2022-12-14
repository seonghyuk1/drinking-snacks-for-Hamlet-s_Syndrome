import { IoIosArrowUp } from "react-icons/io";
import "../styles/Footer.css";

function Footer() {
  // eslint-disable-next-line no-restricted-globals

  const clickToTop = () => {
    window.scrollTo(0, 0);
  };

  const content = [
    // {
    //   title: "홍성혁",
    //   lists: {
    //     text1: "2017204061",
    //     text2: "Careerㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ  ",
    //   },
    // },
    // {
    //   title: "김대현",
    //   lists: {
    //     text1: "Facebook",
    //     text2: "Twitter",
    //   },
    // },
    // {
    //   title: "김태연",
    //   lists: {
    //     text1: "Sell on fake Amazon",
    //     text2: "Sell under fake Amazon",
    //   },
    // },
  ];

  return (
    <>
      <div className="Container mt-5">
        <div className="UpBtn" onClick={clickToTop}>
          <IoIosArrowUp className="UpIcon" />
        </div>
      </div>
      <div className="FooterWrap">
        <div className="Content">
          {content.map((a, i) => {
            return (
              <div key={i} class="col-2">
                <div className="TextWrap">
                  <div className="Title">
                    <b>{a.title}</b>
                  </div>

                  <div>{a.lists.text1}</div>
                  <div>{a.lists.text2}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* <hr style={{ margin: "0 0 0.3px 0" }} /> */}

      <div>
        <span className="FooterText"></span>
        <span className="FooterText">경기도 성남시 분당구 대왕판교로 644번길 12 (우)13494 12, Daewangpangyo-ro 644beon-gil, Bundang-gu, Seongnam-si, Gyeonggi-do, Korea (13494). </span>
        <span className="FooterText">KWIC_웹 설계 및 구현 6조 &copy; </span>
      </div>
    </>
  );
}

export default Footer;
