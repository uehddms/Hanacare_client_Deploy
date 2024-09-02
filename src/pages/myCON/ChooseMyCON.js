import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../../api/baseURL";
import "./ChooseMyCON.css";

const ChooseMyCON = () => {
  const [selectedCon, setSelectedCon] = useState("");
  const navigate = useNavigate();
  const params = useParams(); //유저 아이디
  const handleClick = (e) => {
    const { value } = e.target;
    setSelectedCon(value);
  };

  // 폼 제출을 처리하는 함수
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCon) {
      alert("체질이 선택되지 않았어요");
      return;
    }

    try {
      const response = await axios.patch(`${baseURL}/users/profile/`, {
        username: params.username,
        constitution_8: selectedCon,
      });

      if (response.status === 200) {
        console.log("체질 선택 완료:", response.data.result);
        // 제출 후 /myCON 페이지로 이동
        navigate(`/myCON/${params.username}`);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("체질 선택 중 오류가 발생했습니다.");
    }
  };

  // 이전 페이지로 이동 버튼
  const BackButton = () => {
    navigate(-1);
  };

  return (
    <div className="MCbackground">
      <header className="blackHeader">
        <img alt="back" onClick={BackButton} src="/images/back.png" />
        <h2 className="STh2">나의 체질</h2>
      </header>
      <main className="MCmain">
        <div className="MCtext">
          <p>
            한의원/자가진단을 통해 진단한
            <br />
            나의 체질을 선택해주세요
          </p>
        </div>
        <form onSubmit={handleSubmit} className="MCchoices">
          <div className="MCchoices_btn">
            <button
              type="button"
              value="목양"
              onClick={handleClick}
              className={`MC_leftBtn ${
                selectedCon === "목양" ? "CMCselected" : ""
              }`}
            >
              목양
            </button>
            <button
              type="button"
              value="목음"
              onClick={handleClick}
              className={`MC_rightBtn ${
                selectedCon === "목음" ? "CMCselected" : ""
              }`}
            >
              목음
            </button>
            <button
              type="button"
              value="수양"
              onClick={handleClick}
              className={`MC_leftBtn ${
                selectedCon === "수양" ? "CMCselected" : ""
              }`}
            >
              수양
            </button>
            <button
              type="button"
              value="수음"
              onClick={handleClick}
              className={`MC_rightBtn ${
                selectedCon === "수음" ? "CMCselected" : ""
              }`}
            >
              수음
            </button>
            <button
              type="button"
              value="금양"
              onClick={handleClick}
              className={`MC_leftBtn ${
                selectedCon === "금양" ? "CMCselected" : ""
              }`}
            >
              금양
            </button>
            <button
              type="button"
              value="금음"
              onClick={handleClick}
              className={`MC_rightBtn ${
                selectedCon === "금음" ? "CMCselected" : ""
              }`}
            >
              금음
            </button>
            <button
              type="button"
              value="토양"
              onClick={handleClick}
              className={`MC_leftBtn ${
                selectedCon === "토양" ? "CMCselected" : ""
              }`}
            >
              토양
            </button>
            <button
              type="button"
              value="토음"
              onClick={handleClick}
              className={`MC_rightBtn ${
                selectedCon === "토음" ? "CMCselected" : ""
              }`}
            >
              토음
            </button>
          </div>
          <div className="MCchoices_images">
            <img
              className="MC_moreCON_conTree"
              alt="conTree"
              src="/images/conTree.png"
            />
            <img
              className="MC_moreCON_conWater"
              alt="conWater"
              src="/images/conWater.png"
            />
            <img
              className="MC_moreCON_conGold"
              alt="conGold"
              src="/images/conGold.png"
            />
            <img
              className="MC_moreCON_conGround"
              alt="conGround"
              src="/images/conGround.png"
            />
          </div>
          <button className="CMCsubmitBtn" type="submit">
            체질 선택 완료
          </button>
        </form>
      </main>
    </div>
  );
};

export default ChooseMyCON;
