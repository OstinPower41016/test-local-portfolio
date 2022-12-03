import { FC, useState } from "react";

import Link from "@shared/components/Link";
import { ExperienceTextContainer, ListItem } from "./index";
import Input from "@/shared/components/Input";
import SkillsStore from "@/store/Skills";

interface IExperienceBlock {
  defaultValue: string;
  skillName: string;
  id: string;
}

const ExperienceBlock: FC<IExperienceBlock> = (props) => {
  const [value, setValue] = useState(props.defaultValue);
  const [isChangeMode, setIsChangeMode] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let currValue = e.target.value;
    const separator = currValue.indexOf(".") === -1 ? "," : ".";
    const time = currValue.split(separator).map((num) => Number(num));
    const [years, months] = time;

    if (time.length > 2) {
      return;
    }

    if (years) {
      if (isNaN(years)) {
        return;
      } else if (years > 99) {
        return;
      }
    }

    if (months) {
      if (isNaN(months)) {
        return;
      } else if (months > 9) {
        return;
      }
    }

    if (!currValue) {
      setValue("0");
    } else {
      if (separator === ",") {
        if (months) {
          currValue = `${years}.${months}`;
        }
      }

      if (currValue.startsWith("0") && years) {
        setValue(currValue.slice(1));
      } else {
        setValue(currValue);
      }
    }
  };

  const onBlur = () => {
    setIsChangeMode(false);
    SkillsStore.updateSkill({ id: props.id, value: props.skillName, exp: value });
  };

  return (
    <ListItem className="flex">
      <div className="flex gap-2">
        <ExperienceTextContainer className="flex gap-1">
          <p className="font-medium truncate">{props.skillName}</p>
          <Link>
            <div className="flex">
              {isChangeMode && <Input autoFocus style={{ width: "4ch" }} value={value} onChange={onChange} onBlur={onBlur} type="number" />}
              {!isChangeMode && (
                <div className="flex gap-1" onClick={() => setIsChangeMode(true)}>
                  <p>{value}</p>
                  <p>{Number(value) <= 1 ? "year" : "years"}</p>
                </div>
              )}
            </div>
          </Link>
        </ExperienceTextContainer>
      </div>
    </ListItem>
  );
};

export default ExperienceBlock;
