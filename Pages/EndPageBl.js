import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {StyleSheet, Text, View, Pressable, ScrollView, Dimensions, Image, SafeAreaView} from 'react-native';

import endapi from '../Getapi/getend';
import endinfobl from '../Getapi/getendbl'
import { questionnaire } from '../fixedans/fixques';
import { endsents } from '../fixedans/fixend';
import { warnsents } from '../fixedans/warning';
import useGlobalStore from '../store/store';
import LikertScale from '../Components/likert';
import EduScale from '../Components/education';
import SlideScale from '../Components/slides';

const screenWidth = Dimensions.get('window').width;
const ScreenHeight = Dimensions.get('window').height;
const px = 0.65 * Math.min(screenWidth / 320, ScreenHeight / 640);
export default function EndPage({ navigation }) {
  const ScrollContainerWidth = screenWidth * 0.8;

  const ScrollViewHeight = 0.8 * ScreenHeight;
  const OtherContainerHeight = 0.1 * ScreenHeight;

  const wordnum = 5;

  const [warn, setWarn] = useState('');

  const [acca, setAcca] = useState('');
  const [expa, setExpa] = useState('');
  const [expb, setExpb] = useState('');
  const [expc, setExpc] = useState('');
  const [intera, setIntera] = useState('');
  const [usefa, setUsefa] = useState('');
  const [usefb, setUsefb] = useState('');
  const [trusta, setTrusta] = useState('');
  const [trustb, setTrustb] = useState('');
  const [eata, setEata] = useState('');
  const [useia, setUseia] = useState('');
  const [useib, setUseib] = useState('');
  const [useic, setUseic] = useState('');
  const [quaa, setQuaa] = useState('');
  const [ada, setAda] = useState('');
  const [adb, setAdb] = useState('');
  const [bot, setBot] = useState('');

  const [extra, setExtra] = useState('');

  const [edul, setEdul] = useState('');
  const [workf, setWorkf] = useState('');
  const [race, setRace] = useState('');

  const [hper, setHper] = useState('');
  const [feedback, setFeedback] = useState('');

  const [edut, setEdut] = useState('');

  const { userId } = useGlobalStore();

  const [bt, setBt] = useState('Submit your feedback');
  const [dis, setDis] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [buttonColor, setButtonColor] = useState('gray');

  useEffect(() => {
    if (acca != '' && expa != '' && expb != '' && expc != '' && intera != '' && usefa != '' && usefb != '' && trusta != '' && trustb != '' && eata != '' && useia != '' && useib != '' && useic != '' && quaa != '' && ada != '' && adb != '' && bot != '' && edul != '' && workf != '' && race != '' && hper != '' && feedback != '' && extra != '') 
    {
      setButtonColor('#86A789');
      setWarn('');
    } else 
    {
      setButtonColor('gray');
    }
  }, [acca, expa, expb, expc, intera, usefa, usefb, trusta, trustb, eata, useia, useib, useic, quaa, ada, adb, bot, edul, workf, race, hper, feedback, edut, extra]);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleChangeEdu = (event) => {
    setEdut(event.target.value);
  };

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleAccaChange = (option) => {
    console.log('Selected option:', option);
    setAcca(option);
  };

  const handleExpaChange = (option) => {
    console.log('Selected option:', option);
    setExpa(option);
  };

  const handleExpbChange = (option) => {
    console.log('Selected option:', option);
    setExpb(option);
  };

  const handleExpcChange = (option) => {
    console.log('Selected option:', option);
    setExpc(option);
  };

  const handleInteraChange = (option) => {
    console.log('Selected option:', option);
    setIntera(option);
  };

  const handleUsefaChange = (option) => {
    console.log('Selected option:', option);
    setUsefa(option);
  };

  const handleUsefbChange = (option) => {
    console.log('Selected option:', option);
    setUsefb(option);
  };

  const handleTrustaChange = (option) => {
    console.log('Selected option:', option);
    setTrusta(option);
  };

  const handleTrustbChange = (option) => {
    console.log('Selected option:', option);
    setTrustb(option);
  };

  const handleEataChange = (option) => {
    console.log('Selected option:', option);
    setEata(option);
  };

  const handleUseiaChange = (option) => {
    console.log('Selected option:', option);
    setUseia(option);
  };

  const handleUseibChange = (option) => {
    console.log('Selected option:', option);
    setUseib(option);
  };

  const handleUseicChange = (option) => {
    console.log('Selected option:', option);
    setUseic(option);
  };

  const handleQuaaChange = (option) => {
    console.log('Selected option:', option);
    setQuaa(option);
  };

  const handleAdaChange = (option) => {
    console.log('Selected option:', option);
    setAda(option);
  };

  const handleAdbChange = (option) => {
    console.log('Selected option:', option);
    setAdb(option);
  };

  const handleChaBotnge = (option) => {
    console.log('Selected option:', option);
    setBot(option);
  };

  const handleEdulChange = (option) => {
    console.log('Selected option:', option);
    setEdul(option);
  };

  const handleWorkfChange = (option) => {
    console.log('Selected option:', option);
    setWorkf(option);
  };

  const handleRaceChange = (option) => {
    console.log('Selected option:', option);
    setRace(option);
  };

  const handleHperChange = (option) => {
    console.log('Selected option:', option);
    setHper(option);
  };

  const handleExtraChange = (option) => {
    console.log('Selected option:', option);
    setExtra(option);
  }

  function isMeaninglessSentence(sentence) {
    const pattern = /^(?=.*[a-zA-Z])[\w\s.,?!;:'"()-]+$/;
    return !pattern.test(sentence);
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
    <View style={styles.container}>
      <View style={[styles.titleContainer, { height: OtherContainerHeight }]}>
        <Text style={styles.title}>{'A Survey Study on Chatbot-Based Dietary Recommendation'}</Text>
      </View>
      <ScrollView contentContainerStyle={{
            height: ScrollViewHeight,
            backgroundColor: 'white',
            paddingHorizontal: 10 * px,
            borderRadius: 15 * px,
            width: ScrollContainerWidth,
            borderWidth: 2 * px,
            borderColor: 'black',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            overflow: 'scroll',
            alignSelf: 'center',
        }}
        showsVerticalScrollIndicator={true}
        >
        <View style={styles.subTitleContainer}>
          <Text style={styles.subTitle}>{endsents.prefix}</Text>
        </View>

        <SlideScale
          question={questionnaire.acca}
          onChange={handleAccaChange}
          containerStyle={styles.valcontainer}
        />

        <Text style={{fontSize: 16 * px, color: 'white'}}>{' '}</Text>

        <SlideScale
          question={questionnaire.expa}
          onChange={handleExpaChange}
          containerStyle={styles.valcontainer}
        />

<       Text style={{fontSize: 16 * px, color: 'white'}}>{' '}</Text>

        <SlideScale
          question={questionnaire.expb}
          onChange={handleExpbChange}
          containerStyle={styles.valcontainer}
        />

        <Text style={{fontSize: 16 * px, color: 'white'}}>{' '}</Text>

        <SlideScale
          question={questionnaire.expc}
          onChange={handleExpcChange}
          containerStyle={styles.valcontainer}
        />

        <Text style={{fontSize: 16 * px, color: 'white'}}>{' '}</Text>

        <SlideScale
          question={questionnaire.intera}
          onChange={handleInteraChange}
          containerStyle={styles.valcontainer}
        />

        <Text style={{fontSize: 16 * px, color: 'white'}}>{' '}</Text>

        <SlideScale
          question={questionnaire.usefa}
          onChange={handleUsefaChange}
          containerStyle={styles.valcontainer}
        />

        <Text style={{fontSize: 16 * px, color: 'white'}}>{' '}</Text>

        <SlideScale
          question={questionnaire.usefb}
          onChange={handleUsefbChange}
          containerStyle={styles.valcontainer}
        />

        <Text style={{fontSize: 16 * px, color: 'white'}}>{' '}</Text>

        <SlideScale
          question={questionnaire.trusta}
          onChange={handleTrustaChange}
          containerStyle={styles.valcontainer}
        />

        <Text style={{fontSize: 16 * px, color: 'white'}}>{' '}</Text>

        <SlideScale
          question={questionnaire.trustb}
          onChange={handleTrustbChange}
          containerStyle={styles.valcontainer}
        />

        <Text style={{fontSize: 16 * px, color: 'white'}}>{' '}</Text>

        <SlideScale
          question={questionnaire.eata}
          onChange={handleEataChange}
          containerStyle={styles.valcontainer}
        />

        <Text style={{fontSize: 16 * px, color: 'white'}}>{' '}</Text>

        <SlideScale
          question={questionnaire.extra}
          onChange={handleExtraChange}
          containerStyle={styles.valcontainer}
        />

        <Text style={{fontSize: 16 * px, color: 'white'}}>{' '}</Text>

        <SlideScale
          question={questionnaire.useia}
          onChange={handleUseiaChange}
          containerStyle={styles.valcontainer}
        />

        <Text style={{fontSize: 16 * px, color: 'white'}}>{' '}</Text>

        <SlideScale
          question={questionnaire.useib}
          onChange={handleUseibChange}
          containerStyle={styles.valcontainer}
        />

        <Text style={{fontSize: 16 * px, color: 'white'}}>{' '}</Text>

        <SlideScale
          question={questionnaire.useic}
          onChange={handleUseicChange}
          containerStyle={styles.valcontainer}
        />

        <Text style={{fontSize: 16 * px, color: 'white'}}>{' '}</Text>

        <SlideScale
          question={questionnaire.quaa}
          onChange={handleQuaaChange}
          containerStyle={styles.valcontainer}
        />

        <Text style={{fontSize: 16 * px, color: 'white'}}>{' '}</Text>

        <SlideScale
          question={questionnaire.ada}
          onChange={handleAdaChange}
          containerStyle={styles.valcontainer}
        />

        <Text style={{fontSize: 16 * px, color: 'white'}}>{' '}</Text>

        <SlideScale
          question={questionnaire.adb}
          onChange={handleAdbChange}
          containerStyle={styles.valcontainer}
        />

        <SlideScale
          question={questionnaire.botstyle}
          onChange={handleChaBotnge}
          containerStyle={styles.valcontainer}
        />

        <Text style={{fontSize: 16 * px, color: 'white'}}>{' '}</Text>
        
        <View style={styles.valcontainer}>
          <EduScale
            question={questionnaire.q1bl}
            options={['High school diploma / GED', 'Associate degree', "Bachelor's degree", 'Trade school certification', "Master's degree or higher education", 'Other (please specify):']}
            onChange={handleEdulChange}
          />
          <div className="input-line">
            <input
            type="text"
            value={edut}
            onChange={handleChangeEdu}
            placeholder="Please enter specific information here."
            style={styles.input}
            />
            <View style={styles.line} />
          </div>
        </View>

        <Text style={{fontSize: 16 * px, color: 'white'}}>{' '}</Text>

        <LikertScale
          question={questionnaire.q2bl}
          options={['Computer Science / Engineering', 'Creative Media / Design', 'Environmental Science', 'Physics / Chemistry / Biology', 'Business / Finance', 'Law', 'Medical Science / Healthcare', 'Publishing', 'Education', 'Social Science / Humanity', 'Service industry']}
          onChange={handleWorkfChange}
          containerStyle={[styles.valcontainer, {marginTop: 5}]}
        />

        <Text style={{fontSize: 16 * px, color: 'white'}}>{' '}</Text>

        <LikertScale
          question={questionnaire.q3bl}
          options={['American Indian or Alaskan Native', 'Asian', 'Black or African American', 'Caucasian or White', 'Hispanic or Latino', 'Native Hawaiian or Other Pacific Islander', 'Multiracial / Other', 'Prefer not to say']}
          onChange={handleRaceChange}
          containerStyle={[styles.valcontainer, {marginTop: 5}]}
        />

        <Text style={{fontSize: 16 * px, color: 'white'}}>{' '}</Text>

        <LikertScale
          question={questionnaire.q4bl}
          options={['extroverted', 'introverted']}
          onChange={handleHperChange}
          containerStyle={[styles.valcontainer, {marginTop: 5}]}
        />

        <Text style={{fontSize: 16 * px, color: 'white'}}>{' '}</Text>

        <View style={[styles.valcontainer, {marginTop: 10}]}>
          <Text style={[styles.question, {marginBottom: 10}]}>{questionnaire.q5bl}</Text>
          <div className="input-line">
            <input
            type="text"
            value={feedback}
            onChange={handleFeedbackChange}
            placeholder="Please enter your feedback here."
            style={styles.input}
            />
            <View style={styles.line} />
          </div>
        </View>

        <View style={styles.valcontainer}>
          <Text style={styles.warntexts}>{warn}</Text>
        </View>
      </ScrollView>
      <View style={[styles.bottomContainer, { height: OtherContainerHeight }]}>
        <Pressable
          style={[{
            marginRight: screenWidth * 0.1,
            width: screenWidth * 0.125,
            height: ScreenHeight * 0.03,
            backgroundColor: buttonColor,
            justifyContent: 'center',
            alignItems: "center",
          }, isFocused && {backgroundColor: "#597E52",}]}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onPress={async() => {
            if (acca != '' && expa != '' && expb != '' && expc != '' && intera != '' && usefa != '' && usefb != '' && trusta != '' && trustb != '' && eata != '' && useia != '' && useib != '' && useic != '' && quaa != '' && ada != '' && adb != '' && bot != '' && edul != '' && workf != '' && race != '' && hper != '' && feedback != '' && extra != '')
            {
              let words = feedback.trim().split(' ').length;
              console.log('words:', words);
              if ((edul == 'Other (please specify):' && edut == '') || (words < wordnum))
              {
                if (words >= wordnum)
                {
                  setWarn(warnsents.edu);
                }
                else
                {
                  setWarn('Please enter more than 5 words in your feedback.');
                }
              }
              else
              {
                if (isMeaninglessSentence(feedback) == true)
                {
                  setWarn('Please enter meaningful thoughts and feedback.');
                }
                else
                {
                  setDis(true);
                  let status = await endinfobl(userId, acca, expa, expb, expc, intera, usefa, usefb, trusta, trustb, eata, useia, useib, useic, quaa, ada, adb, bot, edul + '(' + edut + ')', workf, race, hper, feedback, extra);
                  console.log('status', status);
                  setWarn('');
                  setBt('Feedback submitted!');
                  navigation.navigate('SmartEats-Finish');
                }
              }
            }
            else
            {
              setWarn('Please finish the survey, thanks!');
            }
          }}
          disabled = {dis}
          >
          <Text style = {styles.buttonText}>{bt}</Text>
        </Pressable>
      </View>
      <StatusBar style="auto" />
    </View>
    </SafeAreaView>
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

  valcontainer:{
    flexDirection: 'column',
    alignItems: "flex-start",
    justifyContent: "center",
    backgroundColor: 'white',
    marginBottom: 10 * px,
  },

  bottomContainer: {
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: 'white',
    alignSelf: 'flex-end',
  },

  subTitleContainer: {
    flexDirection: 'column',
    alignItems: "flex-start",
    justifyContent: "center",
    backgroundColor: 'white',
    alignSelf: 'stretch',
    marginTop: 15 * px,
    marginBottom: 15 * px,
  },

  subTitle: {
    fontFamily: 'Arial',
    fontSize: 18 * px,
    color: '#597E52',
    fontWeight:'bold',
    marginLeft: 75 * px,
  },

  title: {
    fontFamily: 'Arial',
    fontSize: 40 * px,
    color: '#597E52',
    fontWeight:'bold',
  },

  input: {
    fontSize: 16 * px,
    border: 'none',
    width: '200%',
    height: '100%',
    marginLeft: 75 * px,
    outlineWidth: 'none',
  },

  line: {
    width: '200%',
    height: 1 * px,
    backgroundColor: 'black',
    marginLeft: 75 * px,
    borderWidth: 1 * px,
  },

  question: {
    fontFamily: 'Arial',
    fontSize: 16 * px,
    color: 'black',
    fontWeight:'bold',
    paddingHorizontal: 75 * px,
  },

  button: {
    flexDirection: 'column',
    marginLeft: 75 * px,
    width: '80%',
    height: '30%',
    backgroundColor: "#86A789",
    justifyContent: 'center',
    alignItems: "center",
    left: '215%',
  },

  buttonText: {
    fontFamily: "Arial",
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 16 * px,
  },

  warntexts: {
    fontFamily: 'Arial',
    fontSize: 14 * px,
    color: 'red',
    marginLeft: 75 * px
  },

  bot: {
    width: 70 * px,
    height: 70 * px,
  },
});
