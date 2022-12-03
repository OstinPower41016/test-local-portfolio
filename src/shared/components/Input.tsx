import { ChangeEvent, FocusEvent, FC, useState, useEffect } from "react";
import styled from "styled-components";

import { FailureIcon, SuccessIcon } from "@/assets/icons";
import { Colors } from "@constants/colors";

interface IInput extends React.HTMLProps<HTMLInputElement> {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setErrorMsg?: (errorMsg: string) => void;
  condition?: RegExp;
  type?: "number";
}

const Input: FC<IInput> = (props) => {
  const { value, onChange, type, condition, ...inputProps } = props;

  const [errorMsg, setErrorMsg] = useState("");
  const [isFocused, setFocused] = useState(false);
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (condition instanceof RegExp) {
      if (condition.test(e.target.value)) {
        setErrorMsg("Error Description");
      } else {
        setErrorMsg("");
        onChange(e);
      }
      setLocalValue(e.target.value);
    } else {
      onChange(e);
    }
  };

  const onFocus = (e: FocusEvent<HTMLInputElement>) => {
    inputProps.onFocus?.(e);
    setFocused(true);
  };

  const onBlur = (e: FocusEvent<HTMLInputElement>) => {
    inputProps.onBlur?.(e);
    setFocused(false);
  };

  return (
    <div className="relative flex items-center">
      <InputCmp
        withoutPadding={type === "number"}
        {...(inputProps as any)}
        onFocus={onFocus}
        onBlur={onBlur}
        value={localValue}
        onChange={onChangeInput}
      />
      {type !== "number" && getInputStatusValidation(isFocused, errorMsg)}
      {type !== "number" && errorMsg && <TextDanger>{errorMsg}</TextDanger>}
    </div>
  );
};

const InputCmp = styled.input<{ withoutPadding: boolean }>`
  outline: none;
  background-color: transparent;
  &:focus {
    background-color: ${Colors.gray};
    border-bottom: 1px solid ${Colors.black};
  }
  &:hover {
    background-color: ${Colors.gray};
  }
  padding-right: ${(props) => (props.withoutPadding ? "0px" : "28px")};
`;

const InputStatusIcon = styled.div`
  transform: translateX(-150%);
`;

const TextDanger = styled.p`
  color: ${Colors.danger};
  font-size: 14px;
`;

const getInputStatusValidation = (isFocused: boolean, errorMsg: string) => {
  if (isFocused) {
    if (errorMsg) {
      return (
        <InputStatusIcon>
          <FailureIcon />
        </InputStatusIcon>
      );
    }
    return (
      <InputStatusIcon>
        <SuccessIcon />
      </InputStatusIcon>
    );
  }
  return null;
};

export default Input;
