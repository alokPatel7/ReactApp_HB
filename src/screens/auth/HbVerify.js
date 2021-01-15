import {Picker} from '@react-native-picker/picker';
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
import {SignUp} from '../../services/AuthServices';
import AsyncStorage from '@react-native-async-storage/async-storage';

// const Swidth = Dimensions.get('screen').width * 0.1;
// const Sheight = Dimensions.get('screen').height * 0.1;
class HbVerify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.route.params.email,
      password: '',
      confirmPassword: '',
      isShowDialog: false,
      errorMsg: '',
    };
    // const {width, height} = Dimensions.get('screen');
  }
  handleSubmit = () => {
    if (
      this.state.password.trim() != '' &&
      this.state.confirmPassword.trim() != ''
    ) {
      if (this.state.password.trim() != this.state.confirmPassword.trim()) {
        this.setState({errorMsg: 'Password are not Match'});
        this.setState({isShowDialog: true});
      } else {
        try {
          SignUp(this.state.email, this.state.password)
            .then((res) => {
              this.props.navigation.navigate('login');
            })
            .catch((err) => {
              let errMessage = err.code.split('/')[1].split('-').join(' ');
              this.setState({errorMsg: errMessage});
              this.setState({isShowDialog: true});
            });
        } catch (err) {
          console.log('this is err', err);
        }
      }
    } else {
      this.setState({errorMsg: 'Invalid Password'});
      this.setState({isShowDialog: true});
    }
  };
  handleHide = () => {
    this.setState({isShowDialog: false});
  };

  render() {
    // const {email} = this.props.route.params;
    return (
      <>
        <View
          style={{
            ...style.container,
          }}>
          <Image
            style={style.logoImage}
            source={require('../../../public/images/logo.jpg')}></Image>
          <View style={style.welcomeMsg}>
            <Text style={{fontSize: 25}}>Set Password</Text>
          </View>
          <Text style={style.hintText}>Your email id: {this.state.email}</Text>
          <TouchableOpacity activeOpacity={0.7}>
            <Text
              style={{
                fontSize: 19,
                color: 'blue',
                paddingBottom: 15,
                textAlign: 'center',
              }}
              onPress={() => {
                this.props.navigation.navigate('signup');
              }}>
              Edit email
            </Text>
          </TouchableOpacity>
          <View style={style.inputContainer}>
            <TextInput
              style={style.ContactNumber}
              keyboardType="default"
              secureTextEntry={true}
              placeholder="Password"
              placeholderTextColor="#000"
              onChangeText={(val) => {
                this.setState({password: val});
              }}
            />
            <TextInput
              style={style.ContactNumber}
              keyboardType="default"
              secureTextEntry={true}
              placeholderTextColor="#000"
              placeholder="Confirm Password"
              onChangeText={(val) => {
                this.setState({confirmPassword: val});
              }}
            />
          </View>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => {
              this.handleSubmit();
            }}
            style={style.actionButton}>
            <Text style={{fontSize: 25, color: '#fff'}}>Submit</Text>
          </TouchableOpacity>
          <View style={{alignItems: 'center', marginVertical: 30}}></View>
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
      </>
    );
  }
}

export default HbVerify;

const style = StyleSheet.create({
  container: {
    // flex: 1,
    //     alignItems: 'center',
  },
  logoImage: {
    marginTop: 50,
    width: '50%',
    height: 180,
    alignSelf: 'center',
  },
  welcomeMsg: {
    paddingTop: 30,
    alignSelf: 'center',
    //     paddingHorizontal: 20,
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
    margin: 16,
    marginTop: 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
