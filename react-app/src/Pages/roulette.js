import React from "react";
import { Wheel } from "react-custom-roulette";

function Roulette({ mustSpin, prizeNumber, data, onStopSpinning }) {
  return (
    <div className="pt-3 pb-3 ">
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={data}
        outerBorderColor={["#f2f2f2"]}
        outerBorderWidth={[7]}
        innerBorderColor={["#f2f2f2"]}
        radiusLineColor={["#f2f2f2"]}
        radiusLineWidth={[5]}
        textColors={["#000000"]}
        fontSize={[15]}
        perpendicularText={[false]}
        backgroundColors={[
          "#FF4500", // 주황색
          "#FFD700", // 금색
          "#00FF00", // 라임색
          "#FF1493", // 핑크
          "#00BFFF", // 파랑
          "#8A2BE2", // 보라
          "#FFFF00", // 노랑
        ]}
        onStopSpinning={onStopSpinning}
      />
    </div>
  );
}

export default Roulette;
