import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  Alert,
  TextInput,
  Button,
} from 'react-native';
// import DatePicker from 'react-native-datepicker';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {AddItem} from '../../services/firebaseCRUD';

class HbForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      mode: 'date',
      show: false,
      price: '',
      itemdesc: '',
      selectItem: '',
      ItemId: this.props?.route?.params,
    };
    // console.warn(this.state.ItemId?.params?.itemid);
  }

  handleOnChangeText = (value) => {
    // console.log('this is type', /^\d+$/.test(this.state.price));
    if (!/^\d+$/.test(this.state.price)) {
      console.log('Invalid Ammount entered');
    }
    // console.log('this is price', this.state);
  };
  onChange = (event, selectedDate) => {
    //     const currentDate = selectedDate || date;
    //     setShow(Platform.OS === 'ios');
    //     setDate(currentDate);
  };

  showMode = (currentMode) => {
    //     setShow(true);
    //     setMode(currentMode);
  };

  showDatepicker = () => {
    // showMode('date');
  };
  showTimepicker = () => {
    this.setState({show: true});
  };
  onSubmit = async () => {
    console.log('called');
    await AddItem(this.state)
      .then((res) => {
        console.log('this is add res', res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <KeyboardAwareScrollView>
        <View style={style.conatiner}>
          <View style={style.content}>
            <Text style={{textAlign: 'center', marginBottom: 16, fontSize: 25}}>
              Add Item
            </Text>
            <View style={style.row}>
              <Picker
                selectedValue={this.state.selectItem}
                onValueChange={(value) => {
                  this.setState({selectItem: value});
                }}
                style={{
                  ...style.inputfield,
                  height: 50,
                  backgroundColor: '#fff',
                  marginBottom: 10,
                }}>
                <Picker.Item label="Select Expenses Type" value="null" />
                <Picker.Item label="Personal" value="pesonal" />
                <Picker.Item label="Shared" value="shared" />
              </Picker>

              <TextInput
                autoCompleteType="off"
                autoFocus={true}
                underlineColorAndroid="transparent"
                placeholder="Item Price"
                placeholderTextColor="#007FFF"
                keyboardType="number-pad"
                onChangeText={(value) => {
                  this.setState({price: value});
                  this.handleOnChangeText();
                }}
                style={style.inputfield}
              />
              <TextInput
                autoCompleteType="off"
                underlineColorAndroid="transparent"
                placeholder="Item Descriptions"
                placeholderTextColor="#007FFF"
                keyboardType="default"
                onChangeText={(value) => {
                  this.setState({itemdesc: value});
                }}
                style={style.inputfield}
              />

              <View>
                {/* <Button
                  onPress={() => this.showTimepicker()}
                  title="Show Date picker!"
                /> */}
                <Text style={{fontSize: 20, color: 'red'}}>
                  {this.state.date.toDateString() == 'Invalid Date'
                    ? new Date().toUTCString().slice(0, 16)
                    : this.state.date.toDateString()}
                  &nbsp;&nbsp;&nbsp;
                  {/* {new Date(this.state.date).toUTCString().slice(0, 16)} */}
                </Text>
                <Text
                  style={{
                    fontSize: 17,
                    color: '#000',
                    textDecorationLine: 'underline',
                    textDecorationStyle: 'solid',
                    fontStyle: 'italic',
                  }}
                  onPress={() => this.showTimepicker()}>
                  Change date
                </Text>
              </View>
              {this.state.show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={this.state.date}
                  mode={this.state.mode}
                  is24Hour={true}
                  display="calendar"
                  onChange={(val) => {
                    console.log('date', val);
                    if (val.nativeEvent.timestamp != undefined) {
                      this.setState({
                        date: new Date(val.nativeEvent.timestamp),
                      });
                    } else {
                      this.setState({
                        date: new Date(),
                      });
                    }
                    this.setState({show: false});
                  }}
                />
              )}
            </View>
            <View style={style.actionButton}>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.pop();
                }}
                style={style.TouchOpacity}>
                <Text
                  style={{
                    fontSize: 20,
                    textAlign: 'center',
                  }}>
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.onSubmit()}
                style={{...style.TouchOpacity, backgroundColor: '#1fde7b'}}>
                <Text
                  style={{
                    fontSize: 20,
                    textAlign: 'center',
                  }}>
                  Save
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

export default HbForm;

const style = StyleSheet.create({
  conatiner: {
    flex: 1,
    // backgroundColor: 'red',
    paddingHorizontal: 10,
  },
  content: {
    // backgroundColor: 'green',
    flex: 0.9,
    marginTop: 20,
    padding: 10,
  },
  textfont: {
    fontSize: 25,
  },
  inputfield: {
    backgroundColor: '#fff',
    // borderWidth: 1,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
    fontSize: 17,
    paddingHorizontal: 10,
    color: '#000',
  },
  row: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  actionButton: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    paddingHorizontal: 18,
  },
  TouchOpacity: {
    padding: 10,
    backgroundColor: '#fff',
    flex: 0.7,
    // width: 'auto',
    borderRadius: 10,
  },
});

{
  //   /* <View
  //   style={{
  //     backgroundColor: '#fff',
  //     marginTop: -300,
  //   }}>
  //   <Text></Text>
  //   <View style={style.row}>
  //     <Text style={{...style.textfont, flex: 0.2}}>Text </Text>
  //     <TextInput style={{...style.textfont, flex: 1}} />
  //   </View>
  // </View>; */
}
