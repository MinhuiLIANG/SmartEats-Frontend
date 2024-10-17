import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Pressable, Dimensions, Image } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const ScreenHeight = Dimensions.get('window').height;
const px = 0.65 * Math.min(screenWidth / 320, ScreenHeight / 640);
export default function TestPage({ navigation }) {
  const chatContainerWidth = screenWidth * 0.8;
  const [proid, setProid] = useState('');
  const [pwd, setPwd] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [buttonColor, setButtonColor] = useState('gray');
  const [buttonText, setButtonText] = useState('Next: Introduction');
  const [warn, setWarn] = useState('');
  const [dis, setDis] = useState(false);

  const userid = 'tester'
  const pattern = /^DTSGX[abcdefghijklmnopqrstuvwxyz]$/;

  function isMatchingPattern(string) {
    return pattern.test(string);
  }

  const handleProidChange = (event) => {
    setWarn('');
    setProid(event.target.value);
  };

  const handlePwdChange = (event) => {
    setWarn('');
    setPwd(event.target.value);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  useEffect(() => {
    if (proid == userid && isMatchingPattern(pwd))
    {
      setButtonColor('#86A789');
    } else 
    {
      setButtonColor('gray');
    }
  }, [proid, pwd]);

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
      <View style={styles.eleContainer}>
        <Text style={styles.question}>{"Please enter your ID: "}</Text>
        <div className="input-line">
          <input
          type="text"
          value={proid}
          onChange={handleProidChange}
          placeholder="Please enter your ID here"
          style={styles.input}
          />
          <View style={styles.line} />
        </div>
        <Text style={{fontSize:20 * px, color: 'white'}}>{' '}</Text>
        <Text style={{fontSize:20 * px, color: 'white'}}>{' '}</Text>
        <Text style={styles.question}>{"Please enter your password: "}</Text>
        <div className="input-line">
          <input
          type="text"
          value={pwd}
          onChange={handlePwdChange}
          placeholder="Please enter your password here"
          style={styles.input}
          />
          <View style={styles.line} />
        </div>
        <Text style={{fontSize:20 * px, color: 'white'}}>{' '}</Text>
        <Text style={{fontSize:20 * px, color: 'white'}}>{' '}</Text>
        <Text style={{fontFamily: 'Arial',fontSize: 18 * px,}}>{"For better readability of the webpage, please make sure your browser is in its "}<Text style={{fontWeight:'bold'}}>{"maximal"}</Text>{" width."}</Text>
      </View>
      <View style={styles.eleContainerSub}>
        <Text style={styles.warnText}>{warn}</Text>
      </View>

    </View>
    <View style={styles.subTitleContainer}>
      <Pressable
        style={[{
          width: screenWidth * 0.105,
          height: ScreenHeight * 0.03,
          backgroundColor: buttonColor,
          justifyContent: 'center',
          alignItems: "center",
          marginRight: screenWidth * 0.1,
        }, isFocused && {backgroundColor: "#597E52",}]}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onPress={async() => {
          if(proid == userid && isMatchingPattern(pwd))
          {
            setDis(true);
            setWarn('');
            navigation.navigate('SmartEats-Introduction');
          }
          else
          {
            setWarn('Incorrect user name or password.');
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
    flex: 3,
    flexDirection: 'column',
    backgroundColor: 'white',
    justifyContent: "center",
    alignItems: 'flex-start',
    marginTop: 50 * px,
  },


  eleContainerSub: {
    flex: 0.5,
    flexDirection: 'column',
    backgroundColor: 'white',
    justifyContent: "center",
    alignItems: 'center',
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
    marginBottom: 10 * px,
  },

  texts: {
    fontFamily: 'Arial',
    fontSize: 16 * px,
    color: 'white',
  },

  promptTexts: {
    fontFamily: 'Arial',
    fontSize: 15 * px,
    color: 'black',
    marginLeft: 112 * px,
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
    width: '150%',
    height: '100%',
    outlineWidth: 'none',
  },

  line: {
    width: '150%',
    height: 1 * px,
    backgroundColor: 'black',
    borderWidth: 1 * px,
  },

  warnText: {
    fontFamily: 'Arial',
    fontSize: 14 * px,
    color: 'red',
  }
});
