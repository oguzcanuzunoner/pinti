import {StyleSheet, Dimensions} from 'react-native';
import colors from '../../../styles/colors';
export default StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
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
    height: Dimensions.get('window').height / 4,
    width: Dimensions.get('window').width - 40,
    resizeMode: 'contain',
    marginBottom: 40,
  },
  go_back: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF6464',
    textAlign: 'left',
    margin: 20,
  },
  input_label: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'left',
    margin: 10,
  },
  button_container: {
    flex: 1,
    marginBottom: 10,
    marginTop: 40,
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
  currency_input: {
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderRadius: 5,
    flexDirection: 'row',
    height: 'auto',
    borderColor: '#BBBBBB',
    backgroundColor: 'white',
    color: '#95989A',
  },
});
