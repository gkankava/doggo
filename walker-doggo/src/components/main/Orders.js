import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SectionList,
  Platform,
  FlatList,
} from "react-native";
import Constants from "expo-constants";
import { useNavigation } from "@react-navigation/native";

import SectionTitle from "./SectionTitle";
import OrderCard from "../shared/cards/OrderCard";

import { dummy, filterOrders } from "../../store/actions/orders";
import { ordersProvider } from "../../store/orders";

const Orders = () => {
  const { orders, asapOrders, activeOrder } = ordersProvider();
  const [dm, setDm] = React.useState([]);

  // React.useEffect(() => {
  // let res = filterOrders(dummy);
  // setDm(res);
  // filterOrders(orders);
  // orders.length > 0 && setDm(orders);
  // console.log(orders);
  // }, [asapOrders]);

  const navigation = useNavigation();

  return (
    <>
      {activeOrder && (
        <>
          <SectionTitle title={"Active order"} />
          <OrderCard item={activeOrder} navigation={navigation} />
        </>
      )}
      {asapOrders.length > 0 && (
        <>
          <SectionTitle title={"ASAP"} />
          <FlatList
            data={asapOrders}
            renderItem={({ item }) => (
              <OrderCard navigation={navigation} item={item} />
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        </>
      )}

      {/* {dm.length > 0 && <OrderCard navigation={navigation} item={dm[0]} />} */}
      {/* {dm && (
        <SectionList
          style={{
            marginBottom: Platform.OS === "ios" ? 0 : Constants.statusBarHeight,
          }}
          stickySectionHeadersEnabled={true}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={() => <></>}
          sections={dm}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => <OrderCard item={item} />}
          renderSectionHeader={({ section: { title } }) => (
            <SectionTitle title={title} />
          )}
        />
      )} */}
    </>
  );
};

export default Orders;
