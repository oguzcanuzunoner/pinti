import {Dimensions, StyleSheet} from 'react-native';
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEFEFF',
  },

  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'black',
    margin: 10,
  },
  text: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
    margin: 10,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEFEFF',
    borderRadius: 20,
    width: Dimensions.get('window').width,
  },
  searchItem: {
    padding: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width / 8 *1, 
  },
  inputItem: {
    width: Dimensions.get('window').width / 7 *5, 
    padding: 0,
    margin: 0
  },
  addItem: {
    width: Dimensions.get('window').width / 7 *1.2, 

  },
  top_bar_btn: {
    width: 'auto',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 6,
    height: 'auto',
    padding: 10,
    backgroundColor: '#F9A84D',
    marginRight: 10,
    justifyContent:'center',
    alignItems:'center'
  },
  top_bar_icon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
});
