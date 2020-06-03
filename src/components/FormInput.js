import * as React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { TextInput } from 'react-native-paper';

const { width, height } = Dimensions.get('screen');

//...rest -> to let add other props later
export default function FormInput({ labelName, ...rest }) {
    return (
      <TextInput
        label={labelName}
        style={styles.input}
        numberOfLines={1}
        {...rest}
      />
    );
  }

  const styles = StyleSheet.create({
    input: {
      marginTop: 10,
      marginBottom: 10,
      width: width / 1.2,
      height: height / 15
    }
  });