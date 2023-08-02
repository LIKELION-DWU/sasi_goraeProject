// Index.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

const Container = styled.div`
  position: relative;
  max-width: 375px;
  height: 740px;
  margin: 0px auto;
  background: linear-gradient(180deg, #fff 0%, #76adff 100%);
  border: 1px solid gray;
`;
const ContentBox = styled.div`
  position: relative;
  top: 4%;
  margin: auto;
`;
const TitleBox = styled.div`
  position: relative;
  width: 70px;
  height: 17px;
  left: 7px;
  background-image: url("${process.env.PUBLIC_URL}/images/gorae_title.svg");
  background-size: cover;
  display: inline-block;
`;
const UserCircle = styled.div`
  position: relative;
  left: 260px;
  width: 24px;
  height: 24px;
  background-image: url("${process.env.PUBLIC_URL}/images/usercircle.svg");
  background-size: cover;
  display: inline-block;
`;
const UserImg = styled.div`
  position: absolute;
  width: 24px;
  height: 24px;
  background-image: url("${process.env.PUBLIC_URL}/images/userbtn.svg");
  background-size: cover;
`;
const TextBox = styled.div`
  position: relative;
  color: #3b6ae3;
  margin-top: 20px;
  font-family: Inter;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const TextBox2 = styled.div`
  position: rleative;
  color: #3b6ae3;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const DropList = styled.div`
  position: relative;
  max-width: 180px;
  height: 270px;
  margin: auto;
  top: 35px;
  overflow-y: scroll;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    /* WebKit 브라우저의 스크롤바를 숨김 */
    width: 0;
    background: transparent;
  }
`;
const Whale = styled.div`
  position: rleative;
  margin: auto;
  margin-top: -40px;
  width: 310px;
  height: 310px;
  background: url("${process.env.PUBLIC_URL}/images/gorae.svg");
  background-size: cover;
`;
const GoButton = styled.button`
  position: rleative;
  margin: auto;
  margin-top: -20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 345px;
  height: 51px;
  flex-shrink: 0;
  border-radius: 10px;
  background: #1647c3;
  color: #fff;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  border: none;
`;
const MakeButton = styled.button`
  position: rleative;
  margin: auto;
  width: 345px;
  height: 51px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #0c41ca;
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  border: none;
  background: none;
`;
// 물방울 이미지 수정 필요 (누끼)
const Drop = styled.div`
  position: rleative;
  display: inline-block;
`;

const Main = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { nickname } = location.state || { nickname: "" };

  const gotoMypage = () => {
    navigate("/Mypage");
  };

  const gotoSplash = () => {
    navigate("/");
  };

  const [compls, setCompls] = useState([]);
  const [point, setPoint] = useState([0]);

  useEffect(() => {
    const savedcompls = localStorage.getItem("compls");
    if (savedcompls) {
      setCompls(JSON.parse(savedcompls));
    }
  }, []);

  // 포인트 콘솔에 출력 (배열 크기)
  useEffect(() => {
    const arrayLength = compls.length;
    //console.log(arrayLength);
    setPoint(arrayLength * 20); // 일단 글 개수당 20점씩 곱함
  }, [compls]);

  const handleAddButton = () => {
    navigate("/Write"); // 쓰기 페이지로 이동
  };

  const handlecomplClick = (id) => {
    navigate("/Read", { state: { keyId: `${id}` } });
  };

  // 난수 설정
  const [num, setNum] = useState();
  useEffect(() => {
    setNum(Math.floor(Math.random() * (3 - 1 + 1)) + 1);
  }, []);

  return (
    <Container>
      <ContentBox>
        <TitleBox></TitleBox>
        <UserCircle onClick={gotoMypage}>
          <UserImg></UserImg>
        </UserCircle>
        {/* 이름 받아오기 */}
        <TextBox>
          {nickname ? `${nickname}님의 고래예요.` : "고래예요."}
        </TextBox>
        <TextBox2>칭찬으로 고래를 춤추게 만들어보세요!</TextBox2>
        <DropList>
          {compls.map((compl) => (
            <Drop key={compl.id} onClick={() => handlecomplClick(compl.id)}>
              {" "}
              <img
                src={`${process.env.PUBLIC_URL}/images/drop${
                  Math.floor(Math.random() * (3 - 1 + 1)) + 1
                }.svg`}
                alt="Back"
                width="70px"
              />
            </Drop>
          ))}
        </DropList>
        <Whale></Whale>
        {/* <div>{point}</div> */}
        <GoButton onClick={handleAddButton}>칭찬하기</GoButton>
        <MakeButton onClick={gotoSplash}>나도 만들기</MakeButton>
      </ContentBox>
    </Container>
  );
};

export default Main;
