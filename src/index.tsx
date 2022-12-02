import styled from "styled-components";

import Home from "./screens/Home";

function App() {
  return (
    <HomeContainer>
      <Home />
    </HomeContainer>
  );
}

const HomeContainer = styled.div`
  height: 100vh;
  width: 100wh;
`;

export default App;
