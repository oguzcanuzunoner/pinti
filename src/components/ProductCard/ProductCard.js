import React from 'react';
import {View, Text, Image, TouchableWithoutFeedback} from 'react-native';
import styles from './ProductCard.styles';
const ProductCard = ({product, onSelect}) => {
  return (
    <TouchableWithoutFeedback onPress={onSelect}>
      <View style={styles.container}>
        <Image style={styles.image} source={{uri: product.productImage}} />
        <View style={styles.body_container}>
          <Text style={styles.title}>{product.productName}</Text>
          <Text style={styles.price}>₺{product.productPrice} </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ProductCard;
