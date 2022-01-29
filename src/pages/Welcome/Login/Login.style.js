import {StyleSheet, Dimensions} from 'react-native';
export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  logo_container: {
    margin: 30,
    width: Dimensions.get('window').width / 4,
    height: Dimensions.get('window').height / 4,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  logo: {
    resizeMode: 'contain',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
    margin: 10,
  },
  button_container: {
    flex: 1,
    width: Dimensions.get('window').width / 1.5,
    height: Dimensions.get('window').height / 3,
  },
});
