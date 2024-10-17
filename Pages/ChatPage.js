import React, { useState, useCallback, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, Text, Pressable, Dimensions, Image } from 'react-native';
import { GiftedChat, Bubble, Send, MessageText, InputToolbar, Avatar } from 'react-native-gifted-chat';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ibapi from '../Getapi/getib';
import centerapi from '../Getapi/getcenter';
import getSenti from '../Getapi/getsenti';
import { fixsents } from '../fixedans/fixes';
import useGlobalStore from '../store/store';
import SVG from '../assets/openai-svgrepo-com.svg';

let end = false;
let control = true;
let rec = false;
let foodtmpo = 'none';
let foodtmpt = 'none';
let botword = '';

const screenWidth = Dimensions.get('window').width;
const ScreenHeight = Dimensions.get('window').height;
const px = 0.65 * Math.min(screenWidth / 320, ScreenHeight / 640);
function ChatPage({ navigation }) {
  const [messages, setMessages] = useState([]);
  const [dis, setDis] = useState(false);
  const [dissub, setDissub] = useState(false);
  const [disnav, setDisnav] = useState(false);

  const { userId } = useGlobalStore();

  const chatContainerWidth = screenWidth * 0.7;

  const chat_user = {
    _id: 1,
    name: 'user',
  }

  const bot = {
    _id: 2,
    name: 'chatbot',
    avatar: require('../assets/neutral.png'),
  }

  const chatbots = [
  {
    _id: 2,
    name: 'chatbot',
    avatar: require('../assets/neutral.png'),
  },
  {
    _id: 2,
    name: 'chatbot',
    avatar: require('../assets/positive.png'),
  },
  {
    _id: 2,
    name: 'chatbot',
    avatar: require('../assets/negative.png'),
  },
  {
    _id: 2,
    name: 'chatbot',
    avatar: require('../assets/congrats.png'),
  },
  {
    _id: 2,
    name: 'chatbot',
    avatar: require('../assets/rec.png'),
  },
  {
    _id: 2,
    name: 'chatbot',
    avatar: require('../assets/waiting.png'),
  },
  {
    _id: 2,
    name: 'chatbot',
    avatar: require('../assets/sorry.png'),
  },
  ];

  const [isr1fPressed, setIsr1fPressed] = useState(false);
  const [isr1sPressed, setIsr1sPressed] = useState(false);
  const [isr1ePressed, setIsr1ePressed] = useState(false);
  const [isr1nPressed, setIsr1nPressed] = useState(false);
  const [isr2fPressed, setIsr2fPressed] = useState(false);
  const [isr2sPressed, setIsr2sPressed] = useState(false);
  const [isr2ePressed, setIsr2ePressed] = useState(false);
  const [isr2nPressed, setIsr2nPressed] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  async function avaControl(id)
  {

    let tag = await getSenti(id);
    let ava_index = 0;
    if(tag == 'positive')
    {
      console.log('pos');
      ava_index = 1;
    }
    
    if(tag == 'negative')
    {
      console.log('neg');
      ava_index = 2;
    }
    
    if(tag == 'neutral')
    {
      console.log('neu');
      ava_index = 0;
    }

    return ava_index;
  }

  async function getib()
  {
    botsend('Typing', 5);
    let icebreak = await ibapi(userId);
    setMessages([
      {
        _id: 1,
        text: icebreak,
        createdAt: new Date(),
        user: bot,
      },
    ])
    onDelete();
  }

  useEffect(() => {
    control = true;
    getib();
    control = false;
  }, [])

  function removeFirstOccurrence(a, b) {
    const index = b.indexOf(a);
    if (index !== -1) {
      const before = b.slice(0, index);
      const after = b.slice(index + a.length);
      return before + after;
    }
    return b;
  }

  async function botchat(ans, controlsig, cfood)
  {
    //let sent = await chatapi(ans)
    let sent = await centerapi(userId, ans, controlsig, cfood);
    if (sent.includes(fixsents.ge1) || sent.includes(fixsents.ge2) || sent.includes(fixsents.be))
    {
      end = true;
    }
    if (sent.indexOf('[REC]') != -1)
    {
      //if rec == false
      let prefix = '';
      let afterfix = '';
      if (rec==false)
      {
        prefix = fixsents.prefix1;
        afterfix = fixsents.afterfix1;
        end = true;
      }
      if (rec==true)
      {
        prefix = fixsents.prefix2;
        afterfix = fixsents.afterfix2;
        end = true;
      }
      onDelete();
      botsend(prefix, 4);
      let lst = sent.split('[REC]');
      let sublist1 = lst[0].split('[CAT]');
      let sublist2 = lst[1].split('[CAT]');

      let subsublist1 = sublist1[0].split('[CLS]');
      let subsublist2 = sublist2[0].split('[CLS]');

      let food1 = subsublist1[0];
      let rec1 = subsublist1[1];
      let food2 = subsublist2[0];
      let rec2 = subsublist2[1];

      foodtmpo = food1;
      foodtmpt = food2;

      let rec1pro = removeFirstOccurrence(food1, rec1);
      let rec2pro = removeFirstOccurrence(food2, rec2);

      recsend(sublist1[1], food1 + '\n' + rec1);
      //botsend(food1 + '\n' + rec1pro);
      recsend(sublist2[1], food2 + '\n' + rec2);
      //botsend(food2 + '\n' + rec2pro);
      botsend(afterfix, 4);
      rec = true;
    }
    else
    {
      if (sent.indexOf('[CAT]') != -1)
      {
        let prefix = '';
        let afterfix = '';
        if (rec==false)
        {
          prefix = fixsents.prefix1;
          afterfix = fixsents.afterfix1;
          end = true;
        }
        if (rec==true)
        {
          prefix = fixsents.prefix2;
          afterfix = fixsents.afterfix2;
          end = true;
        }
        onDelete();
        botsend(prefix, 4);
        let lst = sent.split('[CAT]');

        let sublist = lst[0].split('[CLS]');

        let food = sublist[0];
        let rec = sublist[1];

        foodtmpo = food;
        foodtmpt = 'loss[ERROR]' + rec;

        recsend(lst[1], food + '\n' + rec);
        botsend(afterfix, 4);
        rec = true;
      }
      //
      if (sent.includes(fixsents.ge1) || sent.includes(fixsents.ge2) || sent.includes(fixsents.be))
      {
        if (sent.includes(fixsents.ge1) || sent.includes(fixsents.ge2))
        {
          onDelete();
          botsend(sent, 3);
        }
        if (sent.includes(fixsents.be))
        {
          onDelete();
          botsend(sent, 6);
        }
      }
      //
      else
      {
        let index = 0;
        console.log('index:**',index);
        onDelete();
        botsend(sent, index);
      }
    }
    control = false;
  }

  function botsend(sent, avaindex)
  {
    let botMessage = {
      _id: Math.round(Math.random() * 1000000),
      text: sent,
      createdAt: new Date(),
      user: bot,
    };
    if (avaindex != 'none')
    {
      botMessage = {
        _id: Math.round(Math.random() * 1000000),
        text: sent,
        createdAt: new Date(),
        user: chatbots[avaindex],
      };
    }

    botword = sent;
    setMessages(previousMessages => GiftedChat.append(previousMessages, botMessage));
  }

  function usersend(sent)
  {
    let userMessage = {
      _id: Math.round(Math.random() * 1000000),
      text: sent,
      createdAt: new Date(),
      user: chat_user,
    };
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, userMessage),
    );
  }

  function recsend(img, text)
  {
    let botMessage = {
      _id: Math.round(Math.random() * 1000000),
      image: img,
      text: text,
      createdAt: new Date(),
      user: chatbots[4],
    };
    setMessages(previousMessages => GiftedChat.append(previousMessages, botMessage));
  }

  function onDelete()
  {
    setMessages(previousMessages => previousMessages.filter(message => message.text !== "Typing" && message.text !== "Got you. Searching for food... This process may take a while" && message.text !== "I see. Trying to search for alternative options... This process may take a while"));
  }

  function highlightSubstring(text, substring, substring_, fontWeight) {
    if (text.startsWith(substring)) {
      const parts = text.split('\n');
      return (
        <Text>
          <Text style={{ fontWeight }}>{substring}</Text>
          {parts.length > 1 && <Text>{'\n'}</Text>}
          {parts.slice(1).map((part, index) => (
            <Text key={index}>
              {index > 0 && <Text>{'\n'}</Text>}
              {part}
            </Text>
          ))}
        </Text>
      );
    } 
    else if (text.startsWith(substring_))
    {
      const parts = text.split('\n');
      return (
        <Text>
          <Text style={{ fontWeight }}>{substring_}</Text>
          {parts.length > 1 && <Text>{'\n'}</Text>}
          {parts.slice(1).map((part, index) => (
            <Text key={index}>
              {index > 0 && <Text>{'\n'}</Text>}
              {part}
            </Text>
          ))}
        </Text>
      );
    }
    else {
      return text;
    }
  }

  const onSend = useCallback((messageArray) => {
    const message = messageArray[0];
    const myMessage = {
      _id: Math.round(Math.random() * 1000000),
      ...message,
      createdAt: new Date(),
      user: chat_user,
    };
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, myMessage),
    );
    console.log('control:', control);

    let userAns = myMessage.text;
    let consig = 'none';
    if(control==false)
    {
      if (userAns == fixsents.acc_1 || userAns == fixsents.acc_2 || fixsents.acc_b)
      {
        consig = '<left>';
      }
      if (userAns == fixsents.rej)
      {
        consig = '<right>';
      }

      control = true;

      if (botword.includes("OK, do you have anything else to add before I recommend some food for you?") || botword == "Could you tell me why you don't like these foods? I'll try to refine the recommendation based on your input. Due to the token limitation, the next round will be the last-round of recommendations.")
      {
        if (botword.includes("OK, do you have anything else to add before I recommend some food for you?"))
        {
          botsend("Got you. Searching for food... This process may take a while", 5);
        }
        else
        {
          botsend("I see. Trying to search for alternative options... This process may take a while", 5);
        }
      }
      else
      {
        botsend("Typing", 5);
      }
      botchat(userAns, consig, 'none');
    }
  }, [])


  const CustomBubble = (props) => {
    const { currentMessage, imageProps } = props;
    const text = currentMessage.text;
    let txt = text;
    let dynamicStyle = null;
    if (txt == 'Typing' || txt == 'Got you. Searching for food... This process may take a while' || txt == 'I see. Trying to search for alternative options... This process may take a while' || txt.length < 97)
    {
      dynamicStyle = styles.waiting;
    }
    else
    {
      dynamicStyle = styles.working;
    }
    if (txt == fixsents.prefix1 || txt == fixsents.prefix2)
    {
      console.log('prefix');
      return (
        <View style={{
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: 8 * px,
          backgroundColor: 'white',
          width: '38%',
          borderTopRightRadius: 15 * px,
          borderBottomRightRadius: 15 * px,
          borderTopLeftRadius: 15 * px,
          borderColor: 'black',
          borderWidth: 1.5 * px,
          marginLeft: 23 * px,
        }}>
          <Text style={styles.imgText}>{txt}</Text>
        </View>
      );
    }
    if (currentMessage.image) {
      const [isLoading, setIsLoading] = useState(true);
      return (
        <View style={{
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 8 * px,
          backgroundColor: 'white',
          width: '61%',
          borderTopRightRadius: 15 * px,
          borderBottomRightRadius: 15 * px,
          borderColor: 'black',
          borderWidth: 1.5 * px,
          marginLeft: 23 * px,
        }}>
          {isLoading && (
            <View style = {{flexDirection: 'row', justifyContent: 'center', alignItems: "center"}}>
              <Text style={styles.imgText}>{'Loading the food image '}</Text>
              <ActivityIndicator style = {{justifyContent: 'flex-start', marginLeft: 5}} size="small" color="#597E52" />
            </View>
          )}
          <Image
            source={{ uri: currentMessage.image }}
            style={{
              width: screenWidth,
              height: screenWidth * 0.15,
              marginRight: 8 * px,
            }}
            onLoad={() => setIsLoading(false)}
            resizeMode="contain"
            {...imageProps}
          />
          <Text style={styles.imgText}>{highlightSubstring(txt, foodtmpo, foodtmpt, 'bold')}</Text>
        </View>
      );
    }
    return <Bubble {...props} wrapperStyle = {dynamicStyle} textStyle = {styles.bubbleText}/>;
  };

  const renderBubble = (props) =>
  {
    return(
      <CustomBubble {...props} />
    );
  }

  const renderAvatar = (props) => 
  {
    return (
      <View style={styles.avatarContainer}>
        <Image source={props.currentMessage.user.avatar} style={styles.avatar} />
      </View>
    );
  };

  const renderInputToolbar = (props) => {
    if (end == true) {
      console.log('end');
    } else {
    return(
      <View style={styles.inputToolbarContainer}>
        <InputToolbar
        {...props}
        />
      </View>
    ); 
  }
  }


  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View style={styles.sendButton}>
          <Text style={styles.sendButtonText}>Send</Text>
        </View>
      </Send>
    );
  };


  const renderMessageText = (props) => {
    const {
      currentMessage,
    } = props;
    let judgeText = currentMessage.text;
    if(judgeText == 'Typing' || judgeText == 'Got you. Searching for food... This process may take a while' || judgeText == 'I see. Trying to search for alternative options... This process may take a while')
    {
      return (
        <View style = {{flexDirection: 'row', justifyContent: 'flex-start', alignItems: "center"}}>
          <MessageText {...props}/>
          <ActivityIndicator style = {{justifyContent: 'flex-start', marginLeft: -10 * px}} size="small" color="#597E52" />
          <Text>{'    '}</Text>
        </View>
      );
    }
    if(judgeText == fixsents.afterfix1)
    {
      return (
        <View>
          <MessageText {...props}/>
          <View style = {{flexDirection: 'row', justifyContent: 'center', marginTop: 10 * px}}>
            <Pressable
              style={[styles.buttonsub, isr1fPressed && styles.buttonsubPress]}
              onPress={() => {
                setIsr1fPressed(true);
                end = false;
                setDis(true);
                usersend(fixsents.acc_1);
                botchat(fixsents.acc_1, '<left>', 'First: ' + foodtmpo);
                botsend("Typing", 5);
              }}
              disabled = {dis}>
              <Text style = {styles.buttonText}>{'First Recommendation'}</Text>
            </Pressable>
            <Text style={styles.buttonText}>{'    '}</Text>
            <Pressable
              style={[styles.buttonsub, isr1sPressed && styles.buttonsubPress]}
              onPress={() => {
                setIsr1sPressed(true);
                end = false;
                setDis(true);
                usersend(fixsents.acc_2);
                botchat(fixsents.acc_2, '<left>', 'Second: ' + foodtmpt);
                botsend("Typing", 5);
              }}
              disabled = {dis}>
              <Text style = {styles.buttonText}>{'Second Recommendation'}</Text>
            </Pressable>
            <Text style={styles.buttonText}>{'    '}</Text>
            <Pressable
              style={[styles.buttonsubShort, isr1ePressed && styles.buttonsubPress]}
              onPress={() => {
                setIsr1ePressed(true);
                end = false;
                setDis(true);
                usersend(fixsents.acc_b);
                botchat(fixsents.acc_b, '<left>', 'Either: ' + foodtmpo + '[or]' + foodtmpt);
                botsend("Typing", 5);
              }}
              disabled = {dis}>
              <Text style = {styles.buttonText}>{'Either'}</Text>
            </Pressable>
            <Text style={styles.buttonText}>{'    '}</Text>
            <Pressable
              style={[styles.buttonsubMid, isr1nPressed && styles.buttonsubPress]}
              onPress={() => {
                setIsr1nPressed(true);
                end = false;
                setDis(true);
                usersend(fixsents.rej);
                botchat(fixsents.rej, '<right>', 'none');
                botsend("Typing", 5);
              }}
              disabled = {dis}>
              <Text style = {styles.buttonText}>{'Neither'}</Text>
            </Pressable>
          </View>
        </View>
      );
    }
    if(judgeText == fixsents.afterfix2)
    {
      return (
        <View>
          <MessageText {...props}/>
          <View style = {{flexDirection: 'row', justifyContent: 'center', marginTop: 10 * px}}>
            <Pressable
              style={[styles.buttonsub, isr2fPressed && styles.buttonsubPress]}
              onPress={() => {
                setIsr2fPressed(true);
                end = false;
                setDissub(true);
                usersend(fixsents.acc_1);
                botchat(fixsents.acc_1, 'none', 'First: ' + foodtmpo);
                botsend("Typing", 5);
              }}
              disabled = {dissub}>
              <Text style = {styles.buttonText}>{'First Recommendation'}</Text>
            </Pressable>
            <Text style={styles.buttonText}>{'    '}</Text>
            <Pressable
              style={[styles.buttonsub, isr2sPressed && styles.buttonsubPress]}
              onPress={() => {
                setIsr2sPressed(true);
                end = false;
                setDissub(true);
                usersend(fixsents.acc_2);
                botchat(fixsents.acc_2, 'none', 'Second: ' + foodtmpt);
                botsend("Typing", 5);
              }}
              disabled = {dissub}>
              <Text style = {styles.buttonText}>{'Second Recommendation'}</Text>
            </Pressable>
            <Text style={styles.buttonText}>{'    '}</Text>
            <Pressable
              style={[styles.buttonsubShort, isr2ePressed && styles.buttonsubPress]}
              onPress={() => {
                setIsr2ePressed(true);
                end = false;
                setDissub(true);
                usersend(fixsents.acc_b);
                botchat(fixsents.acc_b, 'none', 'Either: ' + foodtmpo + '[or]' + foodtmpt);
                botsend("Typing", 5);
              }}
              disabled = {dissub}>
              <Text style = {styles.buttonText}>{'Either'}</Text>
            </Pressable>
            <Text style={styles.buttonText}>{'    '}</Text>
            <Pressable
              style={[styles.buttonsubMid, isr2nPressed && styles.buttonsubPress]}
              onPress={() => {
                setIsr2nPressed(true);
                end = false;
                setDissub(true);
                usersend(fixsents.rej);
                botchat(fixsents.rej, 'none', 'none');
                botsend("Typing", 5);
              }}
              disabled = {dissub}>
              <Text style = {styles.buttonText}>{'Neither'}</Text>
            </Pressable>
          </View>
        </View>
      );
    }
    if(judgeText.includes(fixsents.ge1) || judgeText.includes(fixsents.ge2) || judgeText.includes(fixsents.be))
    {
      const targetText = 'Here are the dietary keywords for you';
      const startIndex = judgeText.indexOf(targetText) + targetText.length + 1;
      if (judgeText.includes(targetText))
      {
        return (
          <View>
            <Text style={{fontFamily: 'Arial', fontSize: 16 * px, color: 'black', padding: 8 * px,}}>
              <Text>{judgeText.substring(0, startIndex)}</Text>
              <Text style={{ fontWeight: 'bold' }}>{judgeText.substring(startIndex)}</Text>
            </Text>
            <View style = {{flexDirection: 'row', justifyContent: 'center', marginTop: 10 * px}}>
              <Pressable
                style={[styles.button, isPressed && {backgroundColor: "#597E52",}]}
                onPress={() => {
                  setIsPressed(true);
                  setDisnav(true);
                  navigation.navigate('SmartEats-Feedback');
                }}
                disabled = {disnav}
                >
                <Text style = {styles.buttonText}>{'Next step: provide feedback'}</Text>
              </Pressable>
            </View>
          </View>
        );
      }
      else
      {
        return (          
          <View>
            <MessageText {...props}/>
            <View style = {{flexDirection: 'row', justifyContent: 'center', marginTop: 10 * px}}>
              <Pressable
                style={[styles.button, isPressed && {backgroundColor: "#597E52",}]}
                onPress={() => {
                  setIsPressed(true);
                  setDisnav(true);
                  navigation.navigate('SmartEats-Feedback');
                }}
                disabled = {disnav}
                >
                <Text style = {styles.buttonText}>{'Next step: provide feedback'}</Text>
              </Pressable>
            </View>
          </View>
        );
      }
    }
    else
    {
      return(
        <View>
          <MessageText {...props}/>
        </View>
      );
    }
  }


  return (
    <SafeAreaProvider>
      <View style = {styles.background}>
        <View style = {styles.titleContainer}>
          <Text style = {styles.title}>{"Let's chat!"}</Text>
        </View>
        <View style = {{
          position: 'absolute',
          top: 0.1 * ScreenHeight,
          height: 0.8 * ScreenHeight,
          backgroundColor: 'white',
          paddingHorizontal: 10 * px,
          borderRadius: 15 * px,
          borderColor: 'black',
          borderWidth: 2 * px,
          width: chatContainerWidth,
          zIndex: 200,
        }}>
          <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            user={chat_user}
            renderBubble={renderBubble}
            renderSend={renderSend}
            renderInputToolbar={renderInputToolbar}
            renderMessageText={renderMessageText}
            renderAvatar={renderAvatar}
            multiline={true}
          />
        </View>
        <View style = {styles.textContainer}>
          <Text style = {{
            fontFamily: 'Arial',
            fontSize: 14 * px,
            color: 'black',
            left: screenWidth * 0.08 * px,
          }}>
            {'Powered by '}
          </Text>
          <Image source={SVG} style={{
            width: 22 * px,
            height: 22 * px,
            left: screenWidth * 0.08 * px,
          }} />
          <Text style = {{
            fontFamily: 'Arial',
            fontSize: 14 * px,
            color: 'black',
            left: screenWidth * 0.08 * px,
          }}>
            {' OpenAI GPT-4 API and DALL·E3, the chatbot icons are designed by Sergey Stepanov / Alamy Stock Vector.'}
          </Text>
        </View>
      </View>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({

  background: {
   flex: 1,
   backgroundColor: 'white',
   paddingHorizontal: 10 * px,
   flexDirection: 'column',
   alignItems: 'center',
   overflow: 'scroll'
  },

  textContainer: {
    position: 'absolute',
    top: 0.9 * ScreenHeight,
    height: 0.1 * ScreenHeight,
    backgroundColor: 'white',
    paddingHorizontal: 10 * px,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 100,
  },

  titleContainer: {
    position: 'absolute',
    height: 0.1 * ScreenHeight,
    backgroundColor: 'white',
    paddingHorizontal: 10 * px,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 100,
  },


  buttonText: {
    fontFamily: "Arial",
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 16 * px,
  },

  bubbleText: {
    left: {
      fontFamily: 'Arial',
      fontSize: 16 * px,
      color: 'black',
    },
    right: {
      fontFamily: 'Arial',
      fontSize: 16 * px,
      color: 'black',
    }
  },

  imgText: {
    fontFamily: 'Arial',
    fontSize: 16 * px,
    color: 'black',
  },

  boldText: {
    fontFamily: 'Arial',
    fontSize: 16 * px,
    color: 'white',
    fontWeight:'bold',
  },

  text: {
    fontFamily: 'Arial',
    fontSize: 16 * px,
    color: 'black',
  },

  title: {
    fontFamily: 'Arial',
    fontSize: 40 * px,
    color: '#597E52',
    fontWeight:'bold',
  },

  button: {
    backgroundColor: "#86A789",
    alignItems: "center",
    height: '75%',
    width: '41%',
    borderRadius: 8.5 * px,
    padding: 10 * px,
    borderColor: '#86A789',
    margintop: 20 * px,
  },

  buttonsub: {
    backgroundColor: "#86A789",
    alignItems: "center",
    height: '75%',
    width: '33%',
    borderRadius: 8.5 * px,
    padding: 10 * px,
    borderColor: '#86A789',
    margintop: 20 * px,
  },

  buttonsubShort: {
    backgroundColor: "#86A789",
    alignItems: "center",
    height: '75%',
    width: '9%',
    borderRadius: 8.5 * px,
    padding: 10 * px,
    borderColor: '#86A789',
    margintop: 20 * px,
  },

  buttonsubMid: {
    backgroundColor: "#86A789",
    alignItems: "center",
    height: '75%',
    width: '11%',
    borderRadius: 8.5 * px,
    padding: 10 * px,
    borderColor: '#86A789',
    margintop: 20 * px,
  },

  buttonsubPress: {
    backgroundColor: "#597E52",
  },

  waiting: {
    left: {
      backgroundColor: 'white',
      borderColor: 'black',
      borderWidth: 1.5 * px,
    },
    right: {
      backgroundColor: '#D2E3C8',
    }
  },

  working: {
    left: {
      backgroundColor: 'white',
      width: '65%',
      borderColor: 'black',
      borderWidth: 1.5 * px,
    },
    right: {
      backgroundColor: '#D2E3C8',
      width: '65%',
    }
  },

  inputToolbarContainer: {
    borderTopWidth: 1 * px,
    borderBottomWidth: 1 * px,
    borderColor: 'black',
    marginTop: 37 * px,
  },
  
  image: {
    width: 500 * px,
    height: 300 * px,
    marginRight: 8 * px,
  },

  sendButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    marginBottom: 9 * px,
  },

  sendButtonText: {
    color: '#597E52',
    fontSize: 20 * px,
    fontWeight: 'bold',
  },

  avatarContainer: {
    width: 60 * px,
    height: 60 * px,
  },

  avatar: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain',
  },

  bot: {
    marginBottom: 20 * px,
    marginLeft: 15 * px,
    width: 65 * px,
    height: 65 * px,
  },
});

export default ChatPage;