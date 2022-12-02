import { FC } from "react";
import styled from "styled-components";

import { Colors } from "@constants/colors";

interface IInput extends React.HTMLProps<HTMLInputElement> {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: FC<IInput> = (props) => {
  const { value, onChange, ...inputProps } = props;
  return <InputCmp {...(inputProps as any)} value={props.value} onChange={props.onChange} />;
};

const InputCmp = styled.input`
  outline: none;
  background-color: transparent;
  &:hover {
    background-color: ${Colors.gray};
  }
`;

export default Input;
