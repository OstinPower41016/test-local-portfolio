import { makeAutoObservable, reaction, toJS } from "mobx";
import { v4 as uuidv4 } from "uuid";

import { getCoordinates } from "@api/index";

export type TLocation = { city: string; coords: number[]; countryCode: string; country: string };

class User {
  userName: string;
  location: TLocation;
  skills: { title: string; exp: string; id: string }[];

  constructor() {
    makeAutoObservable(this);
    const [userName, location, skills] = [
      localStorage.getItem("userName"),
      localStorage.getItem("location"),
      localStorage.getItem("skills"),
    ];

    this.userName = userName ?? "Daggett";
    this.location = location
      ? JSON.parse(location)
      : {
          city: "New York  ",
          coords: [40.714606, -74.0028],
          countryCode: "US",
          country: "United States of America",
        };
    this.skills = skills ? JSON.parse(skills) : [];
  }

  setUserName = (value: string) => {
    this.userName = value;
  };

  setLocation = async (cityName: string) => {
    const res = await getCoordinates(cityName);

    if (res) {
      this.location = {
        city: res.city,
        coords: res.coords,
        country: res.country,
        countryCode: res.countryCode,
      };
    }
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
    ];
  };

  removeSkill = (id: string) => {
    const removedSkillIdx = this.skills.findIndex((skill) => skill.id === id);
    this.skills = [...this.skills.slice(0, removedSkillIdx), ...this.skills.slice(removedSkillIdx + 1)];
  };
}

const user = new User();

export default user;

reaction(
  () => user.skills,
  (skills) => localStorage.setItem("skills", JSON.stringify(toJS(skills)))
);
reaction(
  () => user.location,
  (location) => localStorage.setItem("location", JSON.stringify(toJS(location)))
);
reaction(
  () => user.userName,
  (username) => localStorage.setItem("userName", username)
);
