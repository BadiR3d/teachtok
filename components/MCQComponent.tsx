import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from 'react-native';
import axios from 'axios'; // Import axios for making HTTP requests
import {Config} from '../config/config';
import InteractionsComponent from './InteractionsComponent';
import MovingThumbsIcon from './AnimatedThumbIconComponent';

const MCQComponent: React.FC = ({sendImageUrl}) => {
  const [question, setQuestion] = useState<any>();
  const [formattedQuestionString, setFormattedQuestionString] =
    useState<Element[]>();
  const [options, setOptions] = useState<any[]>([]);
  const [answer, setAnswer] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedOption, setSelectedOption] = useState<any | null>(null);
  const [correctAnswer, setCorrectAnswer] = useState<any | null>(null);

  useEffect(() => {
    fetchQuestion();
  }, []); // Fetch question when component mounts

  const fetchQuestion = async () => {
    try {
      setLoading(true);
      const response = await axios.get(Config.services.mcq.getQuestion);
      const question = response.data;

      if (!question || Object.keys(question).length < 1) {
        return console.error('Error fetching question');
      }
      setQuestion(question);
      setOptions(question.options);
      sendImageUrl(question.image);
      // Format question text
      const formattedQuestion = formatQuestionText(question.question);
      setFormattedQuestionString(formattedQuestion);
      setSelectedOption(null);
      setAnswer(null);
    } catch (error) {
      console.error('Error fetching question:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatQuestionText = (text: string) => {
    //fix this
    const words = text.split(' ');
    let lines: JSX.Element[] = [];
    let line: string[] = [];
    let lineCount = 0;

    for (let i = 0; i < words.length; i++) {
      if (line.indexOf(words[i]) === -1) line.push(words[i]);

      if ((i + 1) % 4 === 0 || line.length === 4) {
        lines.push(
          <View
            key={lineCount}
            style={[
              styles.line,
              {
                borderTopStartRadius: i === 0 ? 5 : 0,
                paddingTop: i === 0 ? 10 : 0,
              },
            ]}>
            {line.map((word, index) => (
              <Text key={index}>{word} </Text>
            ))}
          </View>,
        );
        line = [];
        lineCount++;
      }
    }

    if (line && line.length > 0) {
      lines.push(
        <View
          key={lineCount}
          style={[styles.line, {borderBottomStartRadius: 5}]}>
          {line.map((word, index) => (
            <Text key={index}>{word} </Text>
          ))}
        </View>,
      );
      line = [];
      lineCount++;
    }

    return lines;
  };

  const fetchAnswer = async () => {
    try {
      const response = await axios.get(
        `https://cross-platform.rp.devfactory.com/reveal?id=${question.id}`,
      );
      const correctAnswer = response.data.correct_options[0];

      setCorrectAnswer(correctAnswer);
    } catch (error) {
      console.error('Error fetching answer:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOptionSelect = async (option: any) => {
    try {
      await fetchAnswer();
      setAnswer(option);
      setSelectedOption(option);
    } catch (error) {
      console.error('Error fetching answer:', error);
    }
  };

  const getOptionStyle = (option: any) => {
    if (selectedOption && option.answer === selectedOption?.answer) {
      if (selectedOption.answer === correctAnswer?.answer) {
        return styles.correctOption;
      } else {
        // return [styles.incorrectOption, styles.correctOption];
        return styles.incorrectOption;
      }
    }

    return styles.option;
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator
          size="small"
          color="#0000ff"
          style={{backgroundColor: 'transparent'}}
        />
      ) : (
        <ScrollView
          style={styles.scrollView}
          onScrollEndDrag={fetchQuestion}
          scrollEventThrottle={20}
          contentContainerStyle={styles.container}>
          <View style={styles.questionContainer}>
            <Text style={styles.question}>{formattedQuestionString}</Text>
          </View>
          <View style={styles.optionsContainer}>
            <View style={styles.optionsOnlyContainer}>
              {options.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={getOptionStyle(option)}
                  onPress={() => handleOptionSelect(option)}>
                  <Text style={styles.optionText}>{option.answer}</Text>
                  {selectedOption &&
                  selectedOption.answer === correctAnswer?.answer ? (
                    <MovingThumbsIcon thumbDirection="up"/>
                  ) : selectedOption &&
                    selectedOption.answer !== correctAnswer?.answer ? (
                    <MovingThumbsIcon thumbDirection="down" />
                  ) : null}
                </TouchableOpacity>
              ))}
              <Text style={styles.questionPlaylist}>{question.playlist}</Text>
              <Text style={styles.questionDescription}>
                {question.description}
              </Text>
            </View>
            <View style={styles.iconsOnlyContainer}>
              <InteractionsComponent />
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    marginTop: 20,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  line: {
    fontSize: 18,
    flexDirection: 'row',
    backgroundColor: '#e0e0e0',
    marginBottom: 10,
    paddingHorizontal: 20,
    borderEndEndRadius: 5,
    borderTopRightRadius: 5,
  },
  questionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  optionsContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 20,
  },
  optionsOnlyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '85%',
    paddingBottom: 20,
  },
  iconsOnlyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '90%',
    width: '15%',
    paddingBottom: 10,
  },
  question: {
    fontSize: 20,
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 5,
    opacity: 1,
  },
  option: {
    width: '90%',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 5,
    borderRadius: 8,
    backgroundColor: '#e0e0e0', // Default option color
  },
  optionText: {
    fontSize: 16,
    textAlign: 'left',
  },
  questionDescription: {
    fontSize: 12,
    textAlign: 'left',
    color: 'white',
    width: '90%',
  },
  questionPlaylist: {
    fontSize: 14,
    textAlign: 'left',
    color: 'white',
    width: '90%',
    fontWeight: 'bold',
  },
  questionLine: {
    flexDirection: 'row-reverse', // Reverse the order of words to maintain right alignment
  },
  correctOption: {
    width: '90%',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 5,
    backgroundColor: '#00e4b1', // Correct option color
    borderRadius: 8,
  },
  incorrectOption: {
    width: '90%',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 5,
    backgroundColor: 'red', // Incorrect option color
    borderRadius: 8,
  },
});

export default MCQComponent;
