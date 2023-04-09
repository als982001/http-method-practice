import { useEffect, useState } from "react";
import styled from "styled-components";
import { Routes, Route, Link } from "react-router-dom";
import { getAllTexts } from "./functions";
import Text from "./components/Text";
import Get from "./components/Get";
import Post from "./components/Post";
import Patch from "./components/Patch";
import Delete from "./components/Delete";
import Put from "./components/Put";
import Init from "./components/Init";

const Wrapper = styled.section`
  width: 100vw;
  height: 100vh;
  background-color: #fef2f4;
  padding-top: 100px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Header = styled.header`
  position: fixed;
  width: 100%;
  height: 100px;
  background-color: #f3e8ff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  font-weight: bold;
  position: fixed;
  top: 0;
`;

const Container = styled.section`
  width: 700px;
  height: 600px;
  background-color: #fff3e2;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Texts = styled.main`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 20px;
`;

const Loader = styled.h1`
  font-size: 50px;
  font-weight: bold;
`;

const Buttons = styled.nav`
  width: 720px;
  border-radius: 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Button = styled.div`
  width: 100px;
  height: 70px;
  background-color: #ffabab;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  &:active {
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset,
      rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
  }
`;

const Infos = styled.section`
  margin-top: 20px;
  width: 95%;
  height: 430px;
  background-color: #fef2f4;
  border-radius: 20px;
`;

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [texts, setTexts] = useState([]);
  const [updatedId, setUpdatedId] = useState(-1);
  const [textNum, setTextNum] = useState(-1);

  useEffect(() => {
    (async () => {
      setIsLoading((prev) => true);
      console.log("Loading...");

      try {
        const allTexts = await getAllTexts();
        setTexts((prev) => allTexts);

        setTextNum((prev) => allTexts.length);
      } catch (error) {
        console.log(error);
      }

      setIsLoading((prev) => false);
      setUpdatedId((prev) => -1);

      console.log("Finished Loading!!!");
    })();
  }, [textNum, updatedId]);

  return (
    <Wrapper>
      <Header>Fetch 연습</Header>
      <Container>
        {isLoading ? (
          <Loader>Loading...</Loader>
        ) : (
          <Texts>
            <Loader>All Texts</Loader>
            {texts.map((text) => (
              <Text key={text.id + ""} text={text} />
            ))}
          </Texts>
        )}
      </Container>
      <Container>
        <Buttons>
          <Link to="/get">
            <Button>GET</Button>
          </Link>
          <Link to="/post">
            <Button>POST</Button>
          </Link>
          <Link to="/put">
            <Button>PUT</Button>
          </Link>
          <Link to="/patch">
            <Button>PATCH</Button>
          </Link>
          <Link to="/delete">
            <Button>DELETE</Button>
          </Link>
        </Buttons>
        <Infos>
          <Routes>
            <Route path="/get" element={<Get />} />
            <Route path="/post" element={<Post setTextNum={setTextNum} />} />
            <Route path="/put" element={<Put setUpdatedId={setUpdatedId} />} />
            <Route
              path="/patch"
              element={<Patch setUpdatedId={setUpdatedId} />}
            />
            <Route
              path="/delete"
              element={<Delete setTextNum={setTextNum} />}
            />
            <Route path="/" element={<Init />} />
          </Routes>
        </Infos>
      </Container>
    </Wrapper>
  );
}

export default App;
