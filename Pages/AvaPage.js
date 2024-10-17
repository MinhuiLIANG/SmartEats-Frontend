import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, Dimensions, Image } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const ScreenHeight = Dimensions.get('window').height;
const px = 0.65 * Math.min(screenWidth / 320, ScreenHeight / 640);
export default function AvaPage({ navigation }) {
  const chatContainerWidth = screenWidth * 0.8;
  const [isFocused, setIsFocused] = useState(false);
  const [dis, setDis] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
  <View style={styles.container}>
    <View style={styles.titleContainer}>
      <Text style={styles.title}>{'A Survey Study on Chatbot-Based Dietary Recommendation'}</Text>
    </View>
    <View style={{
        height: ScreenHeight * 0.8,
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
        <View style={{
            height: ScreenHeight * 0.6,
            width: screenWidth * 0.5,
            backgroundColor: 'white',
            paddingHorizontal: 10 * px,
            borderRadius: 15 * px,
            borderWidth: 1.5 * px,
            borderColor: 'white',
            flexDirection: 'column',
            justifyContent: "center",
            alignItems: 'center',
            alignSelf: 'center',
            marginBottom: 50 * px,
        }}>

            <Text style={styles.textsub}>{"During our conversation, I normally respond with an "}<Text style={styles.textbBold}>{'facial expressions'}</Text>{" like "}<Text style={styles.textbBold}>{'[default]'}</Text>{'. If you see '}<Text style={styles.textbBold}>{'[typing]'}</Text>{", that means that I'm still work on generating a response."}</Text>

            <View style={[styles.avatar, {marginTop: 15 * px}]}>
                <View style={styles.sigAva}>
                    <Image style={styles.bot} source={require('../assets/neutral.png')}/>
                    <Text style={styles.textbBold}>{'[default]'}</Text>
                </View>

                <Text style={styles.title}>{'   '}</Text>

                <View style={styles.sigAva}>
                    <Image style={styles.bot} source={require('../assets/waiting.png')}/>
                    <Text style={styles.textbBold}>{'[typing]'}</Text>
                </View>
            </View>

            <Text style={styles.textsub}>{' '}</Text>

            <Text style={styles.textsub}>{"Sometimes, I also change my "}<Text style={styles.textbBold}>{'facial expressions'}</Text>{" on how I feel. Here are some examples and what they mean."}</Text>

            <View style={[styles.avatar, {marginTop: 15 * px}]}>
                <View style={styles.sigAva}>
                <Image style={styles.bot} source={require('../assets/positive.png')}/>
                <Text style={styles.textbBold}>{'[happy]'}</Text>
                </View>

                <Text style={styles.title}>{'   '}</Text>

                <View style={styles.sigAva}>
                <Image style={styles.bot} source={require('../assets/negative.png')}/>
                <Text style={styles.textbBold}>{'[sad]'}</Text>
                </View>

                <Text style={styles.title}>{'   '}</Text>

                <View style={styles.sigAva}>
                <Image style={styles.bot} source={require('../assets/rec.png')}/>
                <Text style={styles.textbBold}>{'[excited]'}</Text>
                </View>

                <Text style={styles.title}>{'   '}</Text>

                <View style={styles.sigAva}>
                <Image style={styles.bot} source={require('../assets/congrats.png')}/>
                <Text style={styles.textbBold}>{'[content]'}</Text>
                </View>

                <Text style={styles.title}>{'   '}</Text>

                <View style={styles.sigAva}>
                <Image style={styles.bot} source={require('../assets/sorry.png')}/>
                <Text style={styles.textbBold}>{'[sorry]'}</Text>
                </View>
            </View>

        </View>

    </View>
    <View style={styles.subTitleContainer}>
      <Pressable
        style={[{
          width: screenWidth * 0.105,
          height: ScreenHeight * 0.03,
          backgroundColor: '#86A789',
          justifyContent: 'center',
          alignItems: "center",
          marginRight: screenWidth * 0.1,
        }, isFocused && {backgroundColor: "#597E52",}]}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onPress={() => {
          setDis(true);
          navigation.navigate('SmartEats-Chat');
        }}
        disabled = {dis}
          >
        <Text style={styles.texts}>{"Next: Let's talk"}</Text>
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
    height: ScreenHeight * 0.1,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: 'white',
  },

  subTitleContainer: {
    height: ScreenHeight * 0.1,
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: 'white',
    alignSelf: 'flex-end',
  },

  title: {
    fontFamily: 'Arial',
    fontSize: 40 * px,
    color: '#597E52',
    fontWeight:'bold',
  },

  texts: {
    fontFamily: 'Arial',
    fontSize: 16 * px,
    color: 'white',
  },

  avatar: {
    backgroundColor: 'white',
    paddingHorizontal: 10 * px,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  sigAva: {
    backgroundColor: 'white',
    paddingHorizontal: 10 * px,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  textsub: {
    fontFamily: 'Arial',
    fontSize: 18 * px,
    color: 'black',
  },

  textbBold: {
    fontFamily: 'Arial',
    fontSize: 18 * px,
    color: 'black',
    fontWeight:'bold',
  },

  bot: {
    width: 75 * px,
    height: 75 * px,
  },

});
