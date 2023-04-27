import { useState, useEffect } from "react";
import * as Location from "expo-location";

export type LocationType = {
  latitude: number | undefined;
  longitude: number | undefined;
};

const useLocation = () => {
  const [location, setLocation] = useState<LocationType>();
  try {
    const getLocation = async () => {
      const { granted } = await Location.requestBackgroundPermissionsAsync();
      if (!granted) return;

      const result = await Location.getLastKnownPositionAsync();
      const latitude = result?.coords.latitude;
      const longitude = result?.coords.longitude;
      setLocation({ latitude, longitude });
    };

    useEffect(() => {
      getLocation();
    }, []);
  } catch (error) {
    console.log(error);
  }

  return location;
};

export default useLocation;
