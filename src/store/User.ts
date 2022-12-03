import { makeAutoObservable, reaction, toJS } from "mobx";

import { getCoordinates } from "@api/index";

export type TLocation = { city: string; coords: number[]; countryCode: string; country: string };

class User {
  userName: string;
  location: TLocation;

  constructor() {
    makeAutoObservable(this);
    const [userName, location] = [localStorage.getItem("userName"), localStorage.getItem("location")];

    this.userName = userName ?? "Daggett";
    this.location = location
      ? JSON.parse(location)
      : {
          city: "New York  ",
          coords: [40.714606, -74.0028],
          countryCode: "US",
          country: "United States of America",
        };
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
}

const userInstance = new User();

export default userInstance;

reaction(
  () => userInstance.location,
  (location) => localStorage.setItem("location", JSON.stringify(toJS(location)))
);
reaction(
  () => userInstance.userName,
  (username) => localStorage.setItem("userName", username)
);
