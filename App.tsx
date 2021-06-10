import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  TextInput as RNTextInput,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Keyboard,
  FlatList,
} from 'react-native';

const { width } = Dimensions.get('window');

interface Data {
  id: number;
  value: string;
}

const data: Data[] = [
  {
    id: 1,
    value: 'Street',
  },
  {
    id: 2,
    value: 'Men',
  },
  {
    id: 3,
    value: 'Survive',
  },
  {
    id: 4,
    value: 'Office',
  },
  {
    id: 5,
    value: 'Notes',
  },
  {
    id: 6,
    value: 'Notion',
  },
  {
    id: 7,
    value: 'Fixer',
  },
];

export default function App() {
  const [showResult, setShowResult] = useState<boolean>(false);
  const [searchResult, setSearchResult] = useState<Data[]>([]);

  const keyboardWillHide = () => {
    setShowResult(false);
    setSearchResult([]);
  };

  const searchData = (searchText: string) => {
    if (searchText === '') {
      setSearchResult([]);
      return;
    }
    const result = data.filter((d) => {
      if (d.value.includes(searchText)) return d;
    });
    setSearchResult(result);
  };

  useEffect(() => {
    Keyboard.addListener('keyboardWillHide', keyboardWillHide);
    return () => {
      Keyboard.removeListener('keyboardWillHide', keyboardWillHide);
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={{ flex: 1 }}
        onPress={() => Keyboard.dismiss()}
        activeOpacity={1}
      >
        <Search
          showResult={setShowResult}
          visible={showResult}
          searchResult={searchResult}
          searchData={searchData}
        />
      </TouchableOpacity>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

interface SearchProps {
  showResult: (value: boolean) => void;
  visible: boolean;
  searchResult: Data[];
  searchData: (e: string) => void;
}

const Search: React.FC<SearchProps> = ({
  showResult,
  visible,
  searchResult,
  searchData,
}) => {
  const [nativeEventText, setNativeEventText] = useState<string>('');

  const handleAddSearch = () => {
    alert('run your create function here');
  };

  return (
    <>
      <View style={styles.search}>
        <RNTextInput
          placeholder="search here"
          placeholderTextColor="#808080"
          onFocus={() => {
            showResult(true);
          }}
          style={{ height: '98%' }}
          onChange={(e) => {
            searchData(e.nativeEvent.text);
            setNativeEventText(e.nativeEvent.text);
          }}
        />
      </View>
      <View style={[styles.resultContainer, { opacity: visible ? 1 : 0 }]}>
        {searchResult.length < 1 && nativeEventText.length < 1 ? (
          <Text style={{ color: '#808080' }}>Start searching...</Text>
        ) : nativeEventText.length > 0 && searchResult.length < 1 ? (
          <TouchableOpacity onPress={handleAddSearch} style={styles.addButton}>
            <Text style={{ color: 'white' }}>Create</Text>
            <View>
              <Text style={{ color: 'white' }}>{` "${nativeEventText}`}</Text>
            </View>
          </TouchableOpacity>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={searchResult}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Text style={{ marginTop: 5 }}>{item.value}</Text>
            )}
          />
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  search: {
    width: width - 40,
    height: 57,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#778899',
    justifyContent: 'center',
    paddingLeft: 20,
    borderRadius: 5,
  },
  resultContainer: {
    width: width - 40,
    borderWidth: 1,
    borderColor: '#778899',
    padding: 20,
    marginTop: 3,
    borderRadius: 5,
  },
  addButton: {
    flexDirection: 'row',
    height: 30,
    alignItems: 'center',
    alignSelf: 'flex-start',
    padding: 7,
    borderRadius: 3,
    backgroundColor: 'blue',
  },
});
