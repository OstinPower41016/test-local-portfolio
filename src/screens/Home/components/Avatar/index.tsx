import styled from "styled-components";

import AvatarUploadIcon from "./assets/AvatarUpload";
import useAvatar from "./hooks/useAvatar";
import { Colors } from "@constants/colors";

const Avatar = () => {
  const { state, handlers } = useAvatar();

  return (
    <Container className="relative">
      <Wrapper className="relative">
        <Input type="file" onChange={handlers.onChange} />
        <Image src={state.image} />
      </Wrapper>

      <AvatarUploadIconContainer className="absolute">
        <AvatarUploadIcon />
      </AvatarUploadIconContainer>
    </Container>
  );
};

const IMAGE_SIZE = 150;

const Wrapper = styled.div`
  height: ${IMAGE_SIZE}px;
  width: ${IMAGE_SIZE}px;
  border-radius: 50%;
  overflow: hidden;
`;

const AvatarUploadIconContainer = styled.div`
  top: 5px;
  right: 5px;
  opacity: 0;
`;

const Container = styled(Wrapper)`
  overflow: visible;
  &:hover ${AvatarUploadIconContainer} {
    opacity: 1;
  }
  border: 4px solid ${Colors.white};
  box-sizing: content-box;
`;

const Image = styled.img`
  height: ${IMAGE_SIZE}px;
  width: ${IMAGE_SIZE}px;
`;

const Input = styled.input`
  width: 100%;
  height: 100%;
  position: absolute;
  opacity: 0;
`;

export default Avatar;
