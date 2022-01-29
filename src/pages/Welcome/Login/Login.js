import React, {useState} from 'react';
import {Text, View, Image, Alert} from 'react-native';
import styles from './Login.style';
import Background from '../../../components/Background';
import Button from '../../../components/Button';
import Input from '../../../components/Input';

import {Formik} from 'formik';
import * as yup from 'yup';

import auth from '@react-native-firebase/auth';
import authErrorMessageParser from '../../../utils/authErrorMessageParser';

const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Lütfen geçerli bir e-mail girin.')
    .required('E-mail alanı zorunlu!'),
  password: yup
    .string()
    .min(8, ({min}) => `Şifreniz en az ${min} karakter olmalı`)
    .required('Şifre alanı zorunlu!'),
});

const Login = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const handleSignUpPage = () => {
    navigation.navigate('SignUpScreen');
  };

  async function handleFormSubmit(formValues) {
    try {
      setLoading(true);
      await auth().signInWithEmailAndPassword(
        formValues.email,
        formValues.password,
      );
      navigation.navigate('MainStack', 'HomeScreen');
      setLoading(false);
    } catch (error) {
      Alert.alert(authErrorMessageParser(error.code));
      setLoading(false);
    }
  }

  return (
    <Background>
      <View style={styles.container}>
        <View style={styles.logo_container}>
          <Image
            source={require('../../../assets/logo.png')}
            style={styles.logo}
          />
        </View>
        <Text style={styles.title}>Hesabına Giriş Yap</Text>

        <Formik
          validationSchema={loginValidationSchema}
          initialValues={{email: '', password: ''}}
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
                placeholder="E-mail"
                onChangeText={handleChange('email')}
                value={values.email}
                keyboardType="email-address"
                onBlur={handleBlur('email')}
              />
              {errors.email && touched.email && (
                <Text style={{fontSize: 10, color: 'red'}}>{errors.email}</Text>
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
              <View style={styles.button_container}>
                <Button
                  text="Giriş Yap"
                  onPress={handleSubmit}
                  loading={loading}
                />
              </View>
            </>
          )}
        </Formik>
        <View style={styles.button_container}>
          <Button text="Kayıt Ol" onPress={handleSignUpPage} />
        </View>
      </View>
    </Background>
  );
};

export default Login;
