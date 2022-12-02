import { TLocation } from "@store/User";

type TGetCoordinates = (cityName: string) => Promise<TLocation | void>;

export const getCoordinates: TGetCoordinates = async (cityName) => {
  try {
    const res = await fetch(
      `https://geocode-maps.yandex.ru/1.x?geocode=${cityName}&apikey=${
        import.meta.env.VITE_YAMAP_API_KEY
      }&format=json&results=10&lang=en_US&kind=locality`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (res.ok) {
      const response = await res.json();

      if (!response) {
        return;
      }

      const geoObj = response.response.GeoObjectCollection.featureMember[0].GeoObject;
      const addres = geoObj.metaDataProperty.GeocoderMetaData.Address;
      const coords = geoObj.Point.pos;

      return {
        coords: coords
          .split(" ")
          .map((str: string) => Number(str))
          .reverse(),
        city: addres.Components.find((countryMeta: any) => countryMeta.kind === "locality").name,
        countryCode: addres.country_code,
        country: addres.Components.find((countryMeta: any) => countryMeta.kind === "country").name,
      };
    }
  } catch (error) {
    console.error(error);
  }
};
