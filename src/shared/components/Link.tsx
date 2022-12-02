import { FC } from "react";
import styled from "styled-components";

import { Colors } from "@constants/colors";

interface Text extends React.HTMLProps<HTMLParagraphElement> {
  children: string | JSX.Element;
}

const Link: FC<Text> = (props) => {
  const { children, ...paragraphProps } = props;
  return <LinkCmp {...(paragraphProps as any)}>{children}</LinkCmp>;
};

const LinkCmp = styled.p`
  color: ${Colors.link};
  cursor: pointer;
  &:hover {
    color: ${Colors.highlightText};
  }
`;

export default Link;
