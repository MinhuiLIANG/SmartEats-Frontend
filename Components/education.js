import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const ScreenHeight = Dimensions.get('window').height;
const px = 0.65 * Math.min(screenWidth / 320, ScreenHeight / 640);
const EduScale = ({ question, options, onChange }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    if (onChange) {
      onChange(option);
    }
  };

  return (
    <View>
      <Text style={styles.question}>{question}</Text>
      {options.map((option, index) => (
        <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
          <label>
            <input
            type="radio"
            checked={selectedOption === option}
            style={styles.checkbox}
            onChange={() => handleOptionChange(option)}
            />
            <Text style={styles.checkText}>{option}</Text>
          </label>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  question: {
    fontFamily: 'Arial',
    fontSize: 16 * px,
    color: 'black',
    fontWeight:'bold',
    paddingHorizontal: 75 * px,
  },

  checkbox: {
    marginLeft: 75 * px,
    height: 16 * px,
    width: 16 * px,
  },

  checkText: {
    fontFamily: "Arial",
    color: 'black',
    fontSize: 16 * px,
  },

})

export default EduScale;