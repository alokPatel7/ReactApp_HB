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

class HbForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      mode: '',
      show: false,
      price: '',
      itemdesc: '',
      selectItem: '',
    };
  }

  handleOnChangeText = (value) => {
    //     console.log('this is type', /^\d+$/.test(price));
    //     if (!/^\d+$/.test(price)) {
    //       alert('Invalid Ammount entered');
    //     }
    //     getDate();
    //     console.log('this is price', price, itemdesc, selectItem, date);
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
    //     showMode('date');
  };
  render() {
    return (
      <>
        <View style={style.conatiner}>
          <View style={style.content}>
            <Text style={{textAlign: 'center', marginBottom: 16, fontSize: 25}}>
              Add Item
            </Text>
            <View style={style.row}>
              <Picker
                // mode="dropdown"
                selectedValue={this.state.selectItem}
                onValueChange={(value) => {
                  //   setSelectItem(value);
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
                keyboardType="numeric"
                onChangeText={(value) => {
                  //   setPrice(value);
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
                  //   setItemDesc(value);
                }}
                style={style.inputfield}
              />
              {/* <DatePicker
              style={{width: 'auto', marginTop: 10}}
              date={date}
              mode="date"
              placeholder="select date"
              format="DD-MM-YYYY"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0,
                },
              }}
              onDateChange={(date) => {
                setLastDate(date);
              }}
            /> */}
              <View>
                <Button
                  onPress={() => this.showDatepicker()}
                  title="Show date picker!"
                />
              </View>
              <View>
                {/* <Button onPress={showTimepicker} title="Show time picker!" /> */}
                {/* <Text>{date.toDateString()}</Text> */}
              </View>
              {this.state.show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={this.state.date}
                  mode={mode}
                  is24Hour={true}
                  display="default"
                  onChange={onChange}
                />
              )}
            </View>
            <View style={style.actionButton}>
              <TouchableOpacity style={style.TouchOpacity}>
                <Text
                  style={{
                    fontSize: 20,
                    textAlign: 'center',
                  }}>
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{...style.TouchOpacity, backgroundColor: '#1fde7b'}}>
                <Text
                  onPress={() => {
                    this.handleOnChangeText();
                  }}
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
      </>
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
    paddingHorizontal: 10,
  },
  TouchOpacity: {
    padding: 10,
    backgroundColor: '#fff',
    // flex: ,
    width: 140,
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
