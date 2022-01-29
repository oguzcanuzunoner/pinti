import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
   
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
        padding: 10,
      },
      list_bar: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
      },
      list_body: {
        flex: 1,
        flexDirection: 'row',
        width: 'auto' ,
    
      },
      list_text: {
        fontSize: 15,
        lineHeight: 25,
        color: '#95989A'
      },
      list_item: {
        minWidth: Dimensions.get('window').width /7*1 ,
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
        color: '#000'
      },

});
