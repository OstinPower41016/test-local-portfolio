import { makeAutoObservable, reaction, toJS } from "mobx";
import { v4 as uuidv4 } from "uuid";

class Skills {
  skills: { title: string; exp: string; id: string }[];
  isChangeModeSkill = false;

  constructor() {
    makeAutoObservable(this);
    const skills = localStorage.getItem("skills");
    this.skills = skills ? JSON.parse(skills) : [];
  }

  setIsChangeModeSkill = (mode: boolean) => {
    this.isChangeModeSkill = mode;
  };

  addSkill = () => {
    this.skills = [...this.skills, { title: "", exp: "0", id: uuidv4() }];
  };

  updateSkill = (values: { value: string; exp?: string; id: string }) => {
    const selectedSkillIdx = this.skills.findIndex((skill) => skill.id === values.id);

    this.skills = [
      ...this.skills.slice(0, selectedSkillIdx),
      {
        title: values.value,
        exp: values.exp ?? "0",
        id: this.skills[selectedSkillIdx].id,
      },
      ...this.skills.slice(selectedSkillIdx + 1),
    ].sort((a, b) => {
      if (a.exp === b.exp) {
        return 0;
      }
      return Number(b.exp) > Number(a.exp) ? 1 : -1;
    });
  };

  removeSkill = (id: string) => {
    const removedSkillIdx = this.skills.findIndex((skill) => skill.id === id);
    this.skills = [...this.skills.slice(0, removedSkillIdx), ...this.skills.slice(removedSkillIdx + 1)];
  };
}

const skillsInstance = new Skills();

export default skillsInstance;

reaction(
  () => skillsInstance.skills,
  (skills) => localStorage.setItem("skills", JSON.stringify(toJS(skills)))
);
