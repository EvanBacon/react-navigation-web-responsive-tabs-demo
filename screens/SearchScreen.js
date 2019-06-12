import * as React from 'react';
import {
  Animated,
  Button,
  Platform,
  Text,
  StyleSheet,
  View,
  FlatList,
} from 'react-native';
import {
  createAppContainer,
  createStackNavigator,
  StackViewTransitionConfigs,
} from 'react-navigation';
import { RectButton, BorderlessButton } from 'react-native-gesture-handler';
import SearchLayout from './Search/SearchLayout';
import { Ionicons } from '@expo/vector-icons';

function getData(str) {
  if (!str) return [];
  return new Array(parseInt(Math.random() * 50 + 8))
    .fill(str)
    .map((_, i) => `${str} ${i}`);
}

class SearchScreen extends React.Component {
  constructor(props) {
    super(props);
    // Get the initial value
    const query = props.navigation.getParam('query');
    this.state = {
      query,
      data: getData(query),
    };
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.navigation.getParam('query') !==
      prevProps.navigation.getParam('query')
    ) {
      // When the router changes from an external source.
      this.setState({ query: this.props.navigation.getParam('query') });
    }
  }

  onChangeQuery = query => {
    this.setState({ query });

    clearTimeout(this._id);
    this._id = setTimeout(() => {
      this.setState({ data: getData(query) });
    }, Math.random() * 600 + 300);
  };

  get query() {
    return this.state.query;
  }

  onSubmit = () => {
    // Update the route
    this.props.navigation.setParams({ query: this.query });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <SearchLayout
          text={this.query}
          onBack={() => this.props.navigation.navigate('Design')}
          onChangeQuery={this.onChangeQuery}
          onSubmit={this.onSubmit}
        />
        <ResultsList data={this.state.data} />
      </View>
    );
  }
}

class ResultsList extends React.Component {
  renderItem = ({ item }) => (
    <View
      style={{
        paddingHorizontal: 36,
        paddingVertical: 24,
        flexDirection: 'row',
      }}
    >
      <Text>{item}</Text>
    </View>
  );

  render() {
    return (
      <FlatList
        style={{ flex: 1, marginTop: 72 }}
        renderItem={this.renderItem}
        ListEmptyComponent={() => (
          <View
            style={{
              flex: 1,
              height: '90vh',
            }}
          >
            <View
              style={{
                flex: 1,
                height: '90vh',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text
                style={{ textAlign: 'center', fontSize: 24, marginBottom: 12 }}
              >
                No Items Found
              </Text>
              <Text style={{ textAlign: 'center', fontSize: 18, opacity: 0.4 }}>
                Maybe try looking for something else!
              </Text>
            </View>
          </View>
        )}
        data={this.props.data}
      />
    );
  }
}

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
