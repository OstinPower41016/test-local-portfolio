import { observer } from "mobx-react-lite";
import { ChangeEvent, FC, useState, FocusEvent } from "react";
import styled from "styled-components";

import { CloseIcon } from "@assets/icons";
import { Colors } from "@constants/colors";
import Input from "@shared/components/Input";
import UserStore from "../../../store/User";

interface ISkill extends React.HTMLProps<HTMLButtonElement> {
  className?: string;
  skill?: { id: string; title: string };
  Icon?: () => JSX.Element;
}

const Skill: FC<ISkill> = observer((props) => {
  const { Icon, skill, className, ...buttonsProps } = props;

  const onRemoveSkill = () => {
    if (skill) {
      UserStore.removeSkill(skill?.id);
    }
  };

  const onBlur = (e: FocusEvent<HTMLInputElement, Element>) => {
    if (skill?.title.trim().length === 0) {
      onRemoveSkill();
    }
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (skill) {
      UserStore.updateSkill({ value: e.target.value, id: skill.id });
    }
  };

  return (
    <SkillCmp {...(buttonsProps as any)} className="rounded py-1 px-2">
      {Icon && (
        <div className={className}>
          <Icon />
        </div>
      )}
      {skill && (
        <div className="relative">
          <Input
            onBlur={onBlur}
            autoFocus={skill.title === ""}
            size={20}
            style={{ width: skill.title.length === 0 ? "20px" : skill.title.length + 1 + "ch" }}
            className="bg-transparent text-center"
            value={skill?.title ?? ""}
            onChange={onChange}
          />
          <CloseButton className="absolute" onClick={onRemoveSkill}>
            <CloseIcon />
          </CloseButton>
        </div>
      )}
    </SkillCmp>
  );
});

const CloseButton = styled.button`
  top: 0;
  right: 0;
  transform: translate(85%, -50%);
  display: none;
`;

const SkillCmp = styled.button`
  background-color: ${Colors.black};
  color: ${Colors.white};
  &:hover ${CloseButton} {
    display: block;
  }
  cursor: pointer;
`;

export default Skill;
