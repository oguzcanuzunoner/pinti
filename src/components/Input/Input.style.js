import {StyleSheet, Platform} from 'react-native';
import colors from '../../styles/colors';

const base_style = StyleSheet.create({
  container: {
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderRadius: 5,
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    padding: Platform.OS === 'android' ? 0 : 5,
  },
});

export default {
  primary: StyleSheet.create({
    ...base_style,
    container: {
      ...base_style.container,
      borderColor: '#BBBBBB',
      backgroundColor: 'white',
    },
    input: {
      ...base_style.input,
      color: '#000',
    },
  }),

  secondary: StyleSheet.create({
    ...base_style,
    container: {
      ...base_style.container,
      backgroundColor: '#F9A84D',
      borderColor: '#FF9012',
      borderWidth: 1,
    },
    input: {
      ...base_style.input,
      color: '#FEFEFF',
    },
  }),
};
