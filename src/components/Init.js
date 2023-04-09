import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  font-weight: bold;
`;

export default function Init() {
  return <Container>Fetch 복습하기 위해 만든 거</Container>;
}
