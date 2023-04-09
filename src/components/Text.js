import styled from "styled-components";

const Container = styled.section`
  background-color: #e4d0d0;

  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25px;
  font-weight: bold;
`;

export default function Text({ text }) {
  return <Container>{`id: ${text.id}, text: ${text.text}`}</Container>;
}
