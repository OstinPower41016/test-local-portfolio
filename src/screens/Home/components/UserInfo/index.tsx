import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import Flag from "react-world-flags";

import Skills from "../Skills";
import { regexpSpecialCharacters } from "@/constants/regexp";
import Input from "@/shared/components/Input";
import UserStore from "@store/User";

const UserInfo = observer(() => {
  const [city, setCity] = useState("");

  useEffect(() => {
    if (city !== UserStore.location.city) {
      setCity(UserStore.location.city);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [UserStore.location.city.toString()]);

  return (
    <>
      <Input
        condition={regexpSpecialCharacters}
        className="text-4xl font-medium"
        value={UserStore.userName}
        onChange={(e) => UserStore.setUserName(e.target.value)}
      />

      <Input
        condition={regexpSpecialCharacters}
        className="text-xl"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onBlur={() => UserStore.setLocation(city)}
      />

      <p className="flex gap-2">
        <Flag style={{ height: "24px" }} code={UserStore.location.countryCode} />
        {UserStore.location.country}
      </p>
      <Skills />
    </>
  );
});

export default UserInfo;
