import React, {useState, useEffect} from 'react';
import {View, ScrollView, Text} from 'react-native';
import Background from '../../../components/Background';
import NotificationCard from '../../../components/NotificationCard';
import styles from './Notification.style';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Loading from '../../../components/Loading';
import Error from '../../../components/Error';

const Notification = ({navigation}) => {
  const [favData, setFavData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    try {
      navigation.addListener('focus', () => {
        setLoading(true);

        const fetchFavHistory = async () => {
          const favCollection = await firestore()
            .collection('notifications')
            .orderBy('notificationDate', 'desc')
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
      });
    } catch (err) {
      setError(err.message);
    }
  }, [navigation]);

  useEffect(() => {
    if (loading) {
      try {
        setLoading(true);

        const fetchFavHistory = async () => {
          const favCollection = await firestore()
            .collection('notifications')
            .orderBy('notificationDate', 'desc')
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

  return (
    <Background>
      <ScrollView style={styles.container}>
        <View style={styles.notification}>
          <Text style={styles.title}>Bildirimler</Text>
          {favData.map((item, index) => {
            return (
              <NotificationCard
                key={index}
                productName={item.productName}
                marketName={item.marketName}
                message={`"Takip ettiğiniz ürünün fiyatı ${item.oldPrice} TL den ${item.newPrice} TL ye düştü"`}
                notificationTypeImage={require('../../../assets/low_price.png')}
                productImage={require('../../../assets/logo2.png')}
              />
            );
          })}
        </View>
      </ScrollView>
    </Background>
  );
};

export default Notification;
