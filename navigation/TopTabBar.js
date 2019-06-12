/* @flow */
import { Resizable } from '@expo/style-utils';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import * as React from 'react';
import { Animated, StyleSheet, TouchableOpacity, View } from 'react-native';

import HeaderContainer from './HeaderContainer';
import TabBar from './TabBar';

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

const backgroundColor = '#202124';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(
  TouchableOpacity,
);

function CustomLabel(props) {
  const {
    route,
    position,
    navigation,
    activeTintColor,
    inactiveTintColor,
    showLabel,
    upperCaseLabel,
    labelStyle,
    allowFontScaling,
    getLabelText,
  } = props;

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
  const label = getLabelText({ route });

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
}

class CustomHeader extends React.Component {
  _getAnimatedMenuButtonStyle = () => {
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
    return {
      opacity: activeOpacity,
      transform: [{ scale: activeScale }],
    };
  };

  _getAnimatedIconStyle = () => {
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

    return {
      transform: [
        { translateX: activeTranslationX },
        { translateX: activeTranslationXStar },
      ],
    };
  };

  render() {
    const {
      navigation,
      onHeightChanged,
      children,
      isMobileWidth,
      ...rest
    } = this.props;
    const tintColor = 'white';

    return (
      <View
        style={{ position: 'fixed', top: 0, left: 0, right: 0 }}
        onLayout={({
          nativeEvent: {
            layout: { height },
          },
        }) => onHeightChanged(height)}
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
              minHeight: size,
            }}
          >
            <AnimatedTouchableOpacity
              style={[
                styles.buttonTouchable,
                {
                  padding: 24,
                },
                this._getAnimatedMenuButtonStyle(),
              ]}
              onPress={() => {
                if (navigation.openDrawer) {
                  navigation.openDrawer();
                }
              }}
            >
              <MaterialIcons color={tintColor} name={'menu'} size={24} />
            </AnimatedTouchableOpacity>

            <AnimatedTouchableOpacity
              style={[
                {
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                },
                this._getAnimatedIconStyle(),
              ]}
              onPress={() => {
                navigation.navigate('Design');
              }}
            >
              <MaterialIcons color={tintColor} name={'star'} size={32} />
            </AnimatedTouchableOpacity>
          </View>

          {!isMobileWidth && children}
          <TouchableOpacity
            style={[styles.buttonTouchable, { marginLeft: 24 }]}
            onPress={() => this.props.navigation.navigate('Search')}
          >
            <MaterialIcons color={tintColor} name={'search'} size={32} />
          </TouchableOpacity>
        </View>
        {isMobileWidth && children}
      </View>
    );
  }
}

export default class TabBarTop extends React.PureComponent<Props> {
  static defaultProps = {
    activeTintColor: '#fff',
    inactiveTintColor: '#fff',
    showIcon: false,
    showLabel: true,
    upperCaseLabel: true,
    allowFontScaling: true,
    style: { backgroundColor: backgroundColor, height: '100%' },
  };
  state = { height: size };

  _renderLabel = ({ route }) => {
    return <CustomLabel {...this.props} route={route} />;
  };

  render() {
    const { navigation, style, ...rest } = this.props;

    return (
      <View style={{ marginTop: this.state.height }}>
        <HeaderContainer>
          <Resizable>
            {({ width }) => (
              <CustomHeader
                {...this.props}
                onHeightChanged={height => this.setState({ height })}
                isMobileWidth={width < 520}
                position={this.props.position}
              >
                <TabBar
                  {...rest}
                  style={[style, { height: 48 }]}
                  tabStyle={{ paddingHorizontal: 11 }}
                  scrollWrapperStyle={{ height: '100%' }}
                  navigationState={navigation.state}
                  renderLabel={this._renderLabel}
                />
              </CustomHeader>
            )}
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
    minWidth: size,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
});
