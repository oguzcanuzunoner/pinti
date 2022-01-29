import React, {useState, useEffect} from 'react';
import {View, Text, Image, FlatList, TouchableOpacity} from 'react-native';
import Background from '../../../../components/Background';
import styles from './Home.style';

import ProductCard from '../../../../components/ProductCard';
import NoProduct from '../../../../components/NoProduct';
import Loading from '../../../../components/Loading';
import Error from '../../../../components/Error';
import Input from '../../../../components/Input';
import Icon from 'react-native-vector-icons/Ionicons';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import PushNotification from 'react-native-push-notification';

import filter from 'lodash.filter';

const Home = ({navigation}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [getNotifications, setGetNotifications] = useState([]);

  useEffect(() => {
    try {
      const unsubscribe = firestore()
        .collection('products')
        .orderBy('priceDate', 'desc')
        .onSnapshot(snap => {
          const data = snap.docs.map(doc => {
            return {...doc.data(), id: doc.id};
          });
          setData(data);
          setFullData(data);
          setLoading(false);
        });

      return () => unsubscribe();
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      const getNotification = async () => {
        const notificationsCollection = await firestore()
          .collection('notifications')
          .get();
        setGetNotifications(
          notificationsCollection.docs.map(doc => {
            return {...doc.data(), id: doc.id};
          }),
        );
      };
      getNotification();
    });

    return unsubscribe;
  }, [navigation]);

  if (getNotifications.length > 0) {
    getNotifications.map(item => {
      if (item.userId === auth().currentUser.uid) {
        PushNotification.localNotification({
          channelId: 'com.pintii',
          vibrate: true,
          vibration: 300,
          playSound: true,
          soundName: 'default',
          title: 'Takip Ettiğiniz ürünün fiyatı düştü',
          message: `"Takip ettiğiniz ürün olan ${item.productName} fiyatı ${item.marketName}'te ${item.oldPrice} TL'den ${item.newPrice} TL'ye düştü."`,
          largeIcon: 'ic_launcher',
        });

        firestore()
          .collection('notifications')
          .doc(item.id)
          .delete()
          .then(() => {
            console.log('User deleted!');
          });
      }
    });
  }

  const [query, setQuery] = useState('');
  const [fullData, setFullData] = useState([]);

  const handleSearch = text => {
    const formattedQuery = text.toLowerCase();
    const filteredData = filter(fullData, product => {
      return contains(product, formattedQuery);
    });
    setData(filteredData);
    setQuery(text);
  };

  const contains = (product, query) => {
    const {productName} = product;
    if (productName.toLowerCase().includes(query.toLowerCase())) {
      return true;
    }

    return false;
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  const handleAddProduct = () => {
    navigation.navigate('AddProductScreen');
  };

  const handleProductSelect = id => {
    navigation.navigate('ProductDetailScreen', {id});
  };
  const renderProduct = ({item}) => {
    return (
      <ProductCard
        product={item}
        onSelect={() => handleProductSelect(item.id)}
      />
    );
  };

  const renderHeader = () => <></>;

  const renderListEmptyComponent = () => (
    <NoProduct newProductNavigate={handleAddProduct} />
  );

  return (
    <Background>
      <View style={styles.container}>
        <Text style={styles.title}>Aradığınız Ürünü Kolayca Bulun</Text>
        <View style={styles.searchContainer}>
          <View style={styles.searchItem}>
            <Icon name="search" size={20} color="#DA6317" />
          </View>
          <View style={styles.inputItem}>
            <Input
              autoCapitalize="none"
              autoCorrect={false}
              clearButtonMode="always"
              value={query}
              onChangeText={queryText => handleSearch(queryText)}
              placeholder="Ürün adı giriniz"
              theme="secondary"
              placeholderTextColor="#FEFEFF"
            />
          </View>
          <View style={styles.addItem}>
            <TouchableOpacity
              style={styles.top_bar_btn}
              onPress={handleAddProduct}>
              <Image
                source={require('../../../../assets/add_product2.png')}
                style={styles.top_bar_icon}
              />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.text}>Tüm Ürünler</Text>

        <FlatList
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
          data={data}
          renderItem={renderProduct}
          ListEmptyComponent={renderListEmptyComponent}
        />
      </View>
    </Background>
  );
};

export default Home;
