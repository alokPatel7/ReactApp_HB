import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Text,
  FlatList,
  View,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const SharedExpenses = (props) => {
  const navigation = useNavigation();
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
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            navigation.navigate('additem');
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

export default SharedExpenses;
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
});
