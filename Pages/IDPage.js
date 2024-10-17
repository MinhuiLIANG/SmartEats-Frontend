import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Pressable, Dimensions, Image } from 'react-native';
import Proid from '../Getapi/getproid';
import useGlobalStore from '../store/store';

const screenWidth = Dimensions.get('window').width;
const ScreenHeight = Dimensions.get('window').height;
const px = 0.65 * Math.min(screenWidth / 320, ScreenHeight / 640);
export default function IDPage() {
  const chatContainerWidth = screenWidth * 0.8;
  const [proid, setProid] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [buttonColor, setButtonColor] = useState('gray');
  const [buttonText, setButtonText] = useState('Finish the survey');
  const [warn, setWarn] = useState('');
  const [dis, setDis] = useState(false);

  const [surveytime, setSurveytime] = useState(null);

  const { userId } = useGlobalStore();
  const { starttime } = useGlobalStore();

  const handleProidChange = (event) => {
    setWarn('');
    setProid(event.target.value);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  useEffect(() => {
    if (proid != '') 
    {
      setButtonColor('#86A789');
    } else 
    {
      setButtonColor('gray');
    }
  }, [proid]);

  useEffect(() => {
    let endtime = new Date();
    let timeDifference = endtime - starttime;
    let secondsDifference = timeDifference / 1000;
    console.log('surveytime: ', secondsDifference);
    setSurveytime(secondsDifference);
  }, []);

  return (
  <View style={styles.container}>
    <View style={styles.titleContainer}>
      <Text style={styles.title}>{'A Survey Study on Chatbot-Based Dietary Recommendation'}</Text>
    </View>
    <View style={{
        flex: 9,
        width: chatContainerWidth,
        backgroundColor: 'white',
        paddingHorizontal: 10 * px,
        borderRadius: 15 * px,
        borderWidth: 2 * px,
        borderColor: 'black',
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: 'center',
        alignSelf: 'center',
    }}>
      <View style={styles.eleContainerPlus}>
        <Text style={styles.subTitle}>{"Thank you for participating in our study! 🎉\nWe will follow up with a short survey checking your diet in one week. 💖"}</Text>
      </View>
      <View style={styles.eleContainerSub}>
        <Text style={styles.subTitle}>{' '}</Text>
      </View>
      <View style={styles.eleContainer}>
        <Text style={styles.question}>{"Please enter your prolific ID or FPS (for Hong Kong participants only): "}</Text>
        <Text style={styles.promptTexts}>{"(make sure you click “Finish the survey” button before leaving):"}</Text>
        <div className="input-line">
          <input
          type="text"
          value={proid}
          onChange={handleProidChange}
          placeholder="Please enter your prolific ID or FPS here"
          style={styles.input}
          />
          <View style={styles.line} />
        </div>
        <Text style={styles.code}>{' '}</Text>
        <Text style={styles.code}>{' '}</Text>
        <Text style={styles.code}>{' '}</Text>
        <Text style={styles.code}>Your completion code: C2FX1FPE</Text>
      </View>
      <View style={styles.eleContainerSub}>
        <Text style={styles.warnText}>{warn}</Text>
      </View>

    </View>
    <View style={styles.subTitleContainer}>
      <Pressable
        style={[{
          width: screenWidth * 0.10,
          height: ScreenHeight * 0.03,
          backgroundColor: buttonColor,
          justifyContent: 'center',
          alignItems: "center",
          marginRight: screenWidth * 0.1,
        }, isFocused && {backgroundColor: "#597E52",}]}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onPress={async() => {
          if(proid != '')
          {
            setDis(true);
            setWarn('');
            let status = await Proid(userId,proid,surveytime);
            console.log('status', status);
            setButtonText('Submitted 🎊')
          }
          else
          {
            setWarn('Please enter your prolific ID');
          }
        }}
        disabled = {dis}
          >
        <Text style={styles.texts}>{buttonText}</Text>
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
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: 'white',
  },

  subTitleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: 'white',
    alignSelf: 'flex-end',
  },

  eleContainer: {
    flex: 1.5,
    backgroundColor: 'white',
  },

  eleContainerPlus: {
    flex: 1.8,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundColor: 'white',
  },

  eleContainerSub: {
    flex: 0.5,
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
    fontSize: 30 * px,
    color: 'black',
    fontWeight:'bold',
  },

  question: {
    fontFamily: 'Arial',
    fontSize: 18 * px,
    color: '#597E52',
    fontWeight:'bold',
    marginLeft: 30 * px,
    marginBottom: 10 * px,
  },

  texts: {
    fontFamily: 'Arial',
    fontSize: 16 * px,
    color: 'white',
  },

  code: {
    fontFamily: 'Arial',
    fontSize: 16 * px,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 30 * px,
  },

  promptTexts: {
    fontFamily: 'Arial',
    fontSize: 15 * px,
    color: 'black',
    marginLeft: 30 * px,
    marginBottom: 10 * px,
  },

  bot: {
    marginBottom: 20 * px,
    marginLeft: 15 * px,
    width: 65 * px,
    height: 65 * px,
  },

  input: {
    fontSize: 16 * px,
    border: 'none',
    width: '63%',
    height: '100%',
    marginLeft: 30 * px,
    outlineWidth: 'none',
  },

  line: {
    width: '63%',
    height: 1 * px,
    backgroundColor: 'black',
    marginLeft: 30 * px,
    borderWidth: 1 * px,
  },

  warnText: {
    fontFamily: 'Arial',
    fontSize: 14 * px,
    color: 'red',
  }
});
