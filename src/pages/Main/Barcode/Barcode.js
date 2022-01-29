import React, {useState, useEffect} from 'react';
import BarcodeScanner from 'react-native-scan-barcode';
import firestore from '@react-native-firebase/firestore';
import {Alert} from 'react-native';

const ScanBarcodeApp = ({navigation}) => {
  const [item, setItem] = useState(null);
  useEffect(() => {
    if (item && typeof(item) == 'object') {
      console.log(typeof(item));
      const id = item.id;
      navigation.navigate('ProductDetailScreen', {id});
    } else if(item == null) {
      return;
    } else if(item == 'bulunamadı') {
      Alert.alert('pinti', 'Böyle bir ürün bulunamadı', [
        {
          text: 'Anasayfaya git',
          onPress: () => {
            navigation.navigate('HomePageScreen');
          },
        },
        {
          text: 'Ürün Ekle',
          onPress: () => {
            navigation.navigate('AddProductScreen');
          },
        },
        {
          text: 'Yeniden Dene',
          onPress: () => {
            return;
          },
          style: 'cancel',
        },
      ]);
    }
  }, [item]);

  const barcodeReceived = e => {
    try {
      const fetchProduct = async () => {
        const barcode = e.data;
        setItem(null);
        console.log(barcode)
        const productCollection = await firestore()
          .collection('products')
          .where('barcode', '==', barcode)
          .get();
          console.log(productCollection.docs)
        if( productCollection.docs.length > 0) {
          setItem(
            productCollection.docs.map(doc => {
              console.log(doc.data())
              return {...doc.data(), id: doc.id};
            })[0],
          );
        } else {
          setItem("bulunamadı");

        }
       
      };
      fetchProduct();
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <BarcodeScanner
      onBarCodeRead={barcodeReceived}
      style={{flex: 1}}
      torchMode="off"
      cameraType="back"
    />
  );
};

export default ScanBarcodeApp;
