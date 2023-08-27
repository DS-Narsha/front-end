import Accordion from 'react-native-collapsible/Accordion';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {useState} from 'react';
import Guidedata from '../data/GuideData.json';
import {ScrollView} from 'react-native-gesture-handler';

const GuidePage = () => {
  const [activeSections, setActiveSections] = useState([]);

  const renderHeader = (section: any) => {
    return (
      <View style={styles.accordianHeader}>
        <Text style={styles.titleTextIcon}>Q</Text>
        <Text style={styles.titleText}>{section.question}</Text>
      </View>
    );
  };

  const renderContent = (section: any) => {
    return (
      <View style={styles.accordianContent}>
        <Text>{section.content}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.guideBox}>
          <Image
            source={require('../assets//graphic/applogo.png')}
            style={styles.logo}
          />
          <Text style={styles.accordianTitle}>
            앱을 사용하는 방법이 어려우신가요?{'\n'}둥실이가 사용법을
            알려드려요!
          </Text>
        </View>

        <View style={{height: 20}} />
        <Accordion
          align="bottom"
          activeSections={activeSections}
          containerStyle={{
            borderRadius: 10,
          }}
          sectionContainerStyle={{
            borderRadius: 10,
            margin: 10,
          }}
          sections={Guidedata}
          touchableComponent={TouchableOpacity}
          renderHeader={renderHeader}
          renderContent={renderContent}
          duration={400}
          onChange={sections => setActiveSections(sections)}
          renderAsFlatList={false}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    padding: 16,
  },
  accordianTitle: {
    fontFamily: 'NanumSquareR',
    fontSize: 14,
  },
  accordianHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E3F1A9',
    padding: 20,
    borderColor: '#AADF98',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,

    borderWidth: 2,
  },
  titleTextIcon: {
    display: 'flex',
    fontSize: 40,
    color: '#61A257',
    fontFamily: 'NanumSquareB',
    marginRight: 10,
  },
  titleText: {
    flex: 1,
    fontSize: 15,
    color: '#61A257',
    fontFamily: 'NanumSquareB',
  },
  accordianContent: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderBottomEndRadius: 10,
    borderBottomLeftRadius: 10,
    minHeight: 100,
    padding: 10,
    fontFamily: 'NanumSquareR',
  },
  guideBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  logo: {
    borderRadius: 80,
    width: 50,
    height: 50,
    marginRight: 10,
  },
});

export default GuidePage;
