import React, { useEffect } from "react";
import { Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { getData } from "./handlers/localStorage";

import { appStateProvider } from "./store/appState";
import { userProvider } from "./store/user";
import { fetchUser, setAuthorizationToken } from "./store/actions/user";

import AuthStack from "./stacks/AuthStack";
import MainStack from "./stacks/MainStack";

const Router = () => {
  const { setLoading } = appStateProvider();
  const { currentUser, setCurrentUser } = userProvider();

  useEffect(() => {
    getData("jwtToken").then((token) => {
      if (token) {
        setLoading(true);
        setAuthorizationToken(token);
        try {
          fetchUser(token, setCurrentUser, setLoading);
        } catch (error) {
          setCurrentUser(false, null);
          setAuthorizationToken(null);
          AsyncStorage.clear();
        }
      }
    });
  }, []);

  return <>{currentUser.isAuthenticated ? <MainStack /> : <AuthStack />}</>;
};

export default Router;

Router.getCurrentUser = async () => {
  const currentUser = await AsyncStorage.getItem("CURRENT_USER");
  return currentUser;
};
