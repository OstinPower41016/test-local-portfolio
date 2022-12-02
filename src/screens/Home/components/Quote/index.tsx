import { FC } from "react";
import styled from "styled-components";

import { Colors } from "@constants/colors";

interface IQuote {
  children: string;
}

const Quote: FC<IQuote> = (props) => {
  return (
    <p className="flex mt-6 relative">
      <QuoteCmp position="opening" className="text-4xl absolute">
        &#10077;
      </QuoteCmp>
      <Text className="text-center">{props.children}</Text>
      <QuoteCmp position="closing" className="text-4xl absolute">
        &#10078;
      </QuoteCmp>
    </p>
  );
};

export default Quote;

const QuoteCmp = styled.span<{ position: "opening" | "closing" }>`
  color: ${Colors.paleGray};
  font-size: 75px;

  ${(props) => (props.position === "opening" ? "top: -4px;" : "bottom: -29px;")}
  ${(props) => (props.position === "opening" ? "left: -5px;" : "right: 45px;")}
`;

const Text = styled.p`
  max-width: 220px;
  margin-left: 27px;
`;
