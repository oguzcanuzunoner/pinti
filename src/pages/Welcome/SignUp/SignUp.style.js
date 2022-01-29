import {StyleSheet, Dimensions} from 'react-native';
import colors from '../../../styles/colors';
export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  logo_container: {
    margin: 25,
    width: Dimensions.get('window').width / 4,
    height: Dimensions.get('window').height / 4,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  logo: {
    resizeMode: 'contain',
  },
  profile_pic: {
    height: 100,
    width: 200,
    borderRadius: 200,
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

    marginBottom: 10,
  },
  button_inner_container: {
    flex: 1,
    marginBottom: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    margin: 5,
    elevation: 2,
  },

  buttonClose: {
    backgroundColor: colors.darkgreen,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
