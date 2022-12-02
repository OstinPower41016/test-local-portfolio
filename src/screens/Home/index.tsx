import styled from "styled-components";

import Body from "./Body";
import Footer from "./Footer";
import Header from "./Header";

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
