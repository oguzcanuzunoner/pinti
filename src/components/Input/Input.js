import React from 'react';
import {ProgressViewIOSComponent, TextInput, View} from 'react-native';
import styles from './Input.style';

const Input = ({
  placeholder,
  value,
  onChangeText,
  iconName,
  isSecure,
  keyboardType,
  onBlur,
  autoCapitalize,
  autoCorrect,
  clearButtonMode,
  placeholderTextColor,
  multiline,
  theme = 'primary',
}) => {
  return (
    <View style={styles[theme].container}>
      <TextInput
        style={styles[theme].input}
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
        secureTextEntry={isSecure}
        keyboardType={keyboardType}
        onBlur={onBlur}
        autoCapitalize={autoCapitalize}
        autoCorrect={autoCorrect}
        clearButtonMode={clearButtonMode}
        placeholderTextColor={"#95989A"}
        multiline={multiline}
      />
    </View>
  );
};

export default Input;
