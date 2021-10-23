import React from "react";
import { StyleSheet, View } from "react-native";
import { Lock, Call, Wallet, Location } from "react-native-iconly";

import MenuItem from "./MenuItem";

import { languageProvider } from "../../store/language";
import { pc } from "../../stacks/content/personal";

const Menu = () => {
  const { language } = languageProvider();
  const ln = pc[language];

  return (
    <View style={styles.container}>
      <MenuItem
        icon={<Lock set="bold" primaryColor="#46596C" size={24} />}
        title={ln.reset}
        route={"Reset"}
      />
      {/* <MenuItem
        icon={<Call set="bold" primaryColor="#46596C" size={24} />}
        title={ln.mob}
        route={"Mob"}
      /> */}
      <MenuItem
        icon={<Wallet set="bold" primaryColor="#46596C" size={24} />}
        title={ln.payment}
        route={"Payment"}
      />
      <MenuItem
        icon={<Location set="bold" primaryColor="#46596C" size={24} />}
        title={ln.address}
        route={"Address"}
      />
    </View>
  );
};

export default Menu;

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
  },
});

{
  /* <MenuItem
icon={<Phone set="bold" primaryColor="#46596C" size={24} />}
title={"პაროლის შეცვლა"}
route={"route"}
/>
<MenuItem
icon={<Wallet set="bold" primaryColor="#46596C" size={24} />}
title={"პაროლის შეცვლა"}
route={"route"}
/>
<MenuItem
icon={<Location set="bold" primaryColor="#46596C" size={24} />}
title={"პაროლის შეცვლა"}
route={"route"}
/> */
}
