import { observer } from "mobx-react-lite";
import { ChangeEvent, Dispatch, FC, SetStateAction, useState } from "react";
import styled from "styled-components";

import { regexpSpecialCharacters } from "@/constants/regexp";
import Input from "@/shared/components/Input";
import SkillsStore from "@/store/Skills";
import { CloseIcon } from "@assets/icons";
import { Colors } from "@constants/colors";

interface ISkill extends React.HTMLProps<HTMLButtonElement> {
  className?: string;
  skill?: { id: string; title: string };
  Icon?: () => JSX.Element;
  setIsVisibleAddSkillButton?: Dispatch<SetStateAction<boolean>>;
}

const Skill: FC<ISkill> = observer((props) => {
  const { Icon, skill, className, setIsVisibleAddSkillButton, ...buttonsProps } = props;
  const [isChangeMode, setIsChangeMode] = useState(Icon ? false : !skill?.title);

  const onRemoveSkill = () => {
    if (skill) {
      SkillsStore.removeSkill(skill?.id);
    }
  };

  const onBlur = () => {
    if (skill?.title.trim().length === 0) {
      onRemoveSkill();
    }
    setIsChangeMode(false);
    SkillsStore.setIsChangeModeSkill(false);
  };

  const onFocus = () => {
    setIsChangeMode(true);
    SkillsStore.setIsChangeModeSkill(true);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (skill) {
      SkillsStore.updateSkill({ value: e.target.value, id: skill.id });
    }
  };

  return (
    <>
      {isChangeMode && (
        <Input
          condition={regexpSpecialCharacters}
          onBlur={onBlur}
          onFocus={onFocus}
          autoFocus
          size={20}
          className="bg-transparent"
          value={skill?.title ?? ""}
          onChange={onChange}
        />
      )}
      {!isChangeMode && (
        <SkillCmp onClick={() => setIsChangeMode(true)} {...(buttonsProps as any)} className="rounded py-1 px-2">
          {Icon && (
            <div className={className}>
              <Icon />
            </div>
          )}
          {skill && (
            <div className="relative">
              <p>{skill.title}</p>
              <CloseButton className="absolute" onClick={onRemoveSkill}>
                <CloseIcon />
              </CloseButton>
            </div>
          )}
        </SkillCmp>
      )}
    </>
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
