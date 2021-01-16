import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Text,
  FlatList,
  View,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  Modal,
  TouchableHighlight,
} from 'react-native';
import HbForm from '../../components/Hb-Form';

const PersonalExpenses = (props) => {
  const navigation = useNavigation();
  // const [modeltoggle, setModeVisible] = useState(false);

  // React.useLayoutEffect(() => {
  //   navigation.setOptions({headerTitle: 'hhh'});
  // }, []);
  const mockData = [
    {
      id: '1',
      text: 'Expo 💙 ',
    },
    {
      id: '2',
      text: 'Expo 💙 ',
    },
  ];
  return (
    <>
      <View style={style.container}>
        <FlatList
          data={mockData}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => (
            <View style={{borderRadius: 10, backgroundColor: '#fff'}}>
              <TouchableOpacity style={style.flatlist}>
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
                <Text style={{flex: 1, fontSize: 18}}>
                  kjhskdkgk shdkfjsjdjkdjkhdhsakjd hdfjhjajhsad kaskjdsajd
                  ahsdloweqnlANS AHLIHjadkjsakjdhjekjwhk jhalshalshdsal
                  dsahdahldhaldhasl kdlnalsdlsalkdhal
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  height: 15,
                  backgroundColor: '#e6e6ff',
                  flex: 1,
                }}
              />
            </View>
          )}
        />
        {/* <Modal
          animationType="slide"
          transparent={true}
          visible={modeltoggle}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <PopUpFormModal />
          <View style={style.actionButton}>
            <TouchableOpacity
              activeOpacity={0.5}
              style={[style.button, {backgroundColor: '#fff'}]}
              onPress={() => {
                setModeVisible(!modeltoggle);
              }}>
              <Text style={style.textStyle}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.5}
              style={[style.button, {backgroundColor: '#1fde7b'}]}
              onPress={() => {
                setModeVisible(!modeltoggle);
              }}>
              <Text style={style.textStyle}>Save</Text>
            </TouchableOpacity>
          </View>
        </Modal> */}
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            props.navigation.navigate('additem');
          }}
          style={style.TouchableOpacityStyle}>
          <Image
            source={require('../../../../public/images/add-round.png')}
            style={style.FloatingButtonStyle}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default PersonalExpenses;

const style = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    backgroundColor: '#e6e6ff',
  },
  listrow: {
    flexDirection: 'row',
  },
  flatlist: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
  },
  actionButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  button: {
    width: '50%',
    padding: 20,
  },
  textStyle: {
    fontSize: 20,
    textAlign: 'center',
  },
  pricelabel: {
    paddingRight: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
  },
  TouchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 0,
    bottom: 15,
  },

  FloatingButtonStyle: {
    resizeMode: 'contain',
    width: 60,
    height: 60,
  },
  openButton: {
    padding: 20,
  },
});
