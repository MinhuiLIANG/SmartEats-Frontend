import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {ScrollView, StyleSheet, Text, View, Pressable, Dimensions, Image, SafeAreaView, ActivityIndicator} from 'react-native';
import botapi from '../Getapi/getbot';
import Custest from '../Getapi/getcus';
import { fixsents } from '../fixedans/fixes';
import { qualisents } from '../fixedans/fixquali';
import { warnsents } from '../fixedans/warning';
import useGlobalStore from '../store/store';

const screenWidth = Dimensions.get('window').width;
const ScreenHeight = Dimensions.get('window').height;
const px = 0.65 * Math.min(screenWidth / 320, ScreenHeight / 640);

export default function CusPage({ navigation }) {
  const chatContainerWidth = screenWidth * 0.8;

  const [per, setPer] = useState('');
  const [style, setStyle] = useState('');
  const [cha, setCha] = useState('');

  const [isFocused, setIsFocused] = useState(false);
  const [isFocusedl, setIsFocusedl] = useState(false);
  const [isFocusedr, setIsFocusedr] = useState(false);
  const [buttonColor, setButtonColor] = useState('gray');

  const [dis, setDis] = useState(false);
  const [dist, setDist] = useState(false);
  const [disper1, setDisper1] = useState(false);
  const [disper3, setDisper3] = useState(false);
  const [diss1, setDiss1] = useState(false);
  const [diss2, setDiss2] = useState(false);

  const [warn, setWarn] = useState('');

  const { userId } = useGlobalStore();

  const [per1isPressed, setPer1isPressed] = useState(false);
  const [per3isPressed, setPer3isPressed] = useState(false);

  const [s1isPressed, setS1isPressed] = useState(false);
  const [s2isPressed, setS2isPressed] = useState(false);

  const [prepressed, setPrepressed] = useState(false);

  const [testtext, setTesttext] = useState('');
  const [pretext, setPretext] = useState('Preview');

  const [load, setLoad] = useState(false);

  const per1 = 'extroverted';
  const per3 = 'introverted';

  const s1 = 'casually';
  const s2 = 'formally';

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleFocusl = () => {
    setIsFocusedl(true);
  };

  const handleFocusr = () => {
    setIsFocusedr(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleBlurl = () => {
    setIsFocusedl(false);
  };

  const handleBlurr = () => {
    setIsFocusedr(false);
  };

  const handlePer1Press = () => {
    if (per1isPressed) 
    {
      setPer1isPressed(false);
      setPer('');
    } 
    else 
    {
      setPer1isPressed(true);
      setPer(per1);
      setPer3isPressed(false);
    }
  };


  const handlePer3Press = () => {
    if (per3isPressed) 
    {
      setPer3isPressed(false);
      setPer('');
    } 
    else 
    {
      setPer3isPressed(true);
      setPer(per3);
      setPer1isPressed(false);
    }
  };

  const handleS1Press = () => {
    let tmp = style;
    if (s1isPressed) 
    {
      setS1isPressed(false);
      if (style == s1)
      {
        setStyle('');
      }
      else
      {
        let tmp1 = tmp.replace(new RegExp(' and ' + s1, 'g'), '').replace(new RegExp(s1, 'g'), '');
        if (tmp1.startsWith(' and'))
        {
          tmp1 = tmp1.replace(' and ', '');
        }
        setStyle(tmp1);
      }
    } 
    else 
    {
      setS1isPressed(true);
      if (style == '')
      {
        setStyle(s1);
      }
      else{
        setS2isPressed(false);
        let tmp1 = tmp.replace(new RegExp(' and ' + s2, 'g'), '').replace(new RegExp(s2, 'g'), '');
        if (tmp1.startsWith(' and'))
        {
          tmp1 = tmp1.replace(' and ', '');
        }
        
        if (tmp1 == '')
        {
          setStyle(s1);
        }
        if (tmp1 != '')
        {
          setStyle(tmp1 + ' and ' + s1);
        }
      }
    }
  };

  const handleS2Press = () => {
    let tmp = style;
    if (s2isPressed) 
    {
      setS2isPressed(false);
      if (style == s2)
      {
        setStyle('');
      }
      else
      {
        let tmp1 = tmp.replace(new RegExp(' and ' + s2, 'g'), '').replace(new RegExp(s2, 'g'), '');
        if (tmp1.startsWith(' and'))
        {
          tmp1 = tmp1.replace(' and ', '');
        }
        setStyle(tmp1);
      }
    } 
    else 
    {
      setS2isPressed(true);
      if (style == '')
      {
        setStyle(s2);
      }
      else{
        setS1isPressed(false);
        let tmp1 = tmp.replace(new RegExp(' and ' + s1, 'g'), '').replace(new RegExp(s1, 'g'), '');
        if (tmp1.startsWith(' and'))
        {
          tmp1 = tmp1.replace(' and ', '');
        }

        if (tmp1 == '')
        {
          setStyle(s2);
        }
        if (tmp1 != '')
        {
          setStyle(tmp1 + ' and ' + s2);
        }
      }
    }
  };

  const handleChangeCha = (event) => {
    const { value } = event.target;
    const words = value.split(' ');
    if (words.length <= 30) {
      setCha(value);
    }
    else
    {
      setWarn(warnsents.cuscha);
    }
  };

  useEffect(() => {
    if (per != '' && style != '') 
    {
      setButtonColor('#86A789');
      setWarn('');
    } else 
    {
      setButtonColor('gray');
    }
  }, [per, style]);

  return (
    <SafeAreaView style={{flex: 1}}>
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{'A Survey Study on Chatbot-Based Dietary Recommendation'}</Text>
      </View>
      <ScrollView contentContainerStyle={{
            flexGrow: 9,
            backgroundColor: 'white',
            paddingHorizontal: 10 * px,
            borderRadius: 15 * px,
            width: chatContainerWidth,
            borderWidth: 2 * px,
            borderColor: 'black',
            flexDirection: 'column',
            justifyContent: 'center',
            alignSelf: 'center',
            overflow: 'hidden'
        }}>
        <View style={styles.valcontainerSub}>
          <Text style={styles.questionPlus}>{qualisents.cus}</Text>
        </View>
        <View style={styles.columContainer}>
        <View style={styles.leftColumn}>
        <View style={{flex: 1.5,}}>

        <View style={[styles.valcontainerMid, {top: '5%'}]}>
          <Text style={styles.question}>{'1. I want the personality of the chatbot as a nutrition expert to be:'}</Text>
          <Text style={styles.spaceText}>{'  '}</Text>
          <View style={styles.buttoncontainer}>
            <Pressable
              style={[styles.button_sub, per1isPressed && styles.buttonPressed]}
              onPress={handlePer1Press}
              disabled={disper1}
            >
              <Text style={styles.buttonText_sub}>{per1}</Text>
            </Pressable>

            <Pressable
              style={[styles.button_sub, {marginLeft: 18 * px}, per3isPressed && styles.buttonPressed]}
              onPress={handlePer3Press}
              disabled={disper3}
            >
              <Text style={styles.buttonText_sub}>{per3}</Text>
            </Pressable>
          </View>

        </View>

        <View style={[styles.valcontainer, {marginBottom: 15 * px, top: '10%'}]}>
          <Text style={styles.question}>{'2. I want the chatbot to speak:'}</Text>
          <Text style={styles.spaceText}>{'  '}</Text>
          <View style={styles.buttoncontainer}>
            <Pressable
              style={[styles.button_subM, s1isPressed && styles.buttonPressed]}
              onPress={handleS1Press}
              disabled={diss1}
            >
              <Text style={styles.buttonText_sub}>{s1}</Text>
            </Pressable>

            <Pressable
              style={[styles.button_subM, {marginLeft: 18 * px}, s2isPressed && styles.buttonPressed]}
              onPress={handleS2Press}
              disabled={diss2}
            >
              <Text style={styles.buttonText_sub}>{s2}</Text>
            </Pressable>

          </View>
        </View>

        <View style={[styles.valcontainer, {marginBottom: 15 * px, top: '15%'}]}>
          <Text style={styles.question}>{"3. Add additional characteristics you would like to the chatbot to be. This can be anything, including:"}</Text>
          <View style={{marginLeft: 80 * px}}>
            <ul>
            <li><Text style={{fontFamily: 'Arial', fontSize: 16 * px, color: 'black',}}>Specialized nutrition expertise or training background</Text></li>
              <li><Text style={{fontFamily: 'Arial', fontSize: 16 * px, color: 'black',}}>Tones or use of words</Text></li>
              <li><Text style={{fontFamily: 'Arial', fontSize: 16 * px, color: 'black',}}>Role play a specific person</Text></li>
              <li><Text style={{fontFamily: 'Arial', fontSize: 16 * px, color: 'black',}}>Cultural backgrounds</Text></li>
              <li><Text style={{fontFamily: 'Arial', fontSize: 16 * px, color: 'black',}}>...</Text></li>
            </ul>
          </View>
          <Text style={styles.question}>{"It is not necessary to follow the above hints. You are encouraged to be creative in terms of an idealized chatbot for your dietary recommendation. Please limit your description to 30 words, and describe the additional characteristics of the chatbot in the first person (e.g., I am ..., I will ...) for better model performance (optional)"}</Text>
          <Text style={styles.spaceText}>{'  '}</Text>
          <div className="input-line">
            <input
            type="text"
            value={cha}
            onChange={handleChangeCha}
            placeholder='Add additional characteristics you like here.'
            style={styles.input}
            disabled={prepressed}
            />
            <View style={styles.line} />
          </div>
        </View>

        </View>

        </View>

        <View style={styles.rightColumn}>
          <View style={styles.spaceSub}>
          </View>

            { prepressed === false? (
            <View style={styles.bubble}>
              <View style={{flex: 0.5, flexDirection:'row', alignItems: 'center', marginLeft: 15*px, marginTop: 30*px}}>
                <Image style={styles.botmini} source={require('../assets/neutral.png')}/>
                <Text style={[styles.textsub, {fontWeight: 'bold', marginTop: 35*px}]}>:</Text>
              </View>
              <View style={{flex: 1, flexDirection:'column', justifyContent: 'flex-start'}}>
                <Text style={[styles.textsub, {paddingHorizontal: 30*px}]}>{fixsents.cus}</Text>
              </View>
              <View style={{flex: 1, flexDirection:'row', alignItems: 'center', justifyContent:'center'}}>
                <Pressable
                  style={[{
                    width: screenWidth * 0.08,
                    height: ScreenHeight * 0.03,
                    backgroundColor: buttonColor,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: "center",
                    alignSelf: "center",
                  }, isFocused && per!='' && style!='' && {backgroundColor: "#597E52",}]}
                  onPress={async() => {
                    if (per == '')
                    {
                      setWarn(warnsents.cusp);
                    }
                    else if (style == '')
                    {
                      setWarn(warnsents.cuss);
                    }
                    else
                    {
                      setWarn('');

                      setPretext('Generating ');
                      setLoad(true);

                      setDis(true);
                      setDist(false);

                      setDisper1(true);
                      setDisper3(true);
                      setDiss1(true);
                      setDiss2(true);

                      let sent = await Custest(userId,per,style,cha);

                      setTesttext(sent);

                      setPrepressed(true);
                    }
                  }}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  disabled = {dis}
                >
                  <Text style={styles.buttonText}>{pretext}</Text>
                  {load == true? (<ActivityIndicator style = {{justifyContent: 'flex-start', marginLeft: 5}} size="small" color="white" />) : null}
                </Pressable>
              </View>
            </View>
            )
            :(
            <View style={styles.bubble}>
              <View style={{flex: 0.5, flexDirection:'row', alignItems:'center', marginLeft: 15*px, marginTop: 30*px}}>
                <Image style={styles.botmini} source={require('../assets/neutral.png')}/>
                <Text style={[styles.textsub, {fontWeight: 'bold', marginTop: 35*px}]}>:</Text>
              </View>
              <View style={{flex: 1, flexDirection:'column', justifyContent: 'flex-start'}}>
                <Text style={[styles.textsub, {paddingHorizontal: 30*px}]}>{testtext}</Text>
              </View>
              <View style={{flex: 1, flexDirection:'row', alignItems: 'center', justifyContent:'center'}}>
                <Pressable
                  style={{
                    width: screenWidth * 0.06,
                    height: ScreenHeight * 0.03,
                    backgroundColor: '#86A789',
                    justifyContent: 'center',
                    alignItems: "center",
                  }}
                  onPress={() => {
                    setDist(true);
                    setDis(false);
                    setIsFocused(false);

                    setDisper1(false);
                    setDisper3(false);
                    setDiss1(false);
                    setDiss2(false);

                    setPer('');
                    setStyle('');

                    setIsFocusedl(false);
                    setPer1isPressed(false);
                    setPer3isPressed(false);
                    setS1isPressed(false);
                    setS2isPressed(false);

                    setLoad(false);

                    setPretext('Preview');
                    
                    setPrepressed(false);
                  }}
                  onFocus={handleFocusl}
                  onBlur={handleBlurl}
                  disabled = {dist}
                >
                  <Text style={styles.buttonText}>{'Reset'}</Text>
                </Pressable>
                <Text style={styles.textsub}>{'          '}</Text>
                <Pressable
                  style={{
                    width: screenWidth * 0.115,
                    height: ScreenHeight * 0.03,
                    backgroundColor: '#86A789',
                    justifyContent: 'center',
                    alignItems: "center",
                  }}
                  onPress={async() => {
                    if (per == '')
                    {
                      setWarn(warnsents.cusp);
                    }
                    else if (style == '')
                    {
                      setWarn(warnsents.cuss);
                    }
                    else
                    {
                      setWarn('');
                      setDist(true);
                      let status = await botapi(userId,per,style,cha);
                      console.log('status', status);
                      navigation.navigate('SmartEats-ChatbotAvatar');
                    }
                  }}
                  onFocus={handleFocusr}
                  onBlur={handleBlurr}
                  disabled = {dist}
                >
                  <Text style={styles.buttonText}>{'Next: Chatbot Avatar'}</Text>
                </Pressable>
              </View>
            </View>
            )
            }
        </View>
        </View>
        <View style={styles.warncontainer}>
          <Text style={styles.warntexts}>{warn}</Text>
        </View>
        
      </ScrollView>

      <View style={styles.bottomContainer}>

      </View>
      <StatusBar style="auto" />
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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

  bottomContainer: {
    flex: 0.5,
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: 'white',
    alignSelf: 'flex-end',
  },

  columContainer: {
    flex: 1,
    flexDirection: 'row',
  },

  leftColumn: {
    flex: 1,
    padding: 10 * px,
    flexDirection: 'column',
    justifyContent: 'center',
  },

  rightColumn: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10 * px,
    justifyContent: 'center',
    alignItems: 'center',
  },

  bubble: {
    flex: 1.5,
    backgroundColor: 'white',
    paddingHorizontal: 10 * px,
    borderRadius: 15 * px,
    width: '90%',
    borderWidth: 1.5 * px,
    borderColor: 'black',
    flexDirection: 'column',
    justifyContent: 'center',
  },

  bubbleText: {
    flex: 0.6,
    backgroundColor: 'white',
    paddingHorizontal: 10 * px,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },

  bubbleTextSub: {
    flex: 0.09,
    backgroundColor: 'white',
    paddingHorizontal: 10 * px,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },

  avatar: {
    backgroundColor: 'white',
    paddingHorizontal: 10 * px,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  sigAva: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 10 * px,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  space: {
    flex: 0.1,
    backgroundColor: 'white',
    width: '90%',
    paddingHorizontal: 10 * px,
    flexDirection: 'column',
    justifyContent: 'center',
  },

  spaceSub: {
    flex: 0.06,
    backgroundColor: 'white',
    width: '90%',
    paddingHorizontal: 10 * px,
    flexDirection: 'column',
    justifyContent: 'center',
  },

  title: {
    fontFamily: 'Arial',
    fontSize: 40 * px,
    color: '#597E52',
    fontWeight:'bold',
  },

  valcontainer:{
    flexDirection: 'column',
    alignItems: "flex-start",
    justifyContent: "center",
    backgroundColor: 'white',
  },

  valcontainerMid:{
    flexDirection: 'column',
    alignItems: "flex-start",
    justifyContent: "center",
    backgroundColor: 'white',
  },

  valcontainerSub:{
    flex: 0.15,
    flexDirection: 'column',
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: 'white',
  },

  warncontainer:{
    flex: 0.1,
    flexDirection: 'column',
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: 'white',
  },


  buttoncontainer:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'start',
    paddingHorizontal: 15 * px,
    width: '92%',
    paddingHorizontal: 75 * px,
  },

  buttoncontainerStyle:{
    flexDirection: 'column',
    alignItems: 'start',
    justifyContent: 'center',
    paddingHorizontal: 15 * px,
    width: '92%',
    paddingHorizontal: 75 * px,
    marginBottom: 10 * px,
  },

  dropDownContainer: {
    height: '90%',
  },

  input: {
    fontSize: 16 * px,
    padding: 0,
    border: 'none',
    width: '150%',
    height: '120%',
    paddingHorizontal: 15 * px,
    marginLeft: 75 * px,
    outlineWidth: 'none',
  },

  line: {
    width: '150%',
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

  concator: {
    fontFamily: 'Arial',
    fontSize: 17 * px,
    color: 'black',
    fontWeight:'bold',
  },

  textsub: {
    fontFamily: 'Arial',
    fontSize: 17 * px,
    color: 'black',
  },

  textsubS: {
    fontFamily: 'Arial',
    fontSize: 5 * px,
    color: 'black',
  },

  textsubTittle: {
    fontFamily: 'Arial',
    fontSize: 22 * px,
    color: 'black',
    fontWeight:'bold',
  },

  textsubBold: {
    fontFamily: 'Arial',
    fontSize: 15 * px,
    color: '#597E52',
    fontWeight:'bold',
  },

  textbBold: {
    fontFamily: 'Arial',
    fontSize: 15 * px,
    color: 'black',
    fontWeight:'bold',
  },

  questionPlus: {
    fontFamily: 'Arial',
    fontSize: 22 * px,
    color: '#597E52',
    fontWeight:'bold',
    paddingHorizontal: 75 * px,
    top: '30%',
  },

  warntexts: {
    fontFamily: 'Arial',
    fontSize: 12 * px,
    color: 'red',
    marginLeft: 75 * px
  },

  button: {
    flexDirection: 'column',
    marginLeft: 75 * px,
    width: '80%',
    height: '20%',
    backgroundColor: "#86A789",
    justifyContent: 'center',
    alignItems: "center",
    left: '170%',
  },

  buttonPressed: {
    backgroundColor: "#597E52",
  },

  buttonText: {
    fontFamily: "Arial",
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 16 * px,
  },

  button_sub: {
    backgroundColor: "gray",
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '28%',
    borderRadius: 20 * px,
    padding: 10 * px,
    borderColor: 'gray',
  },

  button_subStyle: {
    backgroundColor: "gray",
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '55%',
    borderRadius: 20 * px,
    padding: 10 * px,
    borderColor: 'gray',
  },

  button_subStylefr: {
    backgroundColor: "gray",
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '47%',
    borderRadius: 20 * px,
    padding: 10 * px,
    borderColor: 'gray',
  },

  button_subM: {
    backgroundColor: "gray",
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '23%',
    borderRadius: 20 * px,
    padding: 10 * px,
    borderColor: 'gray',
  },

  button_subMStyle: {
    backgroundColor: "gray",
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '53%',
    borderRadius: 20 * px,
    padding: 10 * px,
    borderColor: 'gray',
  },

  button_subS: {
    backgroundColor: "gray",
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '20%',
    borderRadius: 20 * px,
    padding: 10 * px,
    borderColor: 'gray',
  },

  button_subSStyle: {
    backgroundColor: "gray",
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '44%',
    borderRadius: 20 * px,
    padding: 10 * px,
    borderColor: 'gray',
  },

  button_subSStylefr: {
    backgroundColor: "gray",
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '36%',
    borderRadius: 20 * px,
    padding: 10 * px,
    borderColor: 'gray',
  },

  button_subP: {
    backgroundColor: "gray",
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40%',
    borderRadius: 20 * px,
    padding: 10 * px,
    borderColor: 'gray',
  },

  buttonText_sub: {
    fontFamily: "Arial",
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 16 * px,
  },

  spaceText: {
    fontFamily: "Arial",
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight:'bold',
    fontSize: 8 * px,
  },

  bot: {
    width: 80 * px,
    height: 80 * px,
    alignSelf: 'center',
  },

  botmini: {
    width: 65 * px,
    height: 65 * px,
  }
});
