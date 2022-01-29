import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
  Modal,
  Alert,
} from 'react-native';
import styles from './AddProduct.style';
import Background from '../../../components/Background';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import Loading from '../../../components/Loading';
import Error from '../../../components/Error';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import {Formik} from 'formik';
import * as yup from 'yup';
import {FakeCurrencyInput} from 'react-native-currency-input';

import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

import moment from 'moment';
import 'moment/min/locales';
moment.locale('tr-TR');

import {Platform} from 'react-native';
import PushNotification from 'react-native-push-notification';

const addProductValidationSchema = yup.object().shape({
  productName: yup.string().required('Ürün Adı zorunlu!'),
  marketName: yup.string().required('Market Adı zorunlu!'),
  barcode: yup
    .number()
    .typeError('lütfen yalnızca sayı giriniz')
    .positive('Girdiğiniz değer pozitif olmalıdır-1')
    .required('Ürün Barkodu zorunlu!'),
  productPrice: yup.number().required('Ürün Fiyatı zorunlu!'),
  productComment: yup.string().required('Ürün Açıklaması zorunlu!'),
  productDate: yup.date().required('Ürün Tarihi zorunlu!'),
});

const AddProduct = ({navigation}) => {
  const [profilePic, setProfilPic] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [value, setValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [getFavorites, setGetFavorites] = useState([]);

  useEffect(() => {
    if (navigation) {
      try {
        let unmounted = false;

        const unsubscribe2 = async () =>
          await firestore()
            .collection('favorites')
            .onSnapshot(snap => {
              setPageLoading(true);
              const data = snap.docs.map(doc => {
                return {...doc.data(), id: doc.id};
              });
              setGetFavorites(data);
              setPageLoading(false);
            });

        unsubscribe2();
        return () => {
          unmounted = true;
        };
      } catch (err) {
        setError(err.message);
        setPageLoading(false);
      }
    }
  }, [navigation]);

  if (pageLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  const handleImage = async () => {
    try {
      const result = await launchCamera({
        mediaType: 'photo',
        quality: 1,
        saveToPhotos: true,
      });
      setProfilPic(result.assets[0].uri);
      setModalVisible(false);
    } catch (error) {
      console.log(error.message);
      setModalVisible(false);
    }
  };
  const handleImageLibrary = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 1,
      });
      setProfilPic(result.assets[0].uri);
      setModalVisible(false);
    } catch (error) {
      console.log(error.message);
      setModalVisible(false);
    }
  };
  const submitStorageImage = async () => {
    const uploadUri = profilePic;
    const fileName = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    try {
      const ref = storage().ref(`image/productPic/${fileName}`);

      await ref.putFile(uploadUri);
      const downloadUrl = await ref.getDownloadURL();
      return downloadUrl;
    } catch (e) {
      console.log(e.message);
    }
  };
  const openModal = () => {
    setModalVisible(true);
  };

  PushNotification.createChannel(
    {
      channelId: 'com.pintii', // (required)
      channelName: 'Pinti', // (required)
      channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
      playSound: false, // (optional) default: true
      soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
      importance: 4, // (optional) default: 4. Int value of the Android notification importance
      vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
    },
    created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
  );

  const handleFormSubmit = formValues => {
    try {
      if (profilePic.length < 1) {
        Alert.alert('pinti', 'Ürün fotoğrafı yükleyin!');

        return;
      }
      const fav = getFavorites.filter(x => x.barcode === formValues.barcode);

      firestore()
        .collection('products')
        .where('barcode', '==', formValues.barcode)
        .get()
        .then(querySnapshot => {
          if (!querySnapshot.empty) {
            querySnapshot.forEach(documentSnapshot => {
              const finded = {
                ...documentSnapshot.data(),
                id: documentSnapshot.id,
              };
              const docsId = finded.id;
              if (formValues.productPrice < finded.productPrice) {
                setLoading(true);
                submitStorageImage().then(downloadUrl => {
                  firestore()
                    .collection('products')
                    .doc(docsId)
                    .update({
                      marketName: formValues.marketName,
                      productComment: formValues.productComment,
                      productPrice: formValues.productPrice,
                      priceDate: moment(formValues.productDate).format(
                        'Do MMMM YYYY, H:mm:ss ',
                      ),
                      productImage: downloadUrl,
                    })
                    .then(() => {
                      firestore()
                        .collection('price_history')
                        .add({
                          barcode: formValues.barcode,
                          productName: formValues.productName,
                          marketName: formValues.marketName,
                          productPrice: formValues.productPrice,
                          priceDate: moment(formValues.productDate).format(
                            'Do MMMM YYYY, H:mm:ss ',
                          ),
                          userId: auth().currentUser.uid,
                          userName: auth().currentUser.displayName,
                        })
                        .then(() => {
                          if (fav) {
                            const result = fav.filter(
                              x => x.barcode === formValues.barcode,
                            );
                            result.map(item => {
                              const docsId = item.id;
                              firestore()
                                .collection('favorites')
                                .doc(docsId)
                                .update({
                                  marketName: formValues.marketName,
                                  productComment: formValues.productComment,
                                  productPrice: formValues.productPrice,
                                  priceDate: moment(
                                    formValues.productDate,
                                  ).format('Do MMMM YYYY, H:mm:ss '),
                                  productImage: downloadUrl,
                                })
                                .then(() => {
                                  firestore()
                                    .collection('notifications')
                                    .add({
                                      barcode: formValues.barcode,
                                      productName: formValues.productName,
                                      marketName: formValues.marketName,
                                      oldPrice: finded.productPrice,
                                      newPrice: formValues.productPrice,
                                      priceDifference:
                                        finded.productPrice -
                                        formValues.productPrice,
                                      notificationDate: moment(
                                        formValues.productDate,
                                      ).format('Do MMMM YYYY, H:mm:ss '),
                                      productImage: downloadUrl,
                                      userId: item.userId,
                                    });
                                  const showNotification = () => {
                                    if (item.userId === auth().currentUser.uid)
                                      PushNotification.localNotification({
                                        channelId: 'com.pintii',
                                        vibrate: true,
                                        vibration: 300,
                                        playSound: true,
                                        soundName: 'default',
                                        title:
                                          'Takip Ettiğiniz ürünün fiyatı düştü',
                                        message: `"Takip ettiğiniz ürün olan ${formValues.productName} fiyatı ${formValues.marketName}'te ${finded.productPrice} TL'den ${formValues.productPrice} TL'ye düştü."`,
                                      });
                                  };
                                  showNotification();
                                });
                            });
                          }
                        });
                    });
                  setLoading(false);
                  Alert.alert('pinti', 'Ürün Güncellendi!');
                  navigation.navigate('HomePageScreen');
                });
              } else {
                setLoading(true);
                firestore()
                  .collection('price_history')
                  .add({
                    barcode: formValues.barcode,
                    productName: formValues.productName,
                    marketName: formValues.marketName,
                    productPrice: formValues.productPrice,
                    priceDate: moment(formValues.productDate).format(
                      'Do MMMM YYYY, H:mm:ss ',
                    ),
                    userId: auth().currentUser.uid,
                    userName: auth().currentUser.displayName,
                  });
                setLoading(false);
                Alert.alert('pinti', 'Ürün Eklendi!');
                navigation.navigate('HomePageScreen');
              }
            });
          } else {
            setLoading(true);

            submitStorageImage().then(downloadUrl => {
              firestore()
                .collection('products')
                .add({
                  productName: formValues.productName,
                  marketName: formValues.marketName,
                  barcode: formValues.barcode,
                  productPrice: formValues.productPrice,
                  productComment: formValues.productComment,
                  priceDate: moment(formValues.productDate).format(
                    'Do MMMM YYYY, H:mm:ss ',
                  ),
                  productImage: downloadUrl,
                  userId: auth().currentUser.uid,
                });
              firestore()
                .collection('price_history')
                .add({
                  barcode: formValues.barcode,
                  productName: formValues.productName,
                  marketName: formValues.marketName,
                  productPrice: formValues.productPrice,
                  priceDate: moment(formValues.productDate).format(
                    'Do MMMM YYYY, H:mm:ss ',
                  ),
                  userId: auth().currentUser.uid,
                  userName: auth().currentUser.displayName,
                });
            });
            Alert.alert('pinti', 'Ürün Oluşturuldu!');
            setLoading(false);
            navigation.navigate('HomePageScreen');
          }
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };
  return (
    <Background>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={handleImage}>
              <Text style={styles.textStyle}>Fotoğraf Çek</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={handleImageLibrary}>
              <Text style={styles.textStyle}>Galeriden Seç</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Kapat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <TouchableOpacity onPress={handleBack}>
        <Text style={styles.go_back}>İptal</Text>
      </TouchableOpacity>

      <ScrollView
        showsHorizontalScrollIndicator={false}
        style={styles.container}>
        <Formik
          initialValues={{
            productName: '',
            marketName: '',
            barcode: '',
            productPrice: value,
            productComment: '',
            productDate: new Date(),
          }}
          validationSchema={addProductValidationSchema}
          onSubmit={handleFormSubmit}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            values,
            errors,
            touched,
          }) => (
            <>
              <TouchableWithoutFeedback onPress={openModal}>
                {profilePic ? (
                  <Image
                    source={{uri: profilePic}}
                    style={styles.profile_pic}
                  />
                ) : (
                  <Image
                    source={require('../../../assets/add_photo.png')}
                    style={styles.profile_pic}
                  />
                )}
              </TouchableWithoutFeedback>
              <Text style={styles.input_label}>Ürün Adı</Text>

              <Input
                placeholder="Ürün adı giriniz"
                onChangeText={handleChange('productName')}
                value={values.productName}
                onBlur={handleBlur('productName')}
              />
              {errors.productName && touched.productName && (
                <Text style={{fontSize: 10, margin: 20, color: 'red'}}>
                  {errors.productName}
                </Text>
              )}
              <Text style={styles.input_label}>Market Adı</Text>
              <Input
                placeholder="Market Adı Giriniz"
                onChangeText={handleChange('marketName')}
                value={values.marketName}
                onBlur={handleBlur('marketName')}
              />
              {errors.marketName && touched.marketName && (
                <Text style={{fontSize: 10, margin: 20, color: 'red'}}>
                  {errors.marketName}
                </Text>
              )}
              <Text style={styles.input_label}>Ürün Barkodu</Text>
              <Input
                placeholder="Ürün Barkodu Giriniz"
                onChangeText={handleChange('barcode')}
                value={values.barcode}
                onBlur={handleBlur('barcode')}
              />
              {errors.barcode && touched.barcode && (
                <Text style={{fontSize: 10, margin: 20, color: 'red'}}>
                  {errors.barcode}
                </Text>
              )}
              <Text style={styles.input_label}>Ürün Fiyatı</Text>
              <FakeCurrencyInput
                style={styles.currency_input}
                value={value}
                onChangeValue={setValue}
                delimiter=","
                separator="."
                precision={2}
                onChangeText={handleChange('productPrice')}
              />
              {errors.productPrice && touched.productPrice && (
                <Text style={{fontSize: 10, margin: 20, color: 'red'}}>
                  {errors.productPrice}
                </Text>
              )}

              <Text style={styles.input_label}>Ürün Açıklaması</Text>
              <Input
                placeholder="Ürün Açıklaması Giriniz"
                onChangeText={handleChange('productComment')}
                value={values.productComment}
                onBlur={handleBlur('productComment')}
                multiline={true}
              />
              {errors.productComment && touched.productComment && (
                <Text style={{fontSize: 10, marginLeft: 20, color: 'red'}}>
                  {errors.productComment}
                </Text>
              )}

              <View style={styles.button_container}>
                <Button
                  text="Kaydet"
                  onPress={handleSubmit}
                  loading={loading}
                />
              </View>
            </>
          )}
        </Formik>
      </ScrollView>
    </Background>
  );
};

export default AddProduct;
