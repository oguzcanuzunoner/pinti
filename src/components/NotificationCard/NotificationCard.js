import React from 'react';
import styles from './NotificationCard.style';
import {View, Text, Image, ScrollView} from 'react-native';

const NotificationCard = props => {
  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <View style={styles.type}>
          <Image source={props.notificationTypeImage}></Image>
        </View>
        <View style={styles.message}>
          <View>
            <Text style={styles.text}>{props.productName}</Text>
          </View>
          <View>
            <Text style={styles.marketName}>{props.marketName}</Text>
          </View>
        </View>
        <View style={styles.messageDescription}>
          <Text style={styles.messageDescriptionText}>{props.message}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default NotificationCard;
