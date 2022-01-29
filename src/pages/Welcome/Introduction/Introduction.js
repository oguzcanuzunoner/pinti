import {Image} from 'react-native';
import React from 'react';

import Onboarding from 'react-native-onboarding-swiper';

const Introduction = ({navigation}) => {
  const pages = [
    {
      backgroundColor: '#fff',
      image: <Image source={require('../../../assets/Illustartion.png')} />,
      title: 'Sen Pinti Değilsin',
      subtitle: 'Sadece tutumlusun...',
    },
    {
      backgroundColor: '#fe6e58',
      image: <Image source={require('../../../assets/Illustartion2.png')} />,
      title: 'Sen Pinti Değilsin',
      subtitle: 'Sadece paranın değerini biliyorsun...',
    },
    {
      backgroundColor: '#f6f4f1',
      image: <Image source={require('../../../assets/Illustartion3.png')} />,
      title: 'Sen Pinti Değilsin',
      subtitle: 'Ama biz senin yerine pintilik yapıyoruz. 🙂',
    },
  ];
  const handleNavigation = () => {
    navigation.navigate('LoginScreen');
  };
  return (
    <Onboarding
      onDone={handleNavigation}
      nextLabel="İleri"
      skipLabel="Geç"
      skipToPage={2}
      pages={pages}
    />
  );
};

export default Introduction;
