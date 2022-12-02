import { useState } from "react";
import styled from "styled-components";

import Home from "./screens/Home";

function App() {
  const [count, setCount] = useState(0);

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
