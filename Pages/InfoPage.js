import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View, Pressable, Dimensions, Image } from 'react-native';
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import homeapi from '../Getapi/gethome';
import { qualisents } from '../fixedans/fixquali';
import { warnsents } from '../fixedans/warning';
import useGlobalStore from '../store/store';


const screenWidth = Dimensions.get('window').width;
const ScreenHeight = Dimensions.get('window').height;
const px = 0.65 * Math.min(screenWidth / 320, ScreenHeight / 640);

export default function InfoPage({ navigation }) {
  const chatContainerWidth = screenWidth * 0.8;
  const maildress = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;

  const [isSelectedm, setSelectionm] = useState(false);
  const [isSelectedf, setSelectionf] = useState(false);
  const [isSelectedi, setSelectioni] = useState(false);
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [country, setCountry] = useState('');
  const [region, setRegion] = useState('');
  const [fr, setFr] = useState('');
  const [health, setHealth] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [warn, setWarn] = useState('');
  const [dis, setDis] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [buttonColor, setButtonColor] = useState('gray');

  const { userId, setUserId } = useGlobalStore();

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleCheckboxChangem = (event) => {
    setSelectionm(event.target.checked);
    setSelectionf(false);
    setSelectioni(false);
  };

  const handleCheckboxChangef = (event) => {
    setSelectionf(event.target.checked);
    setSelectionm(false);
    setSelectioni(false);
  };

  const handleCheckboxChangei = (event) => {
    setSelectioni(event.target.checked);
    setSelectionm(false);
    setSelectionf(false);
  };

  const handleChangeAge = (event) => {
    setAge(event.target.value);
  };

  const handleChangeHeight = (event) => {
    setHeight(event.target.value);
  };

  const handleChangeWeight = (event) => {
    setWeight(event.target.value);
  };

  const handleChangeFr = (event) => {
    setFr(event.target.value);
  };

  const handleChangeHealth = (event) => {
    setHealth(event.target.value);
  };

  const handleChangeName = (event) => {
    setName(event.target.value);
  };

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  useEffect(() => {
    if (age!=null && height!=null && weight!=null && (isSelectedm==true || isSelectedf==true || isSelectedi==true) && country!='' && region!='' && name!='' && email!='') 
    {
      setButtonColor('#86A789');
      setWarn('');
    } else 
    {
      setButtonColor('gray');
    }
  }, [age, height, weight, isSelectedm, isSelectedf, isSelectedi, country, region, name, email]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.titleContainer}>
            <Text style={styles.title}>{'A Survey Study on Chatbot-Based Dietary Recommendation'}</Text>
        </View>
        <ScrollView contentContainerStyle={{
            flex: 9,
            backgroundColor: 'white',
            paddingHorizontal: 10 * px,
            borderRadius: 15 * px,
            width: chatContainerWidth,
            borderWidth: 2 * px,
            borderColor: 'black',
            flexDirection: 'column',
            justifyContent: "center",
            alignSelf: 'center',
        }}>
            <View style={styles.eleContainerPlus}>
                <Text style={{
                    fontFamily: 'Arial',
                    fontSize: 16 * px,
                    color: 'black',
                    fontWeight:'bold',
                    paddingHorizontal: 75 * px,
                }}>{qualisents.fifth}</Text>
                <label>
                  <input
                    type="radio"
                    checked={isSelectedf}
                    onChange={handleCheckboxChangef}
                    style={styles.checkbox}
                  />
                  <Text style={{
                    fontFamily: 'Arial',
                    fontSize: 16 * px,
                    color: 'black',
                  }}>Female</Text>
                </label>
                <label>
                  <input
                    type="radio"
                    checked={isSelectedi}
                    onChange={handleCheckboxChangei}
                    style={styles.checkbox}
                  />
                  <Text style={{
                    fontFamily: 'Arial',
                    fontSize: 16 * px,
                    color: 'black',
                  }}>Intersex</Text>
                </label>
                <label>
                  <input
                    type="radio"
                    checked={isSelectedm}
                    onChange={handleCheckboxChangem}
                    style={styles.checkbox}
                  />
                  <Text style={{
                    fontFamily: 'Arial',
                    fontSize: 16 * px,
                    color: 'black',
                  }}>Male</Text>
                </label>
            </View>
            <View style={styles.eleContainer}>
                <Text style={{
                    fontFamily: 'Arial',
                    fontSize: 16 * px,
                    color: 'black',
                    fontWeight:'bold',
                    paddingHorizontal: 75 * px,
                }}>{qualisents.sixth}</Text>
                <div className="input-line">
                    <input
                    type="number"
                    min='18'
                    max='120'
                    value={age}
                    onChange={handleChangeAge}
                    placeholder="Please enter your age."
                    style={styles.input}
                    />
                    <View style={styles.line} />
                </div>
            </View>
            <View style={styles.eleContainer}>
                <Text style={{
                    fontFamily: 'Arial',
                    fontSize: 16 * px,
                    color: 'black',
                    fontWeight:'bold',
                    paddingHorizontal: 75 * px,
                }}>{qualisents.seventh}</Text>
                <div className="input-line">
                    <input
                    type="number"
                    min='100'
                    max='220'
                    value={height}
                    onChange={handleChangeHeight}
                    placeholder="Please enter your height."
                    style={styles.input}
                    />
                    <View style={styles.line} />
                </div>
            </View>
            <View style={styles.eleContainer}>
                <Text style={{
                    fontFamily: 'Arial',
                    fontSize: 16 * px,
                    color: 'black',
                    fontWeight:'bold',
                    paddingHorizontal: 75 * px,
                }}>{qualisents.eighth}</Text>
                <div className="input-line">
                    <input
                    type="number"
                    min='30'
                    max='150'
                    value={weight}
                    onChange={handleChangeWeight}
                    placeholder="Please enter your weight."
                    style={styles.input}
                    />
                    <View style={styles.line} />
                </div>
            </View>
            
            <View style={styles.eleContainerMid}>
                <Text style={{
                    fontFamily: 'Arial',
                    fontSize: 16 * px,
                    color: 'black',
                    fontWeight:'bold',
                    paddingHorizontal: 75 * px,
                }}>{qualisents.ninth}</Text>
                <CountryDropdown
                style={{width:'15%', height:'20%', marginLeft: 75 * px}}
                value={country}
                onChange={(val) => setCountry(val)} />
                <RegionDropdown
                style={{width:'15%', height:'20%', marginLeft: 75 * px}}
                country={country}
                value={region}
                onChange={(val) => setRegion(val)} />
            </View>

            <View style={[styles.eleContainer, {bottom: '3.5%'}]}>
                <Text style={{
                    fontFamily: 'Arial',
                    fontSize: 16 * px,
                    color: 'black',
                    fontWeight:'bold',
                    paddingHorizontal: 75 * px,
                }}>{qualisents.tenth}</Text>
                <div className="input-line">
                    <input
                    type="text"
                    value={fr}
                    onChange={handleChangeFr}
                    placeholder="Please enter your food restrictions(if any)."
                    style={styles.input}
                    />
                    <View style={styles.line} />
                </div>
            </View>
            <View style={[styles.eleContainer, {bottom: '3%'}]}>
                <Text style={{
                    fontFamily: 'Arial',
                    fontSize: 16 * px,
                    color: 'black',
                    fontWeight:'bold',
                    paddingHorizontal: 75 * px,
                }}>{qualisents.eleventh}</Text>
                <div className="input-line">
                    <input
                    type="text"
                    value={health}
                    onChange={handleChangeHealth}
                    placeholder="Please enter your health condition(if any)."
                    style={styles.input}
                    />
                    <View style={styles.line} />
                </div>
            </View>
            <View style={styles.eleContainer}>
                <Text style={{
                    fontFamily: 'Arial',
                    fontSize: 16 * px,
                    color: 'black',
                    fontWeight:'bold',
                    paddingHorizontal: 75 * px,
                }}>{qualisents.twelfth}</Text>
                <div className="input-line">
                    <input
                    type="text"
                    value={name}
                    onChange={handleChangeName}
                    placeholder="Please enter your name."
                    style={styles.input}
                    />
                    <View style={styles.line} />
                </div>
            </View>
            <View style={styles.eleContainer}>
                <Text style={{
                    fontFamily: 'Arial',
                    fontSize: 16 * px,
                    color: 'black',
                    fontWeight:'bold',
                    paddingHorizontal: 75 * px,
                }}>{qualisents.thirteenth}</Text>
                <div className="input-line">
                    <input
                    type="text"
                    value={email}
                    onChange={handleChangeEmail}
                    placeholder="Please enter your email."
                    style={styles.input}
                    />
                    <View style={styles.line} />
                </div>
            </View>
            <View style={styles.eleContainerSub}>
              <Text style={styles.warntexts}>{warn}</Text>
            </View>
        </ScrollView>
        <View style={styles.bottomContainer}>
          <Pressable
              style={[{
                marginRight: screenWidth * 0.1,
                width: screenWidth * 0.155,
                height: ScreenHeight * 0.03,
                backgroundColor: buttonColor,
                justifyContent: 'center',
                alignItems: "center",
              }, isFocused && {backgroundColor: "#597E52",}]}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onPress={async() => {
                if(age!=null && height!=null && weight!=null && (isSelectedm==true || isSelectedf==true || isSelectedi==true) && country!='' && region!='' && name!='' && email!='')
                {
                  if(Number(age)>120 || Number(age)<18)
                  {
                    setWarn(warnsents.age);
                  }
                  else if(Number(height)<100 || Number(height)>220)
                  {
                    setWarn(warnsents.height);
                  }
                  else if (Number(weight)<30 || Number(weight)>150)
                  {
                    setWarn(warnsents.weight);
                  }
                  else if (!maildress.test(email))
                  {
                    setWarn(warnsents.email);
                  }
                  else
                  {
                    let sex = null;
                    if (isSelectedf && !isSelectedi && !isSelectedm)
                    {
                      sex = 'female';
                    }
                    if (!isSelectedf && isSelectedi && !isSelectedm)
                    {
                      sex = 'intersex';
                    }
                    if (!isSelectedf && !isSelectedi && isSelectedm)
                    {
                      sex = 'male';
                    }
                    setDis(true);
                    setWarn('');
                    if (fr=='')
                    {
                      setFr('none');
                    }
                    if (health=='')
                    {
                      setHealth('none');
                    }
                    console.log('here');
                    setUserId(email);
                    let status = await homeapi(email,sex,age,height,weight,country + ', ' + region,fr,health);
                    console.log('status', status);
                    navigation.navigate('SmartEats-ChatbotCustomization');
                  }
                }
                else
                {
                  if (age == '')
                  {
                    setWarn(warnsents.age);
                  }
                  else if (height == '')
                  {
                    setWarn(warnsents.height);
                  }
                  else if (weight == '')
                  {
                    setWarn(warnsents.weight);
                  }
                  else if (!isSelectedm && !isSelectedf && !isSelectedi)
                  {
                    setWarn(warnsents.gender);
                  }
                  else if (country == '')
                  {
                    setWarn(warnsents.country);
                  }
                  else if (region == '')
                  {
                    setWarn(warnsents.region);
                  }
                  else if (name == '')
                  {
                    setWarn(warnsents.name);
                  }
                  else if (email == '')
                  {
                    setWarn(warnsents.email);
                  }
                  else
                  {
                    setWarn(warnsents.notfinish);
                  }
                }
              }}
                disabled = {dis}
                >
              <Text style={styles.texts}>{'Next: Chatbot Customization'}</Text>
          </Pressable>
        </View>
      <StatusBar style="auto" />
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    justifyContent: "center",
  },

  titleContainer: {
    flex: 0.5,
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: 'white',
    alignSelf: 'center',
  },

  subTitleContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: "flex-start",
    justifyContent: "center",
    backgroundColor: 'white',
  },

  bottomContainer: {
    flex: 0.5,
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: 'white',
    alignSelf: 'flex-end',
  },

  eleContainerSub: {
    flex: 0.3,
    flexDirection: 'column',
    alignItems: "flex-start",
    justifyContent: "flex-start",
    backgroundColor: 'white',
  },

  eleContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: "flex-start",
    justifyContent: "flex-start",
    backgroundColor: 'white',
  },

  eleContainerMid: {
    flex: 1.5,
    flexDirection: 'column',
    alignItems: "flex-start",
    justifyContent: "flex-start",
    backgroundColor: 'white',
  },

  eleContainerPlus: {
    flex: 2,
    flexDirection: 'column',
    alignItems: "flex-start",
    justifyContent: "center",
    backgroundColor: 'white',
  },

  title: {
    fontFamily: 'Arial',
    fontSize: 40 * px,
    color: '#597E52',
    fontWeight:'bold',
  },

  subTitle: {
    fontFamily: 'Arial',
    fontSize: 18 * px,
    color: '#DE8F5F',
    fontWeight:'bold',
    marginLeft: 75,
  },

  texts: {
    fontFamily: 'Arial',
    fontSize: 16 * px,
    color: 'white',
    textAlign: 'center',
  },

  warntexts: {
    fontFamily: 'Arial',
    fontSize: 14 * px,
    color: 'red',
    marginLeft: 75 * px
  },

  checkbox: {
    marginLeft: 75 * px,
    height: 16 * px,
    width: 16 * px,
  },

  input: {
    fontSize: 16 * px,
    padding: 0,
    border: 'none',
    width: '180%',
    height: '120%',
    marginLeft: 75 * px,
    borderBottomWidth: 2 * px,
  },

  line: {
    width: '180%',
    height: 1 * px,
    backgroundColor: 'black',
    marginLeft: 75 * px,
    borderWidth: 1 * px,
  },

  bot: {
    marginBottom: 20 * px,
    marginLeft: 15 * px,
    width: 65 * px,
    height: 65 * px,
  },
});
