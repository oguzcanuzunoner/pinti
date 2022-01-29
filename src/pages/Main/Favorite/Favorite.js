import React, {useState} from 'react';
import {Text, View, Alert, FlatList} from 'react-native';
import Background from '../../../components/Background';
import styles from './Favorite.style';
import FavoriteCard from '../../../components/FavoriteCard';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Loading from '../../../components/Loading';
import Error from '../../../components/Error';

const Favorite = ({navigation}) => {
  const [favData, setFavData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  React.useEffect(() => {
    try {
      const unsubscribe = navigation.addListener('focus', () => {
        setLoading(true);

        const fetchFavHistory = async () => {
          const favCollection = await firestore()
            .collection('favorites')
            .where('userId', '==', auth().currentUser.uid)
            .get();
          setFavData(
            favCollection.docs.map(doc => {
              return {...doc.data(), id: doc.id};
            }),
          );
        };
        fetchFavHistory();
        setLoading(false);
        return unsubscribe;
      });
    } catch (err) {
      setError(err.message);
    }
  }, [navigation]);

  React.useEffect(() => {
    if (loading) {
      try {
        setLoading(true);

        const fetchFavHistory = async () => {
          const favCollection = await firestore()
            .collection('favorites')
            .where('userId', '==', auth().currentUser.uid)
            .get();
          setFavData(
            favCollection.docs.map(doc => {
              return {...doc.data(), id: doc.id};
            }),
          );
        };
        fetchFavHistory();
        setLoading(false);
      } catch (err) {
        setError(err.message);
      }
    }
  }, [loading]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  const handleProductSelect = id => {
    navigation.navigate('ProductDetailScreen', {id});
  };

  const handleUnFavorite = async item => {
    try {
      setLoading(true);
      await firestore().collection('favorites').doc(item).delete();
      Alert.alert('pinti', 'Ürün Favoriden Kaldırıldı!');
      setLoading(false);
    } catch (error) {
      setError(error.message);
    }
  };

  const renderProduct = ({item}) => {
    return (
      <FavoriteCard
        product={item}
        onSelect={() => handleProductSelect(item.productId)}
        handleUnFavorite={() => handleUnFavorite(item.id)}
      />
    );
  };

  return (
    <Background>
      <View style={styles.container}>
        <View style={styles.favorite}>
          <Text style={styles.title}>Favoriler</Text>
          <FlatList
            numColumns={1}
            data={favData}
            renderItem={renderProduct}
            keyExtractor={item => item.id}
          />
        </View>
      </View>
    </Background>
  );
};

export default Favorite;
