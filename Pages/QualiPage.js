import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View, Pressable, Dimensions, Image } from 'react-native';
import { qualisents } from '../fixedans/fixquali';
import { warnsents } from '../fixedans/warning';


const screenWidth = Dimensions.get('window').width;
const ScreenHeight = Dimensions.get('window').height;
const px = 0.65 * Math.min(screenWidth / 320, ScreenHeight / 640);

export default function QualiPage({ navigation }) {
  const chatContainerWidth = screenWidth * 0.8;
  const [isSelectedf1, setSelectionf1] = useState(false);
  const [isSelectedf2, setSelectionf2] = useState(false);
  const [isSelecteds1, setSelections1] = useState(false);
  const [isSelecteds2, setSelections2] = useState(false);
  const [isSelecteds3, setSelections3] = useState(false);
  const [isSelecteds4, setSelections4] = useState(false);
  const [isSelectedt1, setSelectiont1] = useState(false);
  const [isSelectedt2, setSelectiont2] = useState(false);
  const [isSelectedfo1, setSelectionfo1] = useState(false);
  const [isSelectedfo2, setSelectionfo2] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [warn, setWarn] = useState('');

  const [buttonColor, setButtonColor] = useState('gray');

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleCheckboxChangef1 = (event) => {
    setSelectionf1(event.target.checked);
    setSelectionf2(false);
  };

  const handleCheckboxChangef2 = (event) => {
    setSelectionf2(event.target.checked);
    setSelectionf1(false);
  };

  const handleCheckboxChanges1 = (event) => {
    setSelections1(event.target.checked);
    setSelections2(false);
    setSelections3(false);
    setSelections4(false);
  };

  const handleCheckboxChanges2 = (event) => {
    setSelections2(event.target.checked);
    setSelections1(false);
    setSelections3(false);
    setSelections4(false);
  };

  const handleCheckboxChanges3 = (event) => {
    setSelections3(event.target.checked);
    setSelections1(false);
    setSelections2(false);
    setSelections4(false);
  };

  const handleCheckboxChanges4 = (event) => {
    setSelections4(event.target.checked);
    setSelections1(false);
    setSelections2(false);
    setSelections3(false);
  };

  const handleCheckboxChanget1 = (event) => {
    setSelectiont1(event.target.checked);
    setSelectiont2(false);
  };

  const handleCheckboxChanget2 = (event) => {
    setSelectiont2(event.target.checked);
    setSelectiont1(false);
  };

  const handleCheckboxChangefo1 = (event) => {
    setSelectionfo1(event.target.checked);
    setSelectionfo2(false);
  };

  const handleCheckboxChangefo2 = (event) => {
    setSelectionfo2(event.target.checked);
    setSelectionfo1(false);
  };

  useEffect(() => {
    if (isSelectedf1==true && (isSelecteds3==true || isSelecteds4==true) && isSelectedt1==true && isSelectedfo2==true) 
    {
      setButtonColor('#86A789');
      setWarn('');
    } else 
    {
      setButtonColor('gray');
    }
  }, [isSelectedf1, isSelecteds3, isSelecteds4, isSelectedt1, isSelectedfo2]);

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
            <View style={styles.subTitleContainer}>
                <Text style={styles.subTitle}>{qualisents.prefix}</Text>
            </View>
            <View style={styles.eleContainer}>
                <Text style={{
                    fontFamily: 'Arial',
                    fontSize: 16 * px,
                    color: 'black',
                    fontWeight:'bold',
                    paddingHorizontal: 75 * px,
                }}>{qualisents.first}</Text>
                <label>
                  <input
                    type="radio"
                    checked={isSelectedf1}
                    onChange={handleCheckboxChangef1}
                    style={styles.checkbox}
                  />
                  <Text style={{
                    fontFamily: 'Arial',
                    fontSize: 16 * px,
                    color: 'black',
                  }}>Yes</Text>
                </label>
                <label>
                  <input
                    type="radio"
                    checked={isSelectedf2}
                    onChange={handleCheckboxChangef2}
                    style={styles.checkbox}
                  />
                  <Text style={{
                    fontFamily: 'Arial',
                    fontSize: 16 * px,
                    color: 'black',
                  }}>No</Text>
                </label>
            </View>
            <View style={styles.eleContainerPlus}>
                <Text style={{
                    fontFamily: 'Arial',
                    fontSize: 16 * px,
                    color: 'black',
                    fontWeight:'bold',
                    paddingHorizontal: 75 * px,
                }}>{qualisents.second}</Text>
                <label>
                  <input
                    type="radio"
                    checked={isSelecteds1}
                    onChange={handleCheckboxChanges1}
                    style={styles.checkbox}
                  />
                  <Text style={{
                    fontFamily: 'Arial',
                    fontSize: 16 * px,
                    color: 'black',
                  }}>Not fluent at all</Text>
                </label>
                <label>
                  <input
                    type="radio"
                    checked={isSelecteds2}
                    onChange={handleCheckboxChanges2}
                    style={styles.checkbox}
                  />
                  <Text style={{
                    fontFamily: 'Arial',
                    fontSize: 16 * px,
                    color: 'black',
                  }}>A little bit</Text>
                </label>
                <label>
                  <input
                    type="radio"
                    checked={isSelecteds3}
                    onChange={handleCheckboxChanges3}
                    style={styles.checkbox}
                  />
                  <Text style={{
                    fontFamily: 'Arial',
                    fontSize: 16 * px,
                    color: 'black',
                  }}>Fluent</Text>
                </label>
                <label>
                  <input
                    type="radio"
                    checked={isSelecteds4}
                    onChange={handleCheckboxChanges4}
                    style={styles.checkbox}
                  />
                  <Text style={{
                    fontFamily: 'Arial',
                    fontSize: 16 * px,
                    color: 'black',
                  }}>I am a native speaker</Text>
                </label>
            </View>
            <View style={styles.eleContainer}>
                <Text style={{
                    fontFamily: 'Arial',
                    fontSize: 16 * px,
                    color: 'black',
                    fontWeight:'bold',
                    paddingHorizontal: 75 * px,
                }}>{qualisents.third}</Text>
                <label>
                  <input
                    type="radio"
                    checked={isSelectedt1}
                    onChange={handleCheckboxChanget1}
                    style={styles.checkbox}
                  />
                  <Text style={{
                    fontFamily: 'Arial',
                    fontSize: 16 * px,
                    color: 'black',
                  }}>Yes</Text>
                </label>
                <label>
                  <input
                    type="radio"
                    checked={isSelectedt2}
                    onChange={handleCheckboxChanget2}
                    style={styles.checkbox}
                  />
                  <Text style={{
                    fontFamily: 'Arial',
                    fontSize: 16 * px,
                    color: 'black',
                  }}>No</Text>
                </label>
            </View>
            <View style={styles.eleContainer}>
                <Text style={{
                    fontFamily: 'Arial',
                    fontSize: 16 * px,
                    color: 'black',
                    fontWeight:'bold',
                    paddingHorizontal: 75 * px,
                }}>{qualisents.fourth}</Text>
                <label>
                  <input
                    type="radio"
                    checked={isSelectedfo1}
                    onChange={handleCheckboxChangefo1}
                    style={styles.checkbox}
                  />
                  <Text style={{
                    fontFamily: 'Arial',
                    fontSize: 16 * px,
                    color: 'black',
                  }}>Yes</Text>
                </label>
                <label>
                  <input
                    type="radio"
                    checked={isSelectedfo2}
                    onChange={handleCheckboxChangefo2}
                    style={styles.checkbox}
                  />
                  <Text style={{
                    fontFamily: 'Arial',
                    fontSize: 16 * px,
                    color: 'black',
                  }}>No</Text>
                </label>
            </View>
            <View style={styles.eleContainerSub}>
              <Text style={styles.warntexts}>{warn}</Text>
            </View>
        </ScrollView>
        <View style={styles.bottomContainer}>
          <Pressable
              style={[{
                marginRight: screenWidth * 0.1,
                width: screenWidth * 0.105,
                height: ScreenHeight * 0.03,
                backgroundColor: buttonColor,
                justifyContent: 'center',
                alignItems: "center",
              }, isFocused && {backgroundColor: "#597E52",}]}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onPress={() => {
                if(isSelectedf1==true && (isSelecteds3==true || isSelecteds4==true) && isSelectedt1==true && isSelectedfo2==true)
                {
                  setWarn('');
                  navigation.navigate('SmartEats-UserProfile');
                }
                else
                {
                  if((isSelectedf1==false && isSelectedf2==false) || (isSelecteds1==false && isSelecteds2==false && isSelecteds3==false && isSelecteds4==false) || (isSelectedt1==false && isSelectedt2==false) || (isSelectedfo1==false && isSelectedfo2==false))
                  {
                    setWarn(warnsents.notfinish);
                  }
                  else
                  {
                    if(isSelectedf2==true || (isSelecteds1==true || isSelecteds2==true) || isSelectedt2==true || isSelectedfo1==true)
                    {
                      setWarn(warnsents.notqali);
                    }
                  }
                }
              }}
                >
              <Text style={styles.texts}>{'Next: User Profile'}</Text>
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

  eleContainerPlus: {
    flex: 1.4,
    flexDirection: 'column',
    alignItems: "flex-start",
    justifyContent: "flex-start",
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
    color: '#597E52',
    fontWeight:'bold',
    marginLeft: 75 * px,
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

  bot: {
    marginBottom: 20 * px,
    marginLeft: 15 * px,
    width: 65 * px,
    height: 65 * px,
  },
});
