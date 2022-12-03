import { observer } from "mobx-react-lite";

import Skill from "./Skill";
import SkillsStore from "@/store/Skills";
import { PlusIcon } from "@assets/icons";

const Skills = observer(() => {
  return (
    <div className="flex gap-2">
      {SkillsStore.skills.map((skill) => {
        return <Skill key={skill.id} skill={skill} />;
      })}
      {!SkillsStore.isChangeModeSkill && <Skill onClick={SkillsStore.addSkill} className="px-0.5 py-1.5" Icon={() => <PlusIcon />} />}
    </div>
  );
});

export default Skills;
