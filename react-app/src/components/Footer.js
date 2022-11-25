import { IoIosArrowUp } from "react-icons/io";
import "../styles/Footer.css";

function Footer() {
  // eslint-disable-next-line no-restricted-globals

  const clickToTop = () => {
    window.scrollTo(0, 0);
  };

  const content = [
    {
      title: "Get to Know Us",
      lists: {
        text1: "About",
        text2: "Career",
        text3: "Press",
        text4: "Amazon Cares",
        text5: "Gift a smile",
      },
    },
    {
      title: "Connect with us",
      lists: {
        text1: "Facebook",
        text2: "Twitter",
        text3: "Instagram",
      },
    },

    {
      title: "Make Money with Us",
      lists: {
        text1: "Sell on fake Amazon",
        text2: "Sell under fake Amazon",
        text3: "Become an Affiliate",
        text4: "Fulfilment by Amazon",
        text5: "Amazon Pay",
      },
    },
    {
      title: "Connect with us",
      lists: {
        text1: "COVID-19 and Amazon",
        text2: "Your Account",
        text3: "Returns Centre",
        text4: "100% Purchase Protection",
        text5: "Amazon App Download",
        text6: "Amazon Assistant Download",
        text7: "Help",
      },
    },
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
              <div key={i}>
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
        <span className="FooterText">KWIC_웹 설계 및 구현 6조 &copy; </span>
      </div>
    </>
  );
}

export default Footer;
