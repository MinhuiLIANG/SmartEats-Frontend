import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {StyleSheet, Text, View, Pressable, ScrollView, Dimensions, Image} from 'react-native';

import endapi from '../Getapi/getend';
import { questionnaire } from '../fixedans/fixques';
import { endsents } from '../fixedans/fixend';
import { warnsents } from '../fixedans/warning';
import useGlobalStore from '../store/store';
import LikertScale from '../Components/likert';
import EduScale from '../Components/education';

export default function EndPage({ navigation }) {
  const screenWidth = Dimensions.get('window').width;
  const ScrollContainerWidth = screenWidth * 0.8;

  const ScreenHeight = Dimensions.get('window').height;
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
    if (acca != '' && expa != '' && expb != '' && expc != '' && intera != '' && usefa != '' && usefb != '' && trusta != '' && trustb != '' && eata != '' && useia != '' && useib != '' && useic != '' && quaa != '' && ada != '' && adb != '' && edul != '' && workf != '' && race != '' && hper != '' && feedback != '') 
    {
      setButtonColor('#86A789');
      setWarn('');
    } else 
    {
      setButtonColor('gray');
    }
  }, [acca, expa, expb, expc, intera, usefa, usefb, trusta, trustb, eata, useia, useib, useic, quaa, ada, adb, edul, workf, race, hper, feedback, edut]);

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

  return (
    <View style={styles.container}>
      <View style={[styles.titleContainer, { height: OtherContainerHeight }]}>
        <Text style={styles.title}>{'A Survey Study on Chatbot-Based Dietary Recommendation'}</Text>
      </View>
      <ScrollView contentContainerStyle={{
            height: ScrollViewHeight,
            backgroundColor: 'white',
            paddingHorizontal: 10,
            borderRadius: 15,
            width: ScrollContainerWidth,
            borderWidth: 2,
            borderColor: 'black',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            overflow: 'scroll',
            alignSelf: 'center',
        }}>
        <View style={styles.subTitleContainer}>
          <Text style={styles.subTitle}>{endsents.prefix}</Text>
        </View>

        <LikertScale
          question={questionnaire.acca}
          options={['Strongly Agree', 'Agree', 'Slightly Agree', 'Neutral', 'Slightly Disagree', 'Disagree', 'Strongly Disagree']}
          onChange={handleAccaChange}
          containerStyle={styles.valcontainer}
        />

        <LikertScale
          question={questionnaire.expa}
          options={['Strongly Agree', 'Agree', 'Slightly Agree', 'Neutral', 'Slightly Disagree', 'Disagree', 'Strongly Disagree']}
          onChange={handleExpaChange}
          containerStyle={styles.valcontainer}
        />

        <LikertScale
          question={questionnaire.expb}
          options={['Strongly Agree', 'Agree', 'Slightly Agree', 'Neutral', 'Slightly Disagree', 'Disagree', 'Strongly Disagree']}
          onChange={handleExpbChange}
          containerStyle={styles.valcontainer}
        />

        <LikertScale
          question={questionnaire.expc}
          options={['Strongly Agree', 'Agree', 'Slightly Agree', 'Neutral', 'Slightly Disagree', 'Disagree', 'Strongly Disagree']}
          onChange={handleExpcChange}
          containerStyle={styles.valcontainer}
        />

        <LikertScale
          question={questionnaire.intera}
          options={['Strongly Agree', 'Agree', 'Slightly Agree', 'Neutral', 'Slightly Disagree', 'Disagree', 'Strongly Disagree']}
          onChange={handleInteraChange}
          containerStyle={styles.valcontainer}
        />

        <LikertScale
          question={questionnaire.usefa}
          options={['Strongly Agree', 'Agree', 'Slightly Agree', 'Neutral', 'Slightly Disagree', 'Disagree', 'Strongly Disagree']}
          onChange={handleUsefaChange}
          containerStyle={styles.valcontainer}
        />

        <LikertScale
          question={questionnaire.usefb}
          options={['Strongly Agree', 'Agree', 'Slightly Agree', 'Neutral', 'Slightly Disagree', 'Disagree', 'Strongly Disagree']}
          onChange={handleUsefbChange}
          containerStyle={styles.valcontainer}
        />

        <LikertScale
          question={questionnaire.trusta}
          options={['Strongly Agree', 'Agree', 'Slightly Agree', 'Neutral', 'Slightly Disagree', 'Disagree', 'Strongly Disagree']}
          onChange={handleTrustaChange}
          containerStyle={styles.valcontainer}
        />

        <LikertScale
          question={questionnaire.trustb}
          options={['Strongly Agree', 'Agree', 'Slightly Agree', 'Neutral', 'Slightly Disagree', 'Disagree', 'Strongly Disagree']}
          onChange={handleTrustbChange}
          containerStyle={styles.valcontainer}
        />

        <LikertScale
          question={questionnaire.eata}
          options={['Strongly Agree', 'Agree', 'Slightly Agree', 'Neutral', 'Slightly Disagree', 'Disagree', 'Strongly Disagree']}
          onChange={handleEataChange}
          containerStyle={styles.valcontainer}
        />

        <LikertScale
          question={questionnaire.useia}
          options={['Strongly Agree', 'Agree', 'Slightly Agree', 'Neutral', 'Slightly Disagree', 'Disagree', 'Strongly Disagree']}
          onChange={handleUseiaChange}
          containerStyle={styles.valcontainer}
        />

        <LikertScale
          question={questionnaire.useib}
          options={['Strongly Agree', 'Agree', 'Slightly Agree', 'Neutral', 'Slightly Disagree', 'Disagree', 'Strongly Disagree']}
          onChange={handleUseibChange}
          containerStyle={styles.valcontainer}
        />

        <LikertScale
          question={questionnaire.useic}
          options={['Strongly Agree', 'Agree', 'Slightly Agree', 'Neutral', 'Slightly Disagree', 'Disagree', 'Strongly Disagree']}
          onChange={handleUseicChange}
          containerStyle={styles.valcontainer}
        />

        <LikertScale
          question={questionnaire.quaa}
          options={['Strongly Agree', 'Agree', 'Slightly Agree', 'Neutral', 'Slightly Disagree', 'Disagree', 'Strongly Disagree']}
          onChange={handleQuaaChange}
          containerStyle={styles.valcontainer}
        />

        <LikertScale
          question={questionnaire.ada}
          options={['Strongly Agree', 'Agree', 'Slightly Agree', 'Neutral', 'Slightly Disagree', 'Disagree', 'Strongly Disagree']}
          onChange={handleAdaChange}
          containerStyle={styles.valcontainer}
        />

        <LikertScale
          question={questionnaire.adb}
          options={['Strongly Agree', 'Agree', 'Slightly Agree', 'Neutral', 'Slightly Disagree', 'Disagree', 'Strongly Disagree']}
          onChange={handleAdbChange}
          containerStyle={styles.valcontainer}
        />
        
        <View style={styles.valcontainer}>
          <EduScale
            question={questionnaire.q1}
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

        <LikertScale
          question={questionnaire.q2}
          options={['Computer Science / Engineering', 'Creative Media / Design', 'Environmental Science', 'Physics / Chemistry / Biology', 'Business / Finance', 'Law', 'Medical Science / Healthcare', 'Publishing', 'Education', 'Social Science / Humanity', 'Service industry']}
          onChange={handleWorkfChange}
          containerStyle={[styles.valcontainer, {marginTop: 5}]}
        />

        <LikertScale
          question={questionnaire.q3}
          options={['American Indian or Alaskan Native', 'Asian', 'Black or African American', 'Caucasian or White', 'Hispanic or Latino', 'Native Hawaiian or Other Pacific Islander', 'Multiracial / Other', 'Prefer not to say']}
          onChange={handleRaceChange}
          containerStyle={[styles.valcontainer, {marginTop: 5}]}
        />

        <LikertScale
          question={questionnaire.q4}
          options={['extroverted', 'neutral', 'introverted']}
          onChange={handleHperChange}
          containerStyle={[styles.valcontainer, {marginTop: 5}]}
        />

        <View style={[styles.valcontainer, {marginTop: 10}]}>
          <Text style={[styles.question, {marginBottom: 10}]}>{questionnaire.q5}</Text>
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
            if (acca != '' && expa != '' && expb != '' && expc != '' && intera != '' && usefa != '' && usefb != '' && trusta != '' && trustb != '' && eata != '' && useia != '' && useib != '' && useic != '' && quaa != '' && ada != '' && adb != '' && edul != '' && workf != '' && race != '' && hper != '' && feedback != '')
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
                setDis(true);
                let status = await endapi(userId, acca, expa, expb, expc, intera, usefa, usefb, trusta, trustb, eata, useia, useib, useic, quaa, ada, adb, edul + '(' + edut + ')', workf, race, hper, feedback);
                console.log('status', status);
                setWarn('');
                setBt('Feedback submitted!');
                navigation.navigate('ID');
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
    marginBottom: 10,
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
    marginTop: 15,
    marginBottom: 15,
  },

  subTitle: {
    fontFamily: 'Roboto',
    fontSize: 18,
    color: '#597E52',
    fontWeight:'bold',
    marginLeft: 75,
  },

  title: {
    fontFamily: 'Roboto',
    fontSize: 40,
    color: '#597E52',
    fontWeight:'bold',
  },

  input: {
    fontSize: 16,
    border: 'none',
    width: '150%',
    height: '100%',
    marginLeft: 75,
    outlineWidth: 'none',
  },

  line: {
    width: '150%',
    height: 1,
    backgroundColor: 'black',
    marginLeft: 75,
    borderWidth: 1,
  },

  question: {
    fontFamily: 'Roboto',
    fontSize: 16,
    color: 'black',
    fontWeight:'bold',
    paddingHorizontal: 75,
  },

  button: {
    flexDirection: 'column',
    marginLeft: 75,
    width: '80%',
    height: '30%',
    backgroundColor: "#86A789",
    justifyContent: 'center',
    alignItems: "center",
    left: '215%',
  },

  buttonText: {
    fontFamily: "Roboto",
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 16,
  },

  warntexts: {
    fontFamily: 'Roboto',
    fontSize: 12,
    color: 'red',
    marginLeft: 75
  },

  bot: {
    width: 70,
    height: 70,
  },
});