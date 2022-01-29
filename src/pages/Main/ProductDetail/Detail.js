import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Modal,
  TouchableOpacity,
  SafeAreaView,
  Image,
  FlatList,
  Alert,
} from 'react-native';
import Error from '../../../components/Error';
import Loading from '../../../components/Loading';
import LoadingFav from '../../../components/LoadingFav';
import styles from './Detail.style';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';
import 'moment/min/locales';
import PriceHistoryCard from '../../../components/PriceHistoryCard';
import NoProduct from '../../../components/NoProduct';

moment.locale('tr-TR');

const Detail = ({ route, navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const { id } = route.params;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [fav, setFav] = useState(false);
  const [favData, setFavData] = useState([]);

  const [favLoading, setFavLoading] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(false);

  const [userInfo, setUserInfo] = useState(null);

  const [priceHistory, setPriceHistory] = useState([]);
  const [desced, setDesced] = useState(false);
  const [result, setResult] = useState([]);
  const [item, setItem] = useState(null);

  useEffect(() => {
    if (id) {
      try {
        const fetchProduct = async () => {
          await firestore()
            .collection('products')
            .doc(id)
            .get()
            .then(documentSnapshot => {
              setItem({ id: documentSnapshot.id, ...documentSnapshot.data() });
              // setItem(documentSnapshot.id, documentSnapshot.data());
            });
        };
        fetchProduct();
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    }
  }, [id]);

  useEffect(() => {
    if (item) {
      try {
        setLoading(true);
        const subscriber = async () => {
          await firestore()
            .collection('users')
            .doc(item.userId)
            .onSnapshot(documentSnapshot => {
              setUserInfo(documentSnapshot.data());
            });
        };

        const fetchPriceHistory = async () => {
          setHistoryLoading(true);
          const priceCollection = await firestore()
            .collection('price_history')
            .where('barcode', '==', item.barcode)
            .orderBy('priceDate', 'desc')
            .get();
          setPriceHistory(
            priceCollection.docs.map(doc => {
              return { ...doc.data(), id: doc.id };
            }),
          );
          setResult(
            priceCollection.docs.map(doc => {
              return { ...doc.data(), id: doc.id };
            }),
          );
          setHistoryLoading(false);

        };
        const fetchFav = async () => {
          const favoriteCollection = await firestore()
            .collection('favorites')
            .where('barcode', '==', item.barcode)
            .where('userId', '==', auth().currentUser.uid)
            .get();
          setFavData(
            favoriteCollection.docs.map(doc => {
              return { ...doc.data(), id: doc.id };
            }),
          );
        };

        subscriber();
        fetchPriceHistory();
        fetchFav();
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    }
  }, [item]);

  useEffect(() => {
    if (favData.length > 0) {
      setFav(true);
    }
  }, [favData]);

  const filteredRecord = type => {
    if (type === 'productPrice') {
      setResult(
        desced == true
          ? priceHistory.sort((a, b) => a['productPrice'] - b['productPrice'])
          : priceHistory.sort((a, b) => b['productPrice'] - a['productPrice']),
      );
    } else {
      setResult(
        desced == true
          ? priceHistory.sort((a, b) => a[type].localeCompare(b[type]))
          : priceHistory.sort((a, b) => b[type].localeCompare(a[type])),
      );
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (favLoading) {
    return <LoadingFav />;
  }

  if (error) {
    return <Error />;
  }

  const fetchFav = async () => {
    const favoriteCollection = await firestore()
      .collection('favorites')
      .where('barcode', '==', item.barcode)
      .where('userId', '==', auth().currentUser.uid)
      .get();
    setFavData(
      favoriteCollection.docs.map(doc => {
        return { ...doc.data(), id: doc.id };
      }),
    );
  };

  const handleOpenFilter = () => {
    setModalVisible(true);
  };

  const handleProductNameFilter = () => {
    filteredRecord('productName');
    setDesced(!desced);
  };
  const handleMarketNameFilter = () => {
    filteredRecord('marketName');
    setDesced(!desced);
  };
  const handleUserFilter = () => {
    filteredRecord('userName');
    setDesced(!desced);
  };
  const handleDateFilter = () => {
    filteredRecord('priceDate');
    setDesced(!desced);
  };
  const handlePriceFilter = () => {
    filteredRecord('productPrice');
    setDesced(!desced);
  };

  const handleAddFav = () => {
    try {
      setFavLoading(true);
      const addData = {
        barcode: item.barcode,
        productName: item.productName,
        productImage: item.productImage,
        marketName: item.marketName,
        productPrice: item.productPrice,
        userId: auth().currentUser.uid,
        productId: item.id,
      };
      firestore()
        .collection('favorites')
        .add(addData)
        .then(() => {
          fetchFav();
          setFavLoading(false);
          Alert.alert('pinti', 'Ürün Favorilere Eklendi!');
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteFavorites = async () => {
    try {
      setFavLoading(true);
      await firestore()
        .collection('favorites')
        .doc(favData[0].id)
        .delete()
        .then(() => {
          setFavData([]);
          setFav(false);
          setFavLoading(false);
          Alert.alert('pinti', 'Ürün Favorilerden Çıkarıldı!');
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleFav = async () => {
    if (fav) {
      setFav(false);
      await handleDeleteFavorites();
    } else {
      setFav(true);
      await handleAddFav();
    }
  };

  const handleBack = () => {
    navigation.goBack();
  }

  const renderHistory = ({ item }) => {
    return (
      <PriceHistoryCard
        product={item}
      />
    );
  };
  const renderSeperator = () => {
    return (
      <View
        style={styles.divider}
      />
    )

  }
  const renderListEmptyComponent = () => (
    historyLoading && <Text style={styles.emptyLoading}>Yükleniyor...</Text>
  );

  const renderFooter = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity
            style={[styles.button, styles.buttonClose]}
            onPress={handleProductNameFilter}>
            <Text style={styles.textStyle}>Ürün Adı (A-Z)</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.buttonClose]}
            onPress={handleMarketNameFilter}>
            <Text style={styles.textStyle}>Market (A-Z)</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.buttonClose]}
            onPress={handleUserFilter}>
            <Text style={styles.textStyle}>Kullanıcı (A-Z)</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.buttonClose]}
            onPress={handleDateFilter}>
            <Text style={styles.textStyle}>Tarih</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.buttonClose]}
            onPress={handlePriceFilter}>
            <Text style={styles.textStyle}>Fiyat</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalVisible(!modalVisible)}>
            <Text style={styles.textStyle}>Kapat</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )

  const renderHeader = () => (
    <View style={styles.container}>
      <Image source={{ uri: item.productImage }} style={styles.image} />
      <View
        style={styles.body_container}>
        <Text style={styles.title}>{item.productName}</Text>
        <View style={styles.barcode_bar}>
          <View style={styles.barcode}>
            <Text style={styles.barcode_text}>{item.barcode}</Text>
          </View>
          <View style={styles.last_price}>
            <Text style={styles.price_text}>₺{item.productPrice}</Text>
          </View>
        </View>
        <View style={styles.barcode_bar}>
          <View style={styles.user_profile}>
            <Image
              style={styles.user_image}
              source={{ uri: userInfo?.userImg }}
            />
          </View>
          <View style={styles.user}>
            <Text style={styles.user_text}>{userInfo?.name}</Text>
          </View>
          <View style={styles.date}>
            <Text style={styles.date_text}>{item.priceDate}</Text>
          </View>
        </View>
        <View style={styles.divider} />
        <Text style={styles.sub_title}>Açıklama</Text>
        <Text style={styles.description}>{item.productComment}</Text>

        <View style={styles.history_bar}>
          <View style={styles.price_history}>
            <Text style={styles.sub_title}>Fiyat Geçmişi</Text>
          </View>
          <View style={styles.price_history_filter}>
            <TouchableOpacity
              style={styles.filter_btn}
              onPress={handleOpenFilter}>
              <Image source={require('../../../assets/filter_icon.png')} />
            </TouchableOpacity>
          </View>
        </View>


      </View>

      <View style={styles.edit_product}>
        <TouchableOpacity style={styles.edit_btn} onPress={handleFav}>
          {fav ? (
            <Image source={require('../../../assets/fav_red.png')} />
          ) : (
            <Image source={require('../../../assets/fav_white.png')} />
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.go_back}>
        <TouchableOpacity style={styles.edit_btn} onPress={handleBack}>
         
            <Image source={require('../../../assets/back_button.png')} />
         
        </TouchableOpacity>
      </View>
    </View>

  );

  return (
      <FlatList
      style={{
        backgroundColor: 'white',
      }}
      ListHeaderComponent={renderHeader}
      data={result}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderHistory}
      ItemSeparatorComponent={renderSeperator}
      ListEmptyComponent={renderListEmptyComponent}
      ListFooterComponent={renderFooter}
    />  

  );
};

export default Detail;
