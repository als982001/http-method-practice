import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { putText } from "../functions";
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

export default function Put({ setUpdatedId }) {
  const [detail, setDetail] = useState(false);
  const [errMsg, setErrMsg] = useState(null);
  const [updated, setUpdated] = useState(null);
  const { register, handleSubmit, setValue } = useForm();

  const handlePut = async (data) => {
    const { id, text } = data;

    const response = await putText(id, text);

    if (response === 200) {
      setErrMsg((prev) => null);
      setUpdated((prev) => data);
      setUpdatedId((prev) => id);
    } else {
      setErrMsg((prev) => "에러! 해당 id가 있나요?");
      setUpdated((prev) => null);
    }

    setValue("id", "");
    setValue("text", "");
  };

  const handleDetail = () => {
    setDetail((prev) => !prev);
  };

  return (
    <>
      <Container>
        <Form onSubmit={handleSubmit(handlePut)}>
          <Input
            type="number"
            placeholder="id 입력"
            {...register("id", { required: true })}
          />
          <Input
            placeholder="text 입력"
            {...register("text", { required: true })}
          />
          <Btn>Put!</Btn>
        </Form>
        <Result>
          <Loader>
            {errMsg
              ? errMsg
              : updated
              ? `id: ${updated.id}, text: ${updated.text}`
              : "아직 PUT을 하지 않았습니다."}
          </Loader>
        </Result>
        <DetailBtn onClick={handleDetail}>Detail</DetailBtn>
      </Container>
      {detail ? (
        <>
          <Overlay onClick={handleDetail} />
          <Detail>
            <p>
              서버에게 resource의 업데이트 하거나 resource가 없다면 새로운
              resource를 생성해 달라고 요청합니다. 회원정보 수정 등에
              사용됩니다. PUT은 PATCH와 비교해서 전체 데이터를 교체하는 차이점이
              있습니다. 가령 user data의 구조가 user._id, user.firstName,
              user.lastName, user.age라고 한다면, 회원정보 수정시 PUT은 _id를
              찾아 age만 업데이트하더라도 항상 모든 필드값을 가져와서 모든
              필드를 항상 새로운 값으로 교체합니다.
            </p>
            <br />
            <p>
              PUT은 특정 id의 값을 변경시킬 수 있습니다. fetch의 경우 method를
              "PUT"으로 설정한 후, headers와 body를 적절히 설정합니다.
            </p>
          </Detail>
        </>
      ) : null}
    </>
  );
}
