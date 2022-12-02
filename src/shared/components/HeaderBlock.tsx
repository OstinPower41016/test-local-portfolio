import { FC } from "react";
import styled from "styled-components";

interface IHeaderBlock {
  children: string;
}

const HeaderBlock: FC<IHeaderBlock> = (props) => {
  return <Text className={`font-medium text-2xl whitespace-nowrap overflow-text truncate`}>{props.children}</Text>;
};

const Text = styled.p`
  max-width: 270px;
`;

export default HeaderBlock;
