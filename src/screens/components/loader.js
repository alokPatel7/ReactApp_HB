import React, {Component} from 'react';
import {View, Text, ActivityIndicator, Modal, StyleSheet} from 'react-native';
import {Swing} from 'react-native-animated-spinkit';
class Hbloader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Modal>
        <View style={styles.container}>
          <View style={styles.modelbox}>
            <Swing size={150} color="#94979c" />
            <Text style={styles.text}>Loading...</Text>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#edf0f5',
    flex: 1,
    justifyContent: 'center',
  },
  modelbox: {
    alignSelf: 'center',
    justifyContent: 'space-around',
  },
  text: {
    fontSize: 32,
    paddingTop: 15,
    fontFamily: 'sans-serif',
    fontWeight: '200',
    color: '#000',
    paddingLeft: 10,
    letterSpacing: 4,
  },
});

export default Hbloader;
