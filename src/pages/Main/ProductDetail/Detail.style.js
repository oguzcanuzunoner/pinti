import {StyleSheet, Dimensions} from 'react-native';
import colors from '../../../styles/colors';

const deviceSize = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: deviceSize.width,
    height: deviceSize.height / 3,
    resizeMode: 'contain',
    backgroundColor: 'white',
  },
  body_container: {
    padding: 10,
    backgroundColor: '#fff',
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    borderColor: '#F4F4F4',
    borderWidth: 1,
    width: Dimensions.get('window').width,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 2,
    marginTop: -30,
  },

  title: {
    fontWeight: 'bold',
    fontSize: 25,
    textAlign: 'center',
    color: '#3E5481',
  },
  desc: {fontStyle: 'italic', marginVertical: 5},
  price: {fontWeight: 'bold', fontSize: 22, textAlign: 'right'},
  barcode_bar: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  history_bar: {
    flexDirection: 'row',
    alignItems: 'center',
    width: Dimensions.get('window').width,
    height: 100,
  },
  barcode: {
    width: (Dimensions.get('window').width / 5) * 3,
  },
  barcode_text: {
    backgroundColor: '#E3FFF8',
    borderRadius: 5,
    fontSize: 15,
    fontWeight: 'bold',
    padding: 10,
    textAlign: 'center',
    color: '#000',
  },
  last_price: {
    width: (Dimensions.get('window').width / 5) * 2 - 20,
    alignItems: 'flex-end',
  },
  price_text: {
    backgroundColor: '#E3FFF8',
    borderRadius: 5,
    fontSize: 15,
    fontWeight: 'bold',
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    textAlign: 'center',
    color: '#000',
  },
  user_image: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  user: {
    padding: 10,
    width: (Dimensions.get('window').width - 40) / 2,
  },
  user_text: {
    color: '#2E3E5C',
    fontSize: 18,
    fontWeight: 'bold',
  },
  date: {
    maxWidth: (Dimensions.get('window').width - 40) / 2,
    marginLeft: 'auto',
  },
  date_text: {
    alignSelf: 'flex-end',
    color: '#2E3E5C',
    fontSize: 18,
    fontWeight: 'bold',
    padding: 10,
  },
  divider: {
    backgroundColor: '#9FA5C0',
    height: 3,
    width: '95%',
    opacity: 0.4,
    margin: 10,
    marginTop: 0,
    marginBottom: 5,
  },
  sub_title: {
    color: '#3E5481',
    fontSize: 20,
    fontWeight: 'bold',
  },
  description: {
    color: '#9FA5C0',
    marginTop: 8,
    marginBottom: 8,

    fontSize: 17,
    letterSpacing: 0.5,
    lineHeight: 25,
  },
  price_history: {
    width: Dimensions.get('window').width / 2,
  },
  price_history_filter: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    width: Dimensions.get('window').width / 2 - 30,
  },
  filter_btn: {
    backgroundColor: '#F9A84D',
    padding: 10,
    borderRadius: 10,
  },
  user_image_sm: {
    width: 30,
    height: 30,
    borderRadius: 50,
  },
  user_sm: {
    padding: 10,
    width: (Dimensions.get('window').width / 2) * 1 + 20,
  },
  user_text_sm: {
    color: '#2E3E5C',
    fontSize: 15,
    fontWeight: 'bold',
    justifyContent: 'center',
  },
  list: {
    //marginBottom: 100
  },
  list_bar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  list_body: {
    flex: 1,
    flexDirection: 'row',
    width: 'auto',
  },
  list_text: {
    fontSize: 15,
    lineHeight: 25,
    color: '#95989A',
  },
  list_item: {
    minWidth: (Dimensions.get('window').width / 7) * 1,
    margin: 10,
    alignItems: 'center',
  },

  price_text_sm: {
    backgroundColor: '#E3FFF8',
    borderRadius: 5,
    fontSize: 15,
    fontWeight: 'bold',
    padding: 3,
    paddingLeft: 15,
    paddingRight: 15,
    textAlign: 'center',
    color: '#000',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    margin: 5,
    elevation: 2,
    width: 150,
    alignItems: 'center',
  },

  buttonClose: {
    backgroundColor: colors.darkgreen,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 22,
    marginBottom: 30,
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
  edit_product: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  edit_btn: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 10,
  },
  go_back: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  emptyLoading: {
    textAlign: 'center',
  },
});
