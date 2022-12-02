import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import Input from "@shared/components/Input";
import Flag from "react-world-flags";

import UserStore from "../../../../store/User";
import Skills from "../Skills";

const UserInfo = observer(() => {
  const [city, setCity] = useState("");

  useEffect(() => {
    if (city !== UserStore.location.city) {
      setCity(UserStore.location.city);
    }
  }, [UserStore.location.city.toString()]);

  return (
    <>
      <Input className="text-4xl font-medium" value={UserStore.userName} onChange={(e) => UserStore.setUserName(e.target.value)} />
      <Input className="text-xl" value={city} onChange={(e) => setCity(e.target.value)} onBlur={() => UserStore.setLocation(city)} />

      <p className="flex gap-2">
        <Flag style={{ height: "24px" }} code={UserStore.location.countryCode} />
        {UserStore.location.country}
      </p>
      <Skills />
    </>
  );
});

export default UserInfo;
