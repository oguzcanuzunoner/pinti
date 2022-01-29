import React from 'react';
import {Text, View} from 'react-native';
import LottieView from 'lottie-react-native';
import styles from './NoProducts.style';
import Button from '../Button';

const NoProduct = ({newProductNavigate}) => {
  const handleNavigate = () => {
    return newProductNavigate();
  };
  return (
    <>
      <Text style={styles.text}>Ürün Bulunamadı</Text>
      <LottieView
        style={styles.animation}
        resizeMode="cover"
        source={require('../../assets/no_found.json')}
        autoPlay={true}
      />
      <Button text="Yeni Ürün Ekle" onPress={handleNavigate} />
    </>
  );
};

export default NoProduct;
