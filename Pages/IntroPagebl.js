import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View, Pressable, Dimensions, Image } from 'react-native';
import { intro } from '../fixedans/fixintro';
import useGlobalStore from '../store/store';


const screenWidth = Dimensions.get('window').width;
const ScreenHeight = Dimensions.get('window').height;
const px = 0.65 * Math.min(screenWidth / 320, ScreenHeight / 640);

export default function IntroPage({ navigation }) {
  const chatContainerWidth = screenWidth * 0.8;
  const ScrollViewHeight = 0.8 * ScreenHeight;
  const OtherContainerHeight = 0.1 * ScreenHeight;

  const [isSelectedy, setSelectiony] = useState(false);
  const [isSelectedn, setSelectionn] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [buttonColor, setButtonColor] = useState('gray');

  const { starttime, setStarttime} = useGlobalStore();

  const handleCheckboxChangey = (event) => {
    setSelectiony(event.target.checked);
    setSelectionn(false);
  };

  const handleCheckboxChangen = (event) => {
    setSelectionn(event.target.checked);
    setSelectiony(false);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  useEffect(() => {
    if (isSelectedy == true) 
    {
      setButtonColor('#86A789');
    } else 
    {
      setButtonColor('gray');
    }
  }, [isSelectedy]);

  useEffect(() => {
    let starttime = new Date();
    setStarttime(starttime);
  }, []);

  return (
    <View style={styles.container}>
        <View style={[styles.titleContainer, { height: OtherContainerHeight }]}>
            <Text style={styles.title}>{'A Survey Study on Chatbot-Based Dietary Recommendation'}</Text>
        </View>
        <View style={{
            height: ScrollViewHeight,
            backgroundColor: 'white',
            paddingHorizontal: 10 * px,
            borderRadius: 15 * px,
            width: chatContainerWidth,
            borderWidth: 2 * px,
            borderColor: 'black',
            flexDirection: 'column',
            justifyContent: "flex-start",
            alignSelf: 'center',
        }}
        >
          <Text style={styles.subTitle}>{' '}</Text>
          <Text style={styles.subTitle}>{' '}</Text>
          <Text style={styles.subTitle}>{'Introduction'}</Text>
          <Text style={{
              fontFamily: 'Arial',
              fontSize: 16 * px,
              color: 'black',
              paddingHorizontal: 75 * px,
          }}>{intro.intro}</Text>
          <Text style={styles.subTitle}>{' '}</Text>
          <Text style={styles.subTitle}>{'Research Team'}</Text>
          <Text style={{
              fontFamily: 'Arial',
              fontSize: 16 * px,
              color: 'black',
              paddingHorizontal: 75 * px,
          }}>{intro.reteam}</Text>
          <Text style={styles.subTitle}>{' '}</Text>
          <Text style={styles.subTitle}>{'Study Procedure'}</Text>
          <Text style={{
              fontFamily: 'Arial',
              fontSize: 16 * px,
              color: 'black',
              paddingHorizontal: 75 * px,
          }}>{'In this survey, you will talk to a chatbot, which is designed to recommend personalized and healthy food for you. At the end of the conversation, you will be asked to decide whether you would like to take the recommendation in the following week and a few questions about your conversation experience.\nThe survey consists of five parts: 1) filling out a short screening questionnaire to ensure that you meet the inclusion criteria; 2) providing your demographic and basic health information to prepare for the conversation; 3) interacting with the chatbot to receive the recommendation; 4) providing your feedback with the recommending system;'}<Text style={{color: '#597E52', fontWeight:'bold'}}>{ " 5) You may receive a short follow-up survey in about one week after the study."}</Text>{'\nOverall, the survey will take less than 15 minutes. Upon completion, you will receive a compensation equivalent to 2.8 USD (~ GBP 2.25, or HKD 22) to thank for your time.'}</Text>
          <Text style={styles.subTitle}>{' '}</Text>
          <Text style={styles.subTitle}>{'Potential Risk'}</Text>
          <Text style={{
              fontFamily: 'Arial',
              fontSize: 16 * px,
              color: 'black',
              paddingHorizontal: 75 * px,
          }}>{'The chatbot is powered by a large language model (LLM), which aims to recommend food by optimizing your eating preferences and health goals. While we have evaluated the recommendation results with professional nutritionists, the recommendation may not 100% fit your health profile. Therefore, the study is intended only for people '}<Text style={{color: '#597E52', fontWeight:'bold'}}>{'without'}</Text>{' serious health concerns or food allergy.'}</Text>
          <Text style={styles.subTitle}>{' '}</Text>
          <Text style={styles.subTitle}>{'Benefits'}</Text>
          <Text style={{
              fontFamily: 'Arial',
              fontSize: 16 * px,
              color: 'black',
              paddingHorizontal: 75 * px,
          }}>{intro.bene}</Text>
          <Text style={styles.subTitle}>{' '}</Text>
          <Text style={styles.subTitle}>{'Confidentiality'}</Text>
          <Text style={{
              fontFamily: 'Arial',
              fontSize: 16 * px,
              color: 'black',
              paddingHorizontal: 75 * px,
          }}>{intro.confi}</Text>
          <Text style={styles.subTitle}>{' '}</Text>
          <Text style={styles.question}>{'Do you consent to participate in the study?'}</Text>
          <label>
            <input
              type="radio"
              checked={isSelectedy}
              onChange={handleCheckboxChangey}
              style={styles.checkbox}
            />
            <Text style={{
              fontFamily: 'Arial',
              fontSize: 16 * px,
              color: 'black',
            }}>Yes, I consent.
            </Text>
          </label>
          <label>
            <input
              type="radio"
              checked={isSelectedn}
              onChange={handleCheckboxChangen}
              style={styles.checkbox}
            />
            <Text style={{
              fontFamily: 'Arial',
              fontSize: 16 * px,
              color: 'black',
            }}>No, I do not consent.
            </Text>
          </label>
          <Text style={styles.subTitle}>{' '}</Text>
        </View>
        <View style={[styles.subTitleContainer, { height: OtherContainerHeight }]}>
          <Pressable
              style={[{
                marginRight: screenWidth * 0.1,
                width: screenWidth * 0.145,
                height: ScreenHeight * 0.03,
                backgroundColor: buttonColor,
                justifyContent: 'center',
                alignItems: "center",
              }, isFocused && {backgroundColor: "#597E52",}]}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onPress={() => {
                if(isSelectedy)
                {
                  navigation.navigate('SmartEats-ScreeningQuestion');
                }
              }}
                >
              <Text style={styles.texts}>{'Next: Screening Questions'}</Text>
          </Pressable>
        </View>
      <StatusBar style="auto" />
    </View>
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
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: 'white',
    alignSelf: 'center',
  },

  subTitleContainer: {
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: 'white',
    alignSelf: 'flex-end',
  },

  eleContainer: {
    flexDirection: 'column',
    alignItems: "flex-start",
    justifyContent: "center",
    backgroundColor: 'white',
  },

  eleContainerPlus: {
    flexDirection: 'column',
    alignItems: "flex-start",
    justifyContent: "center",
    backgroundColor: 'white',
  },

  eleContainerSub: {
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
    fontSize: 20 * px,
    color: 'black',
    fontWeight:'bold',
    marginLeft: 75 * px,
  },

  question: {
    fontFamily: 'Arial',
    fontSize: 20 * px,
    color: '#597E52',
    fontWeight:'bold',
    marginLeft: 75 * px,
  },

  texts: {
    fontFamily: 'Arial',
    fontSize: 16 * px,
    color: 'white',
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
