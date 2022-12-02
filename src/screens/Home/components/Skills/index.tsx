import { observer } from "mobx-react-lite";

import { PlusIcon } from "@assets/icons";
import UserStore from "../../../../store/User";
import Skill from "./Skill";

const Skills = observer(() => {
  return (
    <div className="flex gap-2">
      {UserStore.skills.map((skill) => {
        return <Skill skill={skill} />;
      })}
      <Skill onClick={UserStore.addSkill} className="px-0.5 py-1.5" Icon={() => <PlusIcon />} />
    </div>
  );
});

export default Skills;
