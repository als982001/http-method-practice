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

export default function Patch({ setUpdatedId }) {
  const [detail, setDetail] = useState(false);
  const [errMsg, setErrMsg] = useState(null);
  const [updated, setUpdated] = useState(null);
  const { register, handleSubmit, setValue } = useForm();

  const handlePatch = async (data) => {
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
        <Form onSubmit={handleSubmit(handlePatch)}>
          <Input
            type="number"
            placeholder="id 입력"
            {...register("id", { required: true })}
          />
          <Input
            placeholder="text 입력"
            {...register("text", { required: true })}
          />
          <Btn>Patch!</Btn>
        </Form>
        <Result>
          <Loader>
            {errMsg
              ? errMsg
              : updated
              ? `id: ${updated.id}, text: ${updated.text}`
              : "아직 PATCH를 하지 않았습니다."}
          </Loader>
        </Result>
        <DetailBtn onClick={handleDetail}>Detail</DetailBtn>
      </Container>
      {detail ? (
        <>
          <Overlay onClick={handleDetail} />
          <Detail>
            <p>
              서버에게resource의 업데이트를 요청합니다. 회원정보 수정 등에
              사용됩니다. PATCH는 PUT과 비교해서 부분 데이터를 업데이트하는
              차이점이 있습니다. 가령 user data의 구조가 user._id,
              user.firstName, user.lastName, user.age라고 한다면, 회원정보
              수정시 PATCH는 _id를 찾아 age만 업데이트할때 _id와 age만
              받아와서해당 부분을 업데이트 합니다.
            </p>
            <br />
            <p>
              PUT은 특정 id의 값을 변경시킬 수 있습니다. fetch의 경우 method를
              "PATCH"로 설정한 후, headers와 body를 적절히 설정합니다.
            </p>
          </Detail>
        </>
      ) : null}
    </>
  );
}
