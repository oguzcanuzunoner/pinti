import React from 'react';
import LottieView from 'lottie-react-native';

const Error = () => {
  return (
    <LottieView source={require('../../assets/error.json')} autoPlay={true} />
  );
};

export default Error;
