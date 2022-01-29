import React from 'react';
import {ImageBackground, SafeAreaView} from 'react-native';
import styles from './Background.style';

const Background = ({children}) => {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../../assets/background.png')}
        style={styles.image}>
        {children}
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Background;
