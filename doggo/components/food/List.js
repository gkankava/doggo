import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import AccordionCard from "./AccordionCard";

import { shopProvider } from "../../store/products";

const List = ({ selected }) => {
  const { products, order, setOrder } = shopProvider();
  const [productBatch, setProductBatch] = useState([]);

  useEffect(() => {
    setOrder({ ...order, products: productBatch });
  }, [productBatch]);

  const getProductsByCategory = () => {
    let newArr = products.filter((c) => c.category_id === selected);
    return newArr.map((p, k) => (
      <AccordionCard
        key={k}
        id={p.id}
        title={p.name}
        info={p.description}
        price={p.price}
        productBatch={productBatch}
        setProductBatch={setProductBatch}
      />
    ));
  };

  return (
    <View style={styles.contaienr}>
      {products.length > 0 && getProductsByCategory()}
    </View>
  );
};

export default List;

const styles = StyleSheet.create({
  contaienr: { marginTop: 40 },
});

// products.map((p, k) => (
//   <AccordionCard
//     key={k}
//     title={p.name}
//     info={p.description}
//     price={p.price}
//     setIsorder={setIsorder}
//   />
// ))
