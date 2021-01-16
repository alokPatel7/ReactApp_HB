import {Picker} from '@react-native-picker/picker';
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import auth from '@react-native-firebase/auth';
import Dialog from 'react-native-dialog';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

class HbSignup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      isShowDialog: false,
    };
  }
  handleSubmit = async () => {
    let regx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (regx.test(this.state.email)) {
      this.props.navigation.navigate('password', {
        email: this.state.email,
      });
    } else {
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
              <Text style={{fontSize: 25}}>Welcome to HisabBook...</Text>
            </View>
            <Text style={style.hintText}>
              Enter your email id to get started
            </Text>
            <View style={style.inputContainer}>
              <TextInput
                style={style.ContactNumber}
                keyboardType="email-address"
                placeholder="Enter email address"
                placeholderTextColor="#000"
                onChangeText={(val) => {
                  this.setState({email: val});
                }}
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                this.handleSubmit();
              }}
              activeOpacity={0.6}
              style={style.actionButton}>
              <Text style={{fontSize: 25, color: '#fff'}}>Next</Text>
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
            <View style={{alignItems: 'center'}}>
              <Text style={{fontSize: 18, color: '#6f7580'}}>
                By clicking Next, you agree to our
              </Text>
              <Text style={{fontSize: 18, color: '#000'}}>
                Terms & Conditions
                <Text style={{fontSize: 18, color: '#6f7580'}}> and </Text>
                <Text> Privacy Policy</Text>
              </Text>
            </View>
            <View style={style.dialogBox}>
              <Dialog.Container visible={this.state.isShowDialog}>
                <Dialog.Title style={{color: 'red'}}>Error</Dialog.Title>
                <Dialog.Description style={{fontSize: 18}}>
                  Invalid Email Id
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

export default HbSignup;

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoImage: {
    marginTop: 50,
    width: '50%',
    height: 140,
    alignSelf: 'center',
  },
  welcomeMsg: {
    paddingTop: 30,
    alignSelf: 'center',
  },
  hintText: {
    color: '#6f7580',
    alignSelf: 'center',
    paddingBottom: 30,
    fontSize: 18,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  countryCode: {
    // flex: 0.1,
    // paddingLeft: 10,
    // paddingRight: 10,
    // fontSize: 30,
    // borderColor: '#000',
    // color: '#000',
  },
  ContactNumber: {
    flex: 0.9,
    paddingLeft: 10,
    paddingRight: 15,
    fontSize: 20,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#000',
    color: '#000',
    textAlign: 'center',
    marginBottom: 10,
  },
  actionButton: {
    backgroundColor: '#57a157',
    height: 50,
    marginHorizontal: 16,
    marginVertical: 4,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dialogBox: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
