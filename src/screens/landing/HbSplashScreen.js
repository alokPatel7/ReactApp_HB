import React, {Component} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AddItem} from '../../services/AuthServices';

class HbSplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    // await AddItem().then(() => {
    //   console.log('User added!');
    // });

    setTimeout(async () => {
      let usertoken = await AsyncStorage.getItem('usertoken');
      if (usertoken == null) {
        this.props.navigation.replace('login');
      } else {
        this.props.navigation.replace('dashboard');
      }
    }, 3000);
  }
  render() {
    return (
      <>
        <ImageBackground
          style={style.container}
          source={require('../../../public/images/s2.png')}>
          <Image
            style={style.logoImage}
            source={require('../../../public/images/logo.jpg')}
          />
          <View>
            <Text style={style.logo}>HisabBook</Text>
          </View>
          <ActivityIndicator size="large" color="#fff" />
        </ImageBackground>
      </>
    );
  }
}

export default HbSplashScreen;

const style = StyleSheet.create({
  container: {flex: 1, alignItems: 'center'},
  logoImage: {
    width: '50%',
    marginTop: 150,
    height: 190,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  logo: {
    fontSize: 40,

    paddingVertical: 30,
    letterSpacing: 1.5,
    color: '#000',
  },
});
