import React from "react";
import { FC } from "react";
import styled from "styled-components";

import { ExperienceTextContainer, ListItem } from "./index";
import Input from "@shared/components/Input";
import Link from "@shared/components/Link";
import ListWrapper from "../components/ListWrapper";
import UserStore from "../../../store/User";

interface IExperienceBlock {
  defaultValue: string;
  skillName: string;
  id: string;
}

const ExperienceBlock: FC<IExperienceBlock> = (props) => {
  const [value, setValue] = React.useState(props.defaultValue);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currValue = e.target.value;
    const time = currValue.split(",").map((num) => Number(num));
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
      } else if (months > 11) {
        return;
      }
    }

    if (!currValue) {
      setValue("0");
    } else {
      if (currValue.startsWith("0") && years) {
        setValue(currValue.slice(1));
      } else {
        setValue(currValue);
      }
    }
  };

  const onBlur = () => {
    UserStore.updateSkill({ id: props.id, value: props.skillName, exp: value });
  };

  return (
    <ListItem className="flex">
      <div className="flex gap-2">
        <ExperienceTextContainer className="flex gap-1">
          <p className="font-medium truncate">{props.skillName}</p>
          <Link>
            <div className="flex">
              <Input
                style={{ width: value.length === 1 ? "12px" : value.length + "ch" }}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
              />
              <p>{Number(value) <= 1 ? "year" : "years"}</p>
            </div>
          </Link>
        </ExperienceTextContainer>
      </div>
    </ListItem>
  );
};

export default ExperienceBlock;

const ExperienceBlockCmp = styled(ListWrapper)`
  max-width: 190px;
  overflow-wrap: anywhere;
`;
