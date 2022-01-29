import React, {useState} from 'react';
import {
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Modal,
  Alert,
  ScrollView,
} from 'react-native';
import styles from './SignUp.style';
import Background from '../../../components/Background';
import Button from '../../../components/Button';
import Input from '../../../components/Input';

import {launchImageLibrary, launchCamera} from 'react-native-image-picker';

import {Formik} from 'formik';
import * as yup from 'yup';

import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

import authErrorMessageParser from '../../../utils/authErrorMessageParser';

const signUpValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Lütfen geçerli bir şifre girin.')
    .required('E-mail zorunlu!'),
  displayName: yup
    .string()
    .required('Adınızı ve Soyadınızı girmek zorunludur!'),
  password: yup
    .string()
    .matches(/\w*[a-z]\w*/, 'Şifre bir küçük harf içermelidir.')
    .matches(/\w*[A-Z]\w*/, 'Şifre bir büyük harf içermelidir.')
    .matches(/\d/, 'Şifre bir sayı içermelidir.')
    .matches(
      /[!@#$%^&*()\-_"=+{}; :,<.>]/,
      'Şifre bir özel karakter içermelidir.',
    )
    .min(8, ({min}) => `Şifreniz en az ${min} karakter olmalı`)
    .required('Şifre alanı zorunlu!'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Şifreler uyuşmuyor!')
    .required('Şifre tekrar alanı zorunlu!'),
});

const SignUp = ({navigation}) => {
  const [profilePic, setProfilPic] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleImage = async () => {
    try {
      const result = await launchCamera({
        mediaType: 'photo',
        quality: 1,
        saveToPhotos: true,
      });
      setProfilPic(result.assets[0].uri);
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleImageLibrary = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 1,
      });
      setProfilPic(result.assets[0].uri);
    } catch (error) {
      console.log(error.message);
    }
  };

  const submitStorageImage = async () => {
    const uploadUri = profilePic;
    const fileName = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    try {
      const ref = storage().ref(`image/profilePic/${fileName}`);

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

  const handleFormSubmit = formValues => {
    if (formValues.password !== formValues.confirmPassword) {
      Alert.alert('pinti', 'Şifreler uyuşmuyor!');
      return;
    }

    if (profilePic.length < 1) {
      Alert.alert('pinti', 'Profil fotoğrafı yükleyin!');
      return;
    }

    auth()
      .createUserWithEmailAndPassword(
        formValues.email,
        formValues.confirmPassword,
      )
      .then(userCredentials => {
        setLoading(true);

        if (userCredentials.user) {
          submitStorageImage().then(downloadUrl => {
            userCredentials.user
              .updateProfile({
                displayName: formValues.displayName,
                emailVerified: true,
                photoURL: downloadUrl,
              })
              .then(s => {
                firestore()
                  .collection('users')
                  .doc(auth().currentUser.uid)
                  .set({
                    name: formValues.displayName,
                    email: formValues.email,
                    userImg: downloadUrl,
                  });
                Alert.alert('pinti', 'Kullanıcı oluşturuldu!');

                setLoading(false);
                navigation.navigate('LoginScreen');
              })
              .catch(err => {
                console.log(err.message);
              });
          });
        }
      })
      .catch(err => {
        const message = authErrorMessageParser(err.code);
        Alert.alert(message);
        setLoading(false);
      });
  };
  const handleBack = () => {
    navigation.goBack();
  };
  return (
    <Background>
      <ScrollView>
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
        <View style={styles.container}>
          <View style={styles.logo_container}>
            <Image
              source={require('../../../assets/logo.png')}
              style={styles.logo}
            />
          </View>
          <Text style={styles.title}>Üye Ol</Text>
          <Formik
            validationSchema={signUpValidationSchema}
            initialValues={{
              email: '',
              password: '',
              confirmPassword: '',
              displayName: '',
            }}
            onSubmit={handleFormSubmit}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
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

                <Input
                  placeholder="E-mail"
                  onChangeText={handleChange('email')}
                  value={values.email}
                  keyboardType="email-address"
                  onBlur={handleBlur('email')}
                />
                {errors.email && touched.email && (
                  <Text style={{fontSize: 10, color: 'red'}}>
                    {errors.email}
                  </Text>
                )}
                <Input
                  placeholder="Şifre"
                  onChangeText={handleChange('password')}
                  value={values.password}
                  onBlur={handleBlur('password')}
                  isSecure
                />
                {errors.password && touched.password && (
                  <Text style={{fontSize: 10, color: 'red'}}>
                    {errors.password}
                  </Text>
                )}
                <Input
                  placeholder="Şifrenizi Tekrar Girin"
                  onChangeText={handleChange('confirmPassword')}
                  value={values.confirmPassword}
                  onBlur={handleBlur('confirmPassword')}
                  isSecure
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <Text style={{fontSize: 10, color: 'red'}}>
                    {errors.confirmPassword}
                  </Text>
                )}
                <Input
                  placeholder="Adınızı Soyadınızı Girin"
                  onChangeText={handleChange('displayName')}
                  value={values.displayName}
                  onBlur={handleBlur('displayName')}
                />
                {errors.displayName && touched.displayName && (
                  <Text style={{fontSize: 10, color: 'red'}}>
                    {errors.displayName}
                  </Text>
                )}

                <View style={styles.button_container}>
                  <Button
                    text="Kayıt Ol"
                    onPress={handleSubmit}
                    loading={loading}
                  />
                </View>
              </>
            )}
          </Formik>
          <View style={styles.button_inner_container}>
            <Button text="Geri" onPress={handleBack} />
          </View>
        </View>
      </ScrollView>
    </Background>
  );
};

export default SignUp;
