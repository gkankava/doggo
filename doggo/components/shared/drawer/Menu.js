import React from "react";
import { StyleSheet, Text, ScrollView } from "react-native";
import { languageProvider } from "../../../store/language";
import { dc } from "../../../stacks/content/drawer";

import MenuItem from "./MenuItem";

const Menu = ({ toogle }) => {
  const { language } = languageProvider();
  const ln = dc[language];

  return (
    <ScrollView style={styles.container}>
      <MenuItem text={ln.dogs} icon="dog" route="Dogs" toogle={toogle} />
      <MenuItem text={ln.info} icon="info" route="Info" toogle={toogle} />
      <MenuItem
        text={ln.history}
        icon="clock"
        route="History"
        toogle={toogle}
      />
      <MenuItem text={ln.promo} icon="promo" route="Promos" toogle={toogle} />
      <MenuItem text={ln.refs} icon="refs" route="Refs" toogle={toogle} />
      <MenuItem
        text={ln.bookings}
        icon="bookings"
        route="Bookings"
        toogle={toogle}
      />
    </ScrollView>
  );
};

export default Menu;

const styles = StyleSheet.create({
  container: { height: "100%" },
});
