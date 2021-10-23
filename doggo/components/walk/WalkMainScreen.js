import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import Slider from "./Slider";
import Services from "./Services";
import Selector from "./Selector";

const WalkMainScreen = () => {
  const [selectedService, setSelectedService] = useState(0);

  return (
    <View style={styles.container}>
      <Slider />
      <Services
        selectedService={selectedService}
        setSelectedService={setSelectedService}
      />
      <Selector selectedService={selectedService} />
    </View>
  );
};

export default WalkMainScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
});
