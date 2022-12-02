import { TLocation } from "../screens/store/User";

type TGetCoordinates = (cityName: string) => Promise<TLocation | void>;

export const getCoordinates: TGetCoordinates = async (cityName) => {
  try {
    const res = await fetch(
      `https://geocode-maps.yandex.ru/1.x?geocode=${cityName}&apikey=${
        import.meta.env.YAMAP_API_KEY
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

      return {
        coords: geoObj.Point.pos
          .split(" ")
          .map((str: string) => Number(str))
          .reverse(),
        city: geoObj.metaDataProperty.GeocoderMetaData.Address.Components.find((countryMeta: any) => countryMeta.kind === "locality").name,
        countryCode: geoObj.metaDataProperty.GeocoderMetaData.Address.country_code,
        country: geoObj.metaDataProperty.GeocoderMetaData.Address.Components.find((countryMeta: any) => countryMeta.kind === "country")
          .name,
      };
    }
  } catch (error) {
    console.error(error);
  }
};
