import { FC } from "react";
import styled from "styled-components";

interface IBlockContent extends React.HTMLProps<HTMLDivElement> {
  children: React.ReactNode;
}

const BlockContent: FC<IBlockContent> = (props) => {
  const { children, ...divProps } = props;
  return <BlockContentCmp {...(divProps as any)}>{props.children}</BlockContentCmp>;
};

export default BlockContent;

const BlockContentCmp = styled.div`
  width: 320px;
  @media (max-width: 1280px) {
    width: 256px;
  }
`;
