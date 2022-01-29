import React, {useEffect} from 'react';
import styles from './PriceHistoryCard.style';
import {View, Text, Image, ScrollView} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const PriceHistoryCard = ({product}) => {
  const [profilePhoto, setProfilePhoto] = React.useState(null);

  useEffect(() => {
    if (product) {
      const getUserImage = () => {
        firestore()
          .collection('users')
          .doc(product.userId)
          .onSnapshot(snapshot => {
            const contentData = snapshot.data();
            console.log(contentData);
            if (contentData) {
              setProfilePhoto(contentData.userImg);
            } else {
              setProfilePhoto(
                'https://firebasestorage.googleapis.com/v0/b/pinti-dbde8.appspot.com/o/image%2FprofilePic%2Fprofil_image.jpg?alt=media&token=14645ef7-e244-4e6a-be1c-06dc2887e6c4',
              );
            }
          });
      };
      getUserImage();
    }
  }, [product]);

  return (
    <View style={styles.list}>
      <View style={styles.list_bar}>
        <View style={styles.user_profile_sm}>
          <Image style={styles.user_image_sm} source={{uri: profilePhoto}} />
        </View>
        <View style={styles.user_sm}>
          <Text style={styles.user_text_sm}>{product.userName}</Text>
        </View>
      </View>

      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        style={styles.list_body}>
        <View style={styles.list_item}>
          <Text style={styles.list_text}>{product.productName}</Text>
        </View>
        <View style={styles.list_item}>
          <Text style={styles.list_text}>{product.priceDate}</Text>
        </View>

        <View style={styles.list_item}>
          <Text style={styles.list_text}>{product.marketName}</Text>
        </View>
        <View style={styles.list_item}>
          <Text style={styles.price_text_sm}>₺{product.productPrice}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default PriceHistoryCard;
