import React, {useState} from 'react';
import {
  Text,
  FlatList,
  View,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  ScrollView,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Dialog from 'react-native-dialog';
import Hbloader from '../loader';

const Expenses = ({navigation}) => {
  const [isShowDialog, setIsShowDialog] = useState(false);
  const [loader, setLoader] = useState(true);

  const SampleFunction = () => {
    Alert.alert('Floating Button Clicked');
  };

  const handleDeleteCancel = () => {
    setIsShowDialog(false);
  };

  const handleDeleteConfirm = () => {
    setIsShowDialog(true);
  };
  const mockData = [
    {id: '1', text: 'Expo 💙'},
    {id: '2', text: 'is'},
    {id: '3', text: 'Awesome!'},
    {
      id: '4',
      text: 'D',
    },
    {id: '5', text: 'E'},
    {id: '6', text: 'F'},
    {id: '7', text: 'G'},
    {id: '8', text: 'H'},
    {id: '9', text: 'I'},
    {id: '10', text: 'J'},
    {id: '11', text: 'K'},
    {id: '12', text: 'L'},
    {id: '13', text: 'M'},
    {id: '14', text: 'N'},
    {id: '15', text: 'O'},
    {id: '16', text: 'P'},
    {id: '17', text: 'Q'},
    {id: '18', text: 'R'},
    {id: '19', text: 's'},
    {id: '20', text: 'T'},
    {id: '21', text: 'U'},
    {id: '22', text: 'V'},
    {id: '23', text: 'W'},
    {id: '24', text: 'X'},
    {id: '25', text: 'Y'},
    {id: '26', text: 'Z'},
  ];

  return (
    // <ScrollView>
    <View style={style.container}>
      <View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={mockData}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => (
            <View style={{backgroundColor: '#fff'}}>
              <View style={style.flatlist}>
                <View style={style.listrow}>
                  <Text
                    style={{
                      flex: 1,
                      fontSize: 20,
                      color: 'green',
                      fontWeight: 'bold',
                    }}>
                    {item.text}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                    }}>
                    <Text style={style.pricelabel}>2222222</Text>
                    <Text style={[style.pricelabel, {color: '#000'}]}>Rs.</Text>
                  </View>
                </View>
                <View style={style.listrow}>
                  <Text
                    numberOfLines={2}
                    ellipsizeMode="tail"
                    style={{
                      flex: 1,
                      color: '#000',
                      fontSize: 16,
                      letterSpacing: 1,
                      lineHeight: 25,
                    }}>
                    kjhskdkgk shdkfjsjdjkd jkhdhsakjd hdfjhjajhsad kaskjdsajd
                    ahsdloweqnlANS AHLIHjadkjsakjdhjekjwhk jhalshalshdsal
                    dsahdahldhaldhasl kdlnalsdlsalkdhal
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 10,
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('additem', {
                          params: {itemid: item.id},
                        });
                      }}
                      activeOpacity={0.6}
                      style={{...style.pricelabel}}>
                      <MaterialCommunityIcons
                        style={{...style.editbutton, color: 'green'}}
                        name="square-edit-outline"
                        size={30}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        handleDeleteConfirm();
                      }}
                      activeOpacity={0.6}
                      style={style.pricelabel}>
                      <MaterialCommunityIcons
                        style={{...style.editbutton, color: 'red'}}
                        name="delete"
                        size={30}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View
                style={{
                  height: 15,
                  backgroundColor: '#e6e6ff',
                }}
              />
            </View>
          )}
        />
        <View>
          <Dialog.Container visible={isShowDialog}>
            <Dialog.Title style={{color: 'red'}}>Delete</Dialog.Title>
            <Dialog.Description style={{fontSize: 18}}>
              Are you sure want to Delete this item.
            </Dialog.Description>
            <Dialog.Button
              label="Cancel"
              onPress={() => {
                handleDeleteCancel();
              }}
            />
            <Dialog.Button
              label="Confirm"
              onPress={() => {
                handleDeleteConfirm();
              }}
            />
          </Dialog.Container>
        </View>
      </View>
    </View>
    // </ScrollView>
  );
};

export default Expenses;

const style = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
  },
  listrow: {
    flexDirection: 'row',
    // borderRadius: 20,
  },
  flatlist: {
    // backgroundColor: 'red',
    // borderRadius: 20,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
  },
  pricelabel: {
    paddingRight: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
  },
  editbutton: {
    paddingVertical: 5,
    fontSize: 25,
  },
});
