/* @flow */

import * as React from 'react';
import {
  Animated,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import TabBar from './TabBar';
import CrossFadeIcon from 'react-navigation-tabs/src/views/CrossFadeIcon';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Resizable } from '@expo/style-utils';
import HeaderContainer from './HeaderContainer';
export type TabBarOptions = {
  activeTintColor?: string,
  inactiveTintColor?: string,
  showLabel?: boolean,
  showIcon?: boolean,
  upperCaseLabel?: boolean,
  labelStyle?: any,
  iconStyle?: any,
  allowFontScaling?: boolean,
};

type Props = TabBarOptions & {
  position: Animated.Value,
  offsetX: Animated.Value,
  panX: Animated.Value,
  layout: any,
  navigation: any,
  renderIcon: (props: {
    route: any,
    focused: boolean,
    tintColor: string,
  }) => React.Node,
  getLabelText: (props: { route: any }) => any,
  getAccessibilityLabel: (props: { route: any }) => string,
  getTestID: (props: { route: any }) => string,
  useNativeDriver?: boolean,
  jumpTo: (key: string) => any,
};

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(
  TouchableOpacity,
);

export default class TabBarTop extends React.PureComponent<Props> {
  static defaultProps = {
    activeTintColor: '#fff',
    inactiveTintColor: '#fff',
    showIcon: false,
    showLabel: true,
    upperCaseLabel: true,
    allowFontScaling: true,
  };
  state = { height: size };

  _renderLabel = ({ route }) => {
    const {
      position,
      navigation,
      activeTintColor,
      inactiveTintColor,
      showLabel,
      upperCaseLabel,
      labelStyle,
      allowFontScaling,
    } = this.props;

    if (showLabel === false) {
      return null;
    }

    const { routes } = navigation.state;
    const index = routes.indexOf(route);
    const focused = index === navigation.state.index;

    // Prepend '-1', so there are always at least 2 items in inputRange
    const inputRange = [-1, ...routes.map((x, i) => i)];
    const outputRange = inputRange.map(inputIndex =>
      inputIndex === index ? activeTintColor : inactiveTintColor,
    );
    const color = position.interpolate({
      inputRange,
      outputRange: outputRange,
    });

    const tintColor = focused ? activeTintColor : inactiveTintColor;
    const label = this.props.getLabelText({ route });

    if (typeof label === 'string') {
      return (
        <Animated.Text
          style={[styles.label, { color }, labelStyle]}
          allowFontScaling={allowFontScaling}
        >
          {upperCaseLabel ? label.toUpperCase() : label}
        </Animated.Text>
      );
    }
    if (typeof label === 'function') {
      return label({ focused, tintColor });
    }

    return label;
  };

  _renderIcon = ({ route }) => {
    const {
      position,
      navigation,
      activeTintColor,
      inactiveTintColor,
      renderIcon,
      showIcon,
      iconStyle,
    } = this.props;

    if (showIcon === false) {
      return null;
    }

    const index = navigation.state.routes.indexOf(route);

    // Prepend '-1', so there are always at least 2 items in inputRange
    const inputRange = [-1, ...navigation.state.routes.map((x, i) => i)];
    const activeOpacity = position.interpolate({
      inputRange,
      outputRange: inputRange.map(i => (i === index ? 1 : 0)),
    });
    const inactiveOpacity = position.interpolate({
      inputRange,
      outputRange: inputRange.map(i => (i === index ? 0 : 1)),
    });

    return (
      <CrossFadeIcon
        route={route}
        navigation={navigation}
        activeOpacity={activeOpacity}
        inactiveOpacity={inactiveOpacity}
        activeTintColor={activeTintColor}
        inactiveTintColor={inactiveTintColor}
        renderIcon={renderIcon}
        style={[styles.icon, iconStyle]}
      />
    );
  };

  render() {
    /* eslint-disable no-unused-vars */

    const backgroundColor = '#202124';
    const {
      navigation,
      renderIcon,
      getLabelText,
      style = { backgroundColor: backgroundColor, height: '100%' },
      ...rest
    } = this.props;
    const tintColor = 'white';

    console.log(this.props.navigation);

    const activeScale = this.props.position.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0.001],
      extrapolate: 'clamp',
    });
    const activeOpacity = this.props.position.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
    const activeTranslationX = this.props.position.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -36],
      extrapolate: 'clamp',
    });
    const activeTranslationXStar = this.props.position.interpolate({
      inputRange: [0, 1],
      outputRange: ['0%', '-50%'],
      extrapolate: 'clamp',
    });

    return (
      /* $FlowFixMe */
      <View style={{ marginTop: this.state.height }}>
        <HeaderContainer>
          <Resizable>
            {({ width }) => {
              const isMed = width < 520;
              return (
                <View
                  style={{ position: 'fixed', top: 0, left: 0, right: 0 }}
                  onLayout={({
                    nativeEvent: {
                      layout: { height },
                    },
                  }) => this.setState({ height })}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      backgroundColor: backgroundColor,
                      alignItems: 'center',
                    }}
                  >
                    <View
                      pointerEvents="auto"
                      style={{
                        flexDirection: 'row',
                        flex: 1,
                        minHeight: 72,
                      }}
                    >
                      <AnimatedTouchableOpacity
                        style={[
                          styles.buttonTouchable,
                          {
                            padding: 24,
                            opacity: activeOpacity,
                            transform: [{ scale: activeScale }],
                          },
                        ]}
                        onPress={() => {
                          console.log('press');
                          if (this.props.navigation.openDrawer) {
                            this.props.navigation.openDrawer();
                          }
                        }}
                      >
                        <MaterialIcons
                          color={tintColor}
                          name={'menu'}
                          size={24}
                        />
                      </AnimatedTouchableOpacity>

                      <Animated.View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                          transform: [
                            { translateX: activeTranslationX },
                            { translateX: activeTranslationXStar },
                          ],
                        }}
                      >
                        <MaterialIcons
                          color={tintColor}
                          name={'star'}
                          size={32}
                        />
                        {false && (
                          <Text
                            style={{
                              marginLeft: 8,
                              color: tintColor,
                              fontWeight: '600',
                            }}
                          >
                            MATERIAL DESIGN {width}
                          </Text>
                        )}
                      </Animated.View>
                    </View>
                    {!isMed && (
                      <TabBar
                        {...rest}
                        style={style}
                        tabStyle={{ paddingHorizontal: 11 }}
                        scrollWrapperStyle={{ height: '100%' }}
                        navigationState={navigation.state}
                        renderIcon={this._renderIcon}
                        renderLabel={this._renderLabel}
                      />
                    )}
                    <TouchableOpacity
                      style={[styles.buttonTouchable, { marginLeft: 24 }]}
                    >
                      <MaterialIcons
                        color={tintColor}
                        name={'search'}
                        size={32}
                      />
                    </TouchableOpacity>
                  </View>
                  {isMed && (
                    <TabBar
                      {...rest}
                      style={[style, { height: 48 }]}
                      tabStyle={{ paddingHorizontal: 11 }}
                      scrollWrapperStyle={{ height: '100%' }}
                      navigationState={navigation.state}
                      renderIcon={this._renderIcon}
                      renderLabel={this._renderLabel}
                    />
                  )}
                </View>
              );
            }}
          </Resizable>
        </HeaderContainer>
      </View>
    );
  }
}

const size = 72;
const styles = StyleSheet.create({
  icon: {
    height: 24,
    width: 24,
  },
  label: {
    textAlign: 'center',
    fontSize: 20,
    margin: 8,
    backgroundColor: 'transparent',
  },
  buttonTouchable: {
    padding: 20,
    minWidth: 72,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
});
