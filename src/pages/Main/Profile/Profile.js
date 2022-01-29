import React, {useState} from 'react';
import {
  Text,
  View,
  Image,
  Alert,
  Modal,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import styles from './Profile.style';
import Background from '../../../components/Background';
import Button from '../../../components/Button';
import Input from '../../../components/Input';

import {launchImageLibrary, launchCamera} from 'react-native-image-picker';

import {Formik} from 'formik';
import * as yup from 'yup';

import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

const updateValidationSchema = yup.object().shape({
  currentPassword: yup
    .string()
    .min(8, ({min}) => `Parolanız en az ${min} karakter olmalı`)
    .required('Şu an ki parolanızı giriniz!'),
  newPassword: yup
    .string()
    .min(8, ({min}) => `Parolanız en az ${min} karakter olmalı`)
    .required('Parola alanı zorunlu!'),
  repassword: yup
    .string()
    .oneOf([yup.ref('newPassword')], 'Şifreler uyuşmuyor!')
    .required('Şifre tekrar alanı zorunlu!'),
});

const Profile = ({navigation}) => {
  const [profilePic, setProfilPic] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const user = auth().currentUser;

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

  const deleteFromFirebase = url => {
    const pictureRef = storage().refFromURL(url);

    pictureRef
      .delete()
      .then(() => {
        console.log('fotoğraf silindi');
      })
      .catch(err => {
        console.log(err);
      });
  };

  const updateImage = () => {
    if (profilePic !== null) {
      const profilPicFirebaseUrl = user.photoURL;
      deleteFromFirebase(profilPicFirebaseUrl);
      submitStorageImage().then(downloadUrl => {
        user.updateProfile({
          photoURL: downloadUrl,
        });
        firestore()
          .collection('users')
          .doc(user.uid)
          .update({
            userImg: downloadUrl,
          })
          .then(() => {
            console.log('User updated!');
          });
        Alert.alert('pinti', 'Güncelleme Başarılı!');
        setProfilPic(null);
      });
    } else {
      Alert.alert('pinti', 'Herhangi bir fotoğraf güncellemesi yok.');
    }
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const signOut = () => {
    auth()
      .signOut()
      .then(() => {
        navigation.navigate('WelcomeStack', {screen: 'LoginScreen'});
      })
      .catch(error => {
        console.log(error);
      });
  };

  const reauthenticate = async currentPassword => {
    const cred = await auth.EmailAuthProvider.credential(
      user.email,
      currentPassword,
    );
    return user.reauthenticateWithCredential(cred);
  };

  const handleFormSubmit = formValues => {
    if (formValues.newPassword !== formValues.repassword) {
      Alert.alert('pinti', 'Şifreler uyuşmuyor!');
      return;
    }

    if (
      formValues.currentPassword !== '' ||
      formValues.currentPassword !== null ||
      formValues.repassword !== '' ||
      formValues.repassword !== null
    ) {
      reauthenticate(formValues.currentPassword)
        .then(() => {
          user
            .updatePassword(formValues.repassword)
            .then(() => {
              Alert.alert('Şifre başarıyla değişti');
            })
            .catch(error => {
              console.log(error.message);
            });
        })
        .catch(err => {
          console.log(err.message);
        });
    }
  };

  const deleteAccount = () => {
    Alert.alert('pinti', 'Hesabı Silmek İstediğine Emin Misin?', [
      {
        text: 'Hayır',
        onPress: () => {
          return;
        },
        style: 'cancel',
      },
      {
        text: 'Evet',
        onPress: async () => {
          user
            .delete()
            .then(function () {
              Alert.alert('pinti', 'Kullanıcı başarıyla silindi.');
              navigation.navigate('WelcomeStack', 'LoginScreen');
            })
            .catch(function (error) {
              if (error.code === 'auth/requires-recent-login') {
                Alert.alert(
                  'pinti',
                  'Yeniden oturum açın ve sonra tekrar deneyin!',
                );
              }
            });
        },
      },
    ]);
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
              onPress={updateImage}>
              <Text style={styles.textStyle}>Güncelle</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Kapat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.logo_container}>
            <TouchableWithoutFeedback onPress={openModal}>
              <Image source={{uri: user.photoURL}} style={styles.profile_pic} />
            </TouchableWithoutFeedback>
          </View>
          <Text style={styles.name}>{user.displayName}</Text>
          <Text style={styles.comment}>
            Merhaba {user.displayName}, profil sayfandan şifreni değiştirebilir
            veya hesabını kalıcı olarak kapatabilirsin.
          </Text>

          <Formik
            validationSchema={updateValidationSchema}
            initialValues={{
              newPassword: '',
              repassword: '',
              currentPassword: '',
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
                <Input
                  placeholder="Güncel Parola"
                  onChangeText={handleChange('currentPassword')}
                  value={values.currentPassword}
                  onBlur={handleBlur('currentPassword')}
                  isSecure
                />
                {errors.currentPassword && touched.currentPassword && (
                  <Text style={{fontSize: 10, color: 'red'}}>
                    {errors.currentPassword}
                  </Text>
                )}
                <Input
                  placeholder="Parola"
                  onChangeText={handleChange('newPassword')}
                  value={values.newPassword}
                  onBlur={handleBlur('password')}
                  isSecure
                />
                {errors.newPassword && touched.newPassword && (
                  <Text style={{fontSize: 10, color: 'red'}}>
                    {errors.newPassword}
                  </Text>
                )}
                <Input
                  placeholder="Parola Tekrar"
                  onChangeText={handleChange('repassword')}
                  value={values.repassword}
                  onBlur={handleBlur('repassword')}
                  isSecure
                />
                {errors.repassword && touched.repassword && (
                  <Text style={{fontSize: 10, color: 'red'}}>
                    {errors.repassword}
                  </Text>
                )}
                <View style={styles.divider} />
                <View style={styles.button_container}>
                  <Button
                    text="Parolayı kaydet"
                    theme="secondary"
                    onPress={handleSubmit}
                  />

                  <Button
                    text="Hesabı Sil"
                    theme="danger"
                    onPress={deleteAccount}
                  />
                  <Button text="Çıkış Yap" onPress={signOut} />
                </View>
              </>
            )}
          </Formik>
        </View>
      </ScrollView>
    </Background>
  );
};

export default Profile;
