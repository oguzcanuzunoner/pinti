import React, {useState} from 'react';
import styles from './FavoriteCard.style';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

const FavoriteCard = ({product, onSelect, handleUnFavorite}) => {
  return (
    <ScrollView style={styles.scrollView}>
      <TouchableWithoutFeedback onPress={onSelect}>
        <View style={styles.container}>
          <View style={styles.type}>
            <Image
              source={{uri: product.productImage}}
              style={styles.image}></Image>
          </View>
          <View style={styles.message}>
            <View>
              <Text style={styles.productName}>{product.productName}</Text>
            </View>
            <View>
              <Text style={styles.marketName}>{product.marketName}</Text>
            </View>
          </View>
          <View style={styles.price}>
            <View style={styles.priceAmount}>
              <Text style={styles.priceAmount}>{product.productPrice}</Text>
            </View>
          </View>
          <View style={styles.unFavorite}>
            <TouchableOpacity onPress={handleUnFavorite}>
              <Image source={require('../../assets/cross_icon.png')} />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

export default FavoriteCard;
