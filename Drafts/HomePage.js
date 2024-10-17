import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import homeapi from '../Getapi/gethome';
import { TextInput } from 'react-native-gesture-handler';
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';

export default function HomePage({ navigation }) {
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [country, setCountry] = useState('');
  const [region, setRegion] = useState('');
  const [con, setCon] = useState('');
  const [health, setHealth] = useState('');

  const [dis, setDis] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.bubble}>
        <Text style={styles.text}>{'My information:'}</Text>
        <View style={styles.rowcontainer}>
          <View style={styles.textnbarcontainer}>
            <Text style={styles.question}>{'My Name:'}</Text>
            <TextInput
            style={styles.input}
            />
          </View>
          <View style={styles.textnbarcontainer}>
            <Text style={styles.question}>{'My Email:'}</Text>
            <TextInput
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            />
          </View>
        </View>
        <View style={styles.rowcontainer}>
          <View style={styles.textnbarcontainer_sec}>
            <Text style={styles.question}>{'My Gender:'}</Text>
            <TextInput
            value={gender}
            onChangeText={setGender}
            style={styles.input_sec}
            />
          </View>
          <View style={styles.textnbarcontainer_sec}>
            <Text style={styles.question}>{'My Age:'}</Text>
            <TextInput
            value={age}
            onChangeText={setAge}
            style={styles.input_sec}
            />
          </View>
          <View style={styles.textnbarcontainer_sec}>
            <Text style={styles.question}>{'My height:'}</Text>
            <TextInput
            value={height}
            onChangeText={setHeight}
            style={styles.input_sec}
            />
          </View>
          <View style={styles.textnbarcontainer_sec}>
            <Text style={styles.question}>{'My Weight:'}</Text>
            <TextInput
            value={weight}
            onChangeText={setWeight}
            style={styles.input_sec}
            />
          </View>
        </View>
        <View style={styles.rowcontainer}>
          <View style={styles.textnbarcontainer_thrd}>
            <Text style={styles.question}>{'My location:'}</Text>
            <CountryDropdown
            style={{width:'50%', height:'100%'}}
            value={country}
            onChange={(val) => setCountry(val)} />
            <RegionDropdown
            style={{width:'50%', height:'100%'}}
            country={country}
            value={region}
            onChange={(val) => setRegion(val)} />
          </View>
          <View style={styles.textnbarcontainer_thrd}>
            <Text style={styles.question}>{"Foods I don't eat:"}</Text>
            <TextInput
            value={con}
            onChangeText={setCon}
            style={styles.input}
            />
          </View>
        </View>
        <View style={styles.rowcontainer}>
          <View style={styles.textnbarcontainer_last}>
            <Text style={styles.question}>{"My health concern (e.g., high blood pressure):"}</Text>
              <TextInput
              value={health}
              onChangeText={setHealth}
              style={styles.input_last}
              />
          </View>
        </View>
      </View>
      <View style = {styles.arrow}/>
      <Pressable
        style={styles.button}
        onPress={async() => {
          let status = await homeapi(email,gender,age,height,weight,country + ', ' + region,con,health);
          console.log('status', status);
          setDis(true);
          navigation.navigate('Cus');
        }}
        disabled = {dis}
        >
        <Text style = {styles.buttonText}>{'Next'}</Text>
      </Pressable>
      <StatusBar style="auto" />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: "center",
  },

  rowcontainer:{
    flex: 0.25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 15,
    width: '90%',
  },

  textnbarcontainer:{
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingHorizontal: 15,
    width: '50%',
  },

  textnbarcontainer_sec:{
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingHorizontal: 15,
    width: '25%',
    bottom: '20%',
  },

  textnbarcontainer_thrd:{
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingHorizontal: 15,
    width: '50%',
    bottom: '40%',
  },

  textnbarcontainer_last:{
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingHorizontal: 15,
    width: '100%',
    bottom: '70%',
  },

  input: {
    padding: 15,
    borderRadius: 8,
    fontSize: 14,
    backgroundColor: 'white',
    color: 'black',
    borderColor: 'black',
    width: '100%',
  },

  input_sec: {
    padding: 15,
    borderRadius: 8,
    fontSize: 14,
    backgroundColor: 'white',
    color: 'black',
    borderColor: 'black',
    width: '100%',
  },

  input_last: {
    padding: 15,
    borderRadius: 8,
    fontSize: 14,
    backgroundColor: 'white',
    color: 'black',
    borderColor: 'black',
    width: '100%',
  },

  bubble: {
    flexDirection: 'column',
    backgroundColor: '#DE8F5F',
    alignItems: "center",
    justifyContent: 'center',
    paddingHorizontal: 10,
    top: '5%',
    height: '75%',
    width: '50%',
    borderRadius: 25,
    borderWidth: 7,
    borderColor: '#DE8F5F',
  },

  arrow: {
    top: '5%',
    left: '16%',
    width: 80,
    height: 80,
    borderWidth: 40,
    borderTopColor: '#DE8F5F',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
  },

  text: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: 'white',
    fontWeight:'bold',
    top: '5%'
    //bottom: '3%'
  },

  question: {
    fontFamily: 'Arial',
    fontSize: 18,
    color: 'white',
    bottom: '10%'
  },

  button: {
    backgroundColor: "#D6D46D",
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    top: '4%',
    height: '7%',
    width: '15%',
    borderRadius: 20,
    padding: 10,
    borderColor: '#D6D46D',
  },

  buttonText: {
    fontFamily: "Arial",
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight:'bold',
    fontSize: 25,
  },
});
