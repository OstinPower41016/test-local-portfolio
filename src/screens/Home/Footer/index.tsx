import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";

import HeaderBlock from "@shared/components/HeaderBlock";
import BlockContent from "../components/BlockContent";
import Quote from "../components/Quote";
import UserStore from "@store/User";

const Footer = observer(() => {
  const [coords, setCoords] = useState({
    center: [40.714606, -74.0028],
    zoom: 8,
  });

  useEffect(() => {
    setCoords({
      zoom: 9,
      center: toJS(UserStore.location.coords),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [UserStore.location.coords]);

  return (
    <div className="container mx-auto flex align-center justify-between mb-2">
      <div className="flex justify-between w-6/12">
        <BlockContent>
          <HeaderBlock children="The Most Amaizing..." />
          <Quote>The only true wisdom is in knowing you know nothing...</Quote>
        </BlockContent>
        <BlockContent>
          <HeaderBlock children="In clients I look for..." />
          <Quote>There is only one good, knowledge, and one evil, ignorance.</Quote>
        </BlockContent>
      </div>
      <YMaps query={{ lang: "en_US" }}>
        <Map state={coords} width={"50%"} height={200} defaultState={coords}>
          <Placemark geometry={coords} />
        </Map>
      </YMaps>
    </div>
  );
});

export default Footer;
