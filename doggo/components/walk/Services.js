import React, { useEffect, useState, useCallback } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import { CircleSnail } from "react-native-progress";

import { appStateProvider } from "../../store/appState";
import { walkServicesProvider } from "../../store/walkServices";
import { fetchWalkServices } from "../../store/actions/walkServices";

import ServiceCard from "./ServiceCard";

const Services = ({ selectedService, setSelectedService }) => {
  const { loading, setLoading } = appStateProvider();
  const { walkServices, setWalkServices } = walkServicesProvider();

  useFocusEffect(
    useCallback(() => {
      fetchWalkServices(walkServices, setWalkServices);
    }, [])
  );

  useEffect(() => {
    if (walkServices.length > 0) setSelectedService(1);
  }, [walkServices]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 10 }}
    >
      {walkServices.length > 0 ? (
        walkServices.map((item, key) => (
          <ServiceCard
            key={key}
            item={item}
            selected={selectedService}
            setSelected={setSelectedService}
          />
        ))
      ) : (
        <View style={styles.indicatorContainer}>
          <CircleSnail color={"#3CBF77"} size={50} thickness={2} />
        </View>
      )}
    </ScrollView>
  );
};

export default Services;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 20,
  },
  indicatorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "20%",
  },
});
