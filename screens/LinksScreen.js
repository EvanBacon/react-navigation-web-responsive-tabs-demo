import * as React from 'react';
import {
  Animated,
  Button,
  Platform,
  Text,
  StyleSheet,
  View,
} from 'react-native';
import {
  createAppContainer,
  createStackNavigator,
  StackViewTransitionConfigs,
} from 'react-navigation';
import { RectButton, BorderlessButton } from 'react-native-gesture-handler';
import SearchLayout from './Search/SearchLayout';
import { Ionicons } from '@expo/vector-icons';

class ResultScreen extends React.Component {
  static navigationOptions = {
    title: 'Result',
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.props.navigation.getParam('text')} result!</Text>
      </View>
    );
  }
}

class SearchScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: props.navigation.getParam('query', null),
    };
  }

  _handleQueryChange = searchText => {
    this.setState({ searchText });
    this.props.navigation.setParams({ query: searchText });
  };

  _executeSearch = () => {
    alert('do search!');
  };

  render() {
    let { searchText } = this.state;

    return (
      <SearchLayout
        text={searchText}
        onChangeQuery={this._handleQueryChange}
        onSubmit={this._executeSearch}
      >
        {searchText ? (
          <RectButton
            style={{
              borderBottomWidth: StyleSheet.hairlineWidth,
              borderBottomColor: '#eee',
              paddingVertical: 20,
              paddingHorizontal: 15,
            }}
            onPress={() =>
              this.props.navigation.navigate('Result', {
                text: this.state.searchText,
              })
            }
          >
            <Text style={{ fontSize: 14 }}>{searchText}!</Text>
          </RectButton>
        ) : null}
      </SearchLayout>
    );
  }
}

// let SearchStack = createStackNavigator(
//   {
//     Home: HomeScreen,
//     Search: SearchScreen,
//   },
//   {
//     transitionConfig: () => StackViewTransitionConfigs.NoAnimation,
//     navigationOptions: {
//       header: null,
//     },
//     defaultNavigationOptions: {
//       gesturesEnabled: false,
//     },
//   },
// );

// let MainStack = createStackNavigator({
//   Feed: SearchStack,
//   Result: ResultScreen,
// });

export { SearchScreen, ResultScreen };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
