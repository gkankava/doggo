import React, { useEffect, useState } from "react";
import * as Location from "expo-location";

import { updateLocation } from "../store/actions/user";
import { userProvider } from "../store/user";

const ServicesProvider = () => {
  const { currentUser } = userProvider();
  const [currentLocation, setCurrentLocation] = useState(null);

  let id = currentUser.user.id;

  useEffect(() => {
    (async () => {
      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.BestForNavigation,
      });
      updateLocation(
        id,
        {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        },
        setCurrentLocation
      );
      console.log(`${new Date(Date.now()).toLocaleTimeString()} []`);
    })();
  }, []);

  useEffect(() => {
    if (currentLocation) {
      (async () => {
        let location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.BestForNavigation,
        });
        setTimeout(() => {
          updateLocation(
            id,
            {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            },
            setCurrentLocation
          );
        }, 2000);
      })();
    }
  }, [currentLocation]);

  return <></>;
};
export default ServicesProvider;
