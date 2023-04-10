import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import {
  getResultById,
  getResultByQueryId,
  getResultByQueryText,
} from "../functions";
import Text from "./Text";

const Overlay = styled.section`
  width: 100vw;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  width: 100%;
  padding-left: 30px;
  display: flex;
  justify-content: left;
  align-items: center;
  margin-bottom: 10px;
`;

const Input = styled.input`
  width: 300px;
  height: 35px;
  padding-left: 10px;
  margin-right: 30px;

  &::-webkit-inner-spin-button {
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
  }
`;

const Btn = styled.button`
  width: 80px;
  height: 40px;
  background-color: #ffe5ca;
  margin-right: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  border: none;
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

  &:active {
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset,
      rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
  }
`;

const Loader = styled.h1`
  font-size: 30px;
  font-weight: bold;
  margin: 10px 0;
`;

const Result = styled.section`
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #e4d0d0;
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`;

const Detail = styled.section`
  width: 600px;
  height: 300px;
  padding: 10px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #fef2f4;
  position: fixed;
  margin: 0 auto;
  left: 0;
  right: 0;
  top: 200px;
  z-index: 2;
`;

const DetailBtn = styled.div`
  width: 200px;
  height: 80px;
  border-radius: 20px;
  background-color: #d14d72;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  font-weight: bold;

  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

  &:active {
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset,
      rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
  }
`;

export default function Get() {
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [texts, setTexts] = useState([]);
  const [btnType, setBtnType] = useState("");
  const [detail, setDetail] = useState(false);
  const { register, handleSubmit, watch, setValue, formState } = useForm();

  // console.log(watch());
  // console.log(formState.errors);

  const getTitle = () => {
    if (btnType === "") return "Get 하기 전";
    else if (btnType === "id") {
      return `http://localhost:3001/test/${watch().value}`;
    } else if (btnType === "queryId") {
      return `http://localhost:3001/test?id=${watch().value}`;
    }
    /*
    else if (btnType === "queryText") {
      return `http://localhost:3001/test?text=${watch().value}`;
    }
    */
  };

  const getResults = async (data) => {
    const { value } = data;

    setIsLoading((prev) => true);

    if (btnType === "id") {
      const result = await getResultById(value);

      if (result.status) {
        setErrorMsg(result.statusText);
      } else {
        setTexts((prev) => result);
      }
    } else if (btnType === "queryId") {
      const result = await getResultByQueryId(value);

      if (result.status) {
        setErrorMsg(result.statusText);
        console.log(result.statusText);
      } else {
        setTexts((prev) => result);
      }
    } else if (btnType === "queryText") {
      const result = await getResultByQueryText(value);
      if (result.status) {
        setErrorMsg(result.statusText);
      } else {
        setTexts((prev) => result);
      }
    }

    setIsLoading((prev) => false);
    setValue("value", "");
  };

  const handleDetail = () => {
    setDetail((prev) => !prev);
  };

  return (
    <>
      <Container>
        <Form onSubmit={handleSubmit(getResults)}>
          <Input
            type="number"
            placeholder="값 입력"
            {...register("value", { required: true })}
          />
          <Btn onClick={() => setBtnType((prev) => "id")}>Get!</Btn>
          <Btn onClick={() => setBtnType((prev) => "queryId")}>Id Query</Btn>
          {/* <Btn onClick={() => setBtnType((prev) => "queryText")}>Text Query</Btn> */}
        </Form>
        <Result>
          <Loader>{`${getTitle()}`}</Loader>
          {isLoading ? (
            <Loader>Loading...</Loader>
          ) : errorMsg ? (
            <Loader>{`${errorMsg} 새로고침을 해주세요...`}</Loader>
          ) : Array.isArray(texts) ? (
            <>
              {texts.map((text) => (
                <Text key={text.id + ""} text={text} />
              ))}
            </>
          ) : (
            <Text text={texts} />
          )}
        </Result>
        <DetailBtn onClick={handleDetail}>Detail</DetailBtn>
      </Container>
      {detail ? (
        <>
          <Overlay onClick={handleDetail} />
          <Detail>
            <p>
              서버에게 resource를 보내달라고 요청합니다. 서버(혹은 DB)의
              resource는 클라이언트로 전달만 될 뿐 변경되지 않습니다. 예를 들어
              웹브라우저에http://example.com/exmaple.png를 입력하면 해당 그림
              파일이 표시되고, http://example.com/something을 입력하면 서버가
              해당 route에 표시되어야 하는 페이지를 찾아 보여줍니다. 참고로
              웹브라우저 주소창에 주소를 입력하면 이 신호는 항상 get으로
              요청됩니다.
            </p>
            <br />
            <p>
              http://localhost:3001/test/id번호 혹은
              http://localhost:3001/test?찾고싶은id=찾고싶은값 등의 방식으로
              가능합니다.
            </p>
            <br />
            <p>
              fetch의 경우 method를 특별히 적어주지 않는다면 GET이 실행됩니다.
            </p>
          </Detail>
        </>
      ) : null}
    </>
  );
}
