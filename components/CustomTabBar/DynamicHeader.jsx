/* @flow */
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import * as React from 'react';
import { Animated, StyleSheet, TouchableOpacity, View } from 'react-native';

import Colors from '../../constants/Colors';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(
  TouchableOpacity,
);
const tintColor = 'white';
const size = 72;

export default class CustomHeader extends React.Component {
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

    return (
      <View
        style={styles.container}
        onLayout={({
          nativeEvent: {
            layout: { height },
          },
        }) => onHeightChanged(height)}
      >
        <View style={styles.header}>
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

const styles = StyleSheet.create({
  container: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
  },
  header: {
    flexDirection: 'row',
    backgroundColor: Colors.header,
    alignItems: 'center',
  },
  buttonTouchable: {
    padding: 20,
    minWidth: size,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
});