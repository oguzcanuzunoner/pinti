import {StyleSheet, Dimensions} from 'react-native';
import colors from '../../../styles/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 100,
  },
  logo_container: {
    margin: 30,
    width: Dimensions.get('window').width / 4,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  profile_pic: {
    height: 100,
    width: 100,
    borderRadius: 200,
    borderColor: colors.darkgreen,
    borderWidth: 5,
  },
  name: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#3A3C3F',
    margin: 10,
  },
  comment: {
    fontSize: 19,
    fontWeight: 'normal',
    color: '#3A3C3F',
    margin: 10,
    textAlign: 'center',
  },
  button_container: {
    flex: 1,
    width: Dimensions.get('window').width,
  },
  divider: {
    backgroundColor: '#9FA5C0',
    height: 3,
    width: '80%',
    opacity: 0.4,
    margin: 10,
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
