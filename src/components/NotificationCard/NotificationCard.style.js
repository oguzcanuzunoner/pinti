import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
   
    scrollView: {
        width: Dimensions.get('window').width - 20,
        marginBottom: 15,
        marginLeft: 10,
        marginRight: 10,
    },

    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        backgroundColor: 'white',
        height: 80,
        marginTop: 10,
        marginBottom: 10,
        borderColor: "#F4F4F4",
        borderWidth: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 2,
        borderRadius: 22,
    },
    type: {
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center'
    },
    message: {
        width: 100,
        height: 80,
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    messageDescription: {
        width: 150,
        height: 80,
        justifyContent: 'center',
        alignItems: 'flex-start',
        fontSize: 8,
        marginRight:10
    },
    product: {
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center'
    },
    marketName:{
        textAlign: 'left',
        fontSize: 11,
        fontWeight: 'bold',
        color: '#95989A',
    },
    text: {
        textAlign: 'left',
        fontSize: 13,
        fontWeight: 'bold',
        color: '#000'
    },
    messageDescriptionText:{
        textAlign: 'left',
        fontSize: 12,
        color: '#000'
    }

});
