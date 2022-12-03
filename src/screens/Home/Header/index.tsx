import styled from "styled-components";

import Link from "@shared/components/Link";
import Avatar from "../components/Avatar";
import UserInfo from "../components/UserInfo";
import { PrintIcon } from "@assets/icons";
import { Colors } from "@constants/colors";

const Home = () => {
  return (
    <Background>
      <div className="container mx-auto pt-10 pb-4">
        <Header className="flex flex-col justify-center">
          <div className="flex justify-between">
            <div className="flex items-center">
              <Avatar />
              <UserInfoContainer className="flex flex-col h-full justify-between pl-8">
                <UserInfo />
              </UserInfoContainer>
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
  min-height: 160px;
`;

const PrintContainer = styled.div`
  height: 20px;
  &:hover {
    > svg > path {
      fill: ${Colors.hover};
    }
    > p {
      color: ${Colors.hover};
    }
  }
`;

const UserInfoContainer = styled.div`
  max-width: 50%;
`;

export default Home;
