import styled from "styled-components";
import { PrintIcon } from "../../../assets/icons";
import { Colors } from "../../../constants/colors";
import Link from "../../../shared/components/Link";
import Avatar from "../components/Avatar";
import UserInfo from "../components/UserInfo";

const Home = () => {
  return (
    <Background>
      <div className="container mx-auto">
        <Header className="flex flex-col justify-center">
          <div className="flex justify-between">
            <div className="flex items-center">
              <Avatar />
              <div className="flex flex-col h-full justify-between pl-8">
                <UserInfo />
              </div>
            </div>
            <PrintContainer className="flex gap-2">
              <PrintIcon />
              <Link>Print this page</Link>
            </PrintContainer>
          </div>
        </Header>
      </div>
    </Background>
  );
};

const Background = styled.div`
  background-color: ${Colors.paleGray};
`;

const Header = styled.div`
  height: 25vh;
  min-height: 160px;
`;

const PrintContainer = styled.div`
  &:hover {
    > svg > path {
      fill: ${Colors.highlightText};
    }
    > p {
      color: ${Colors.highlightText};
    }
  }
`;

export default Home;
