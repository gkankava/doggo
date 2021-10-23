// Reactotron config

if (__DEV__) {
  import("./ReactotronConfig").then(() => console.log("Reactotron Ready"));
}

// -- END --

import React, { useEffect, useState } from "react";
import { StatusBar, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import * as Progress from "react-native-progress";
import * as linking from "./linking.conf";

import { appStateProvider } from "./store/appState";
import { userProvider } from "./store/auth";
import { userDataProvider } from "./store/userData";
import { fetchUser, setAuthorizationToken } from "./store/actions/user";
import { getData } from "./handlers/localStorage";

import Onboarding from "./components/onboarding/Onboarding";
import AuthStack from "./stacks/AuthStack/";
import MainStack from "./stacks/MainStack";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const { loading, setLoading } = appStateProvider();
  const { currentUser, setCurrentUser } = userProvider();
  const { setDogs, setCards, setAddresses, setWalkOrders } = userDataProvider();
  const [first, setFirst] = useState(false);

  useEffect(() => {
    getData("first").then((first) => {
      if (first === "true" || first === null) {
        setFirst(true);
      } else setFirst(false);
    });

    getData("jwtToken").then((token) => {
      if (token) {
        setLoading(true);
        setAuthorizationToken(token);
        try {
          fetchUser(
            token,
            setCurrentUser,
            setLoading,
            setDogs,
            setCards,
            setAddresses,
            setWalkOrders
          );
        } catch (error) {
          console.log(error);
          setCurrentUser(false, null);
          setAuthorizationToken(null);
          AsyncStorage.clear();
        }
      }
    });
  }, []);

  return (
    <NavigationContainer linking={linking}>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor="transparent"
      />

      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Progress.CircleSnail color={"#3CBF77"} size={70} thickness={4} />
        </View>
      ) : (
        <>
          {currentUser.isAuthenticated ? (
            <>
              <MainStack />
            </>
          ) : (
            <>{first ? <Onboarding setFirst={setFirst} /> : <AuthStack />}</>
          )}
        </>
      )}
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </NavigationContainer>
  );
}
