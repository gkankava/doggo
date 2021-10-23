import * as Location from "expo-location";

const TASK_NAME = "LOCATION_BACKGROUND_TASK";

export const startLocationUpdatesAsync = async () => {
  await Location.startLocationUpdatesAsync(TASK_NAME, {
    accuracy: 5,
    timeInterval: 1000,
    distanceInterval: 0,

    foregroundService: {
      notificationTitle: "Doggo updates your location ",
      notificationBody: "Syncing location ",
    },
    pausesUpdatesAutomatically: false,
  }).catch((err) => {
    console.log("start location update async: ", err);
  });
  const hasStarted = await Location.hasStartedLocationUpdatesAsync(TASK_NAME);
  console.log("tracking started?", hasStarted);
};
