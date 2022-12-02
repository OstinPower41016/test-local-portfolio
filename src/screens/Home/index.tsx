import styled from "styled-components";

import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";

const Home = () => {
  return (
    <Container>
      <Header />
      <Body />
      <Footer />
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  width: 100vw;
`;

export default Home;
