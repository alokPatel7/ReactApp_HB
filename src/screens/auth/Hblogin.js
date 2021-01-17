import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Dialog from 'react-native-dialog';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {AuthErrorMessage, LoginUser} from '../../services/AuthServices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

const Swidth = Dimensions.get('screen').width * 1;
const Sheight = Dimensions.get('screen').height * 0.0;

class HbLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      isShowDialog: false,
      errorMsg: '',
      Swidth: Dimensions.get('screen').width,
      Sheight: Dimensions.get('screen').height,
    };
    // const {width, height} = Dimensions.get('screen');
  }
  handleSubmit = async () => {
    let regx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (this.state.email.trim() != '' && this.state.password.trim() != '') {
      if (regx.test(this.state.email) == false) {
        console.log(this.state.email, this.state.password);
        this.setState({errorMsg: 'Invalid Email '});
        this.setState({isShowDialog: true});
      } else {
        try {
          LoginUser(this.state.email, this.state.password)
            .then(async (res) => {
              console.log('this is Login res', res.user.uid);
              await AsyncStorage.setItem('usertoken', res.user.uid);
              await AsyncStorage.getItem('usertoken');
              this.props.navigation.navigate('dashboard', {uid: res.user.uid});
            })
            .catch((err) => {
              let errMessage = err.code.split('/')[1].split('-').join(' ');
              if (errMessage == 'unknown') {
                this.setState({errorMsg: 'No internet connection'});
                this.setState({isShowDialog: true});
              } else {
                this.setState({errorMsg: errMessage});
                this.setState({isShowDialog: true});
              }
            });
          await firestore()
            .collection('Users')
            .add({
              name: 'Ada Lovelace',
              age: 30,
            })
            .then((res) => {
              console.log('this is storage', res);
            });
        } catch (err) {
          console.log('this is err', err);
        }
      }
    } else {
      this.setState({errorMsg: 'Invalid Email or Password'});
      this.setState({isShowDialog: true});
    }
  };

  handleHide = () => {
    this.setState({isShowDialog: false});
  };
  render() {
    return (
      <>
        <KeyboardAwareScrollView>
          <View style={style.container}>
            <Image
              style={style.logoImage}
              source={require('../../../public/images/logo.jpg')}></Image>
            <View style={style.welcomeMsg}>
              <Text style={{fontSize: 25, marginBottom: 20}}>
                Welcome to HisabBook....
              </Text>
            </View>
            <View style={style.inputContainer}>
              <TextInput
                style={style.ContactNumber}
                keyboardType="default"
                placeholder="Email"
                placeholderTextColor="#000"
                onChangeText={(val) => {
                  this.setState({email: val});
                }}
              />
              <TextInput
                style={style.ContactNumber}
                secureTextEntry={true}
                keyboardType="default"
                textContentType="password"
                placeholderTextColor="#000"
                placeholder="Password"
                onChangeText={(val) => {
                  this.setState({password: val});
                }}
              />
            </View>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                this.handleSubmit();
              }}
              style={style.actionButton}>
              <Text style={{fontSize: 25, color: '#fff'}}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                this.props.navigation.navigate('signup');
              }}
              style={style.actionButton}>
              <Text style={{fontSize: 18, color: '#fff'}}>
                New user? Signup
              </Text>
            </TouchableOpacity>
            {/* <View style={{alignItems: 'center', marginVertical: 30}}></View> */}
            <View style={style.dialogBox}>
              <Dialog.Container visible={this.state.isShowDialog}>
                <Dialog.Title style={{color: 'red'}}>Error</Dialog.Title>
                <Dialog.Description style={{fontSize: 18}}>
                  {this.state.errorMsg}
                </Dialog.Description>
                <Dialog.Button
                  label="Ok"
                  onPress={() => {
                    this.handleHide();
                  }}
                />
              </Dialog.Container>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </>
    );
  }
}

export default HbLogin;

const style = StyleSheet.create({
  container: {
    flex: 1,
    //     alignItems: 'center',
  },
  logoImage: {
    marginTop: 50,
    width: '50%',
    height: 150,
    alignSelf: 'center',
  },
  welcomeMsg: {
    paddingTop: 30,
    alignSelf: 'center',
    marginBottom: 10,
  },
  hintText: {
    //     marginLeft: 20,
    color: '#6f7580',
    alignSelf: 'center',
    fontSize: 18,
  },
  inputContainer: {
    // flexDirection: 'row',
    paddingHorizontal: 20,
    // alignItems: 'center',?
    // justifyContent: 'space-evenly',
  },
  ContactNumber: {
    // flex: 0.9,
    // paddingHorizontal: 10,
    marginBottom: 10,
    fontSize: 20,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#000',
    color: '#000',
    //     alignItems: 'center',
    textAlign: 'center',
    // letterSpacing: 20,
    height: 50,
  },
  actionButton: {
    backgroundColor: '#57a157',
    height: 50,
    marginHorizontal: 16,
    marginTop: 15,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

//  try {
//    let isValidUser = AsyncStorage.setItem('userid', this.state.email).then(
//      (res) => {
//        console.log('this is async Storage res', res);
//      },
//    );
//  } catch (err) {
//    console.log('this is Async err', err);
//  }
