import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Meal.css";

import { getuserData } from "../../api/getuserData";

const Mealmain = () => {
  const navigate = useNavigate();

  const params = useParams();
  const [userNickname, setUserNickname] = useState("");

  const getUserNickname = async () => {
    const result = await getuserData(params.username);

    if (result.status === 200) {
      setUserNickname(result.data.result.nickname);
      if (result.data.result.constitution_8 === "") {
        alert(
          "아직 체질이 설정되지 않았네요! 홈에서 나의 체질을 선택해주세요!"
        );
        navigate(-1);
      }
    } else {
    }
  };

  useEffect(() => {
    getUserNickname();
  }, [params.username, getUserNickname]);

  const today = new Date(params.date);
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  let dayOfWeek = week[today.getDay()];
  const formattedDate = `${
    today.getMonth() + 1
  }월 ${today.getDate()}일 ${dayOfWeek}요일`;

  // 페이지 로드 시 맨 위로 스크롤
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 이전 페이지로 이동 버튼
  const BackButton = () => {
    navigate(-1);
  };

  // 데이터
  const user = { name: userNickname };

  return (
    <div className="Mbackground">
      <header className="blackHeader">
        <img alt="back" onClick={BackButton} src="/images/back.png" />
        <h2 className="Mh2">{user.name} 님의 식단 분석</h2>
      </header>
      <main className="Mmain">
        <div className="Mdate">{formattedDate}</div>
        <div className="Minfo">
          <div className="Mback_purple">
            <span>오늘 식사는 어땠나요?</span>
            <h2>
              오늘의 식사를 <br />
              알려주세요
            </h2>
            <img
              className="Mback_purple_img"
              alt="생각이모지"
              src="/images/thinking.png"
            />
          </div>
          <div className="Mback_white">
            <img alt="분석하는 사람" src="/images/analysis_person.png" />
            <p>
              {" "}
              아직 오늘의 식사가 기록되지 않았어요
              <br />
              식사를 기록하면 한케어의 식단 분석을 통해 <br /> 오늘의 식사
              점수를 알려드려요
            </p>
          </div>
        </div>
        <img className="Marrow" alt="화살표" src="/images/startdirection.png" />
        <div className="Mbtns">
          <button
            className="MpurpleBtn"
            onClick={() =>
              navigate(`/meal/first/${params.username}/${params.date}`)
            }
          >
            식사 기록하기
          </button>
        </div>
      </main>
    </div>
  );
};

export default Mealmain;
