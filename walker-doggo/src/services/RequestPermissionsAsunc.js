import * as Location from "expo-location";
import React, { useEffect } from "react";

export default RequestPermissionsAsunc = () => {
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        return;
      }
      //   let location = await Location.getCurrentPositionAsync({});
      //   setLocation(location);
    })();
  }, []);
  return <></>;
};
