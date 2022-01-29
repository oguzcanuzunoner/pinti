import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 4,
    padding: 5,
    borderColor: '#F4F4F4',
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  image: {
    width: 100,
    minHeight: 100,
    resizeMode: 'contain',
    backgroundColor: 'white',
  },
  body_container: {
    padding: 5,
    flex: 1,
    flexDirection: 'column',
  },
  title: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 15,
  },
  price: {
    color: '#95989A',
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
  },
});
