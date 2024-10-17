import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Slider from '@react-native-community/slider';

const screenWidth = Dimensions.get('window').width;
const ScreenHeight = Dimensions.get('window').height;
const px = 0.65 * Math.min(screenWidth / 320, ScreenHeight / 640);
const SlideScale = ({ question, onChange, containerStyle }) => {
  const [value, setValue] = useState(3);
  const [color, setColor] = useState('gray');
  const [tap, setTap] = useState(false);

  const mark0 = value >= 0 && tap ? '#D2E3C8' : 'gray';
  const mark1 = value >= 1 && tap ? '#D2E3C8' : 'gray';
  const mark2 = value >= 2 && tap ? '#D2E3C8' : 'gray';
  const mark3 = value >= 3 && tap ? '#D2E3C8' : 'gray';
  const mark4 = value >= 4 && tap ? '#D2E3C8' : 'gray';
  const mark5 = value >= 5 && tap ? '#D2E3C8' : 'gray';
  const mark6 = value >= 6 && tap ? '#D2E3C8' : 'gray';

  const handleValueChange = (newValue) => {
    setValue(newValue);
  };

  const handleSlidingComplete = (value) => {
    setTap(true);
    setColor('#597E52');
    onChange(getLabel(value));
  }

  const getLabel = (value) => {
    switch (value) {
      case 0:
        return 'strongly disagree';
      case 1:
        return 'disagree';
      case 2:
        return 'slightly disagree';
      case 3:
        return 'neutral';
      case 4:
        return 'slightly agree';
      case 5:
        return 'agree';
      case 6:
        return 'strongly agree';
      default:
        return 'neutral';
    }
  };

  return (
    <View style={containerStyle}>
      <View style={{ flex: 0.2, flexDirection: 'column' }}>
        <Text style={styles.question}>{question}</Text>
      </View>
      <View style={{ flex: 1, flexDirection: 'column', marginTop:20 * px}}>
        <View style={styles.circleContainer}>
          <View style={[styles.circle, {left: '0%', backgroundColor: mark0}]}/>
          <View style={[styles.circle, {left: '15.995%', backgroundColor: mark1}]}/>
          <View style={[styles.circle, {left: '32.105%', backgroundColor: mark2}]}/>
          <View style={[styles.circle, {left: '48.525%', backgroundColor: mark3}]}/>
          <View style={[styles.circle, {left: '64.410%', backgroundColor: mark4}]}/>
          <View style={[styles.circle, {left: '80.475%', backgroundColor: mark5}]}/>
          <View style={[styles.circle, {left: '97.05%', backgroundColor: mark6}]}/>
        </View>
        <View style={styles.sliderContainer}>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={6}
            step={1}
            value={value}
            onValueChange={handleValueChange}
            onSlidingComplete={handleSlidingComplete}
            minimumTrackTintColor={tap ? "#D2E3C8" : 'gray'}
            maximumTrackTintColor="gray"
            thumbTintColor={color}
            thumbStyle={styles.thumbStyle}
          />
        </View>
        <View style={styles.scaleMarksContainer}>
        <Text style={[styles.scaleMarkText, {left: '-35%'}]}>strongly disagree</Text>
        <Text style={[styles.scaleMarkText, , {left: '-1.5%'}]}>neutral</Text>
        <Text style={[styles.scaleMarkText, {left: '33%'}]}>strongly agree</Text>
        </View>
      </View>
      <View style={{marginTop: 80 * px}}>
        <Text style={styles.progressText}>current choice: <Text style={{color: '#597E52'}}>{tap ? getLabel(value) : ''}</Text></Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  sliderContainer: {
    position: 'absolute', 
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 500 * px, 
    marginLeft: 130 * px,
    marginTop: 20 * px
  },

  circleContainer:
  {
    position: 'absolute', 
    zIndex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: 500 * px, 
    marginLeft: 130 * px,
    marginTop: 20 * px
  },

  question: {
    fontFamily: 'Arial',
    fontSize: 17 * px,
    color: 'black',
    fontWeight:'bold',
    marginLeft: 75 * px,
  },

  slider: {
    width: '100%',
  },

  scaleMarksContainer: {
    position: 'absolute', 
    zIndex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    width: 500 * px, 
    marginLeft: 130 * px,
    marginTop: 50 * px
  },

  scaleMarkText: {
    fontFamily: 'Arial',
    color: 'black',
    fontSize: 14 * px,
  },

  progressText: {
    fontFamily: 'Arial',
    color: 'black',
    fontSize: 16 * px,
    fontWeight: 'bold',
    marginTop: 8 * px,
    marginLeft: 75 * px,
  },

  button: {
    backgroundColor: '#597E52',
    borderRadius: 5 * px,
    marginTop: 20 * px,
  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  thumbStyle: {
    width: 15 * px,
    height: 15 * px,
    borderRadius: 7.5 * px,
  },

  circle: {
    position: 'absolute',
    width: 15 * px,
    height: 15 * px,
    borderRadius: 7.5 * px,
    marginTop: 15 * px
  }
});

export default SlideScale;