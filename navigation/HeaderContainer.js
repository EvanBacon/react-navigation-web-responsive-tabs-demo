import React from 'react';
import ReactDOM from 'react-dom';
import { View } from 'react-native';
export class NavContainer extends React.PureComponent {
  render() {
    return (
      <header>
        <View accessibilityRole="navigation">{this.props.children}</View>
      </header>
    );
  }
}

export class HeaderPortal extends React.PureComponent {
  render() {
    return ReactDOM.createPortal(this.props.children, document.body);
  }
}

export default class HeaderContainer extends React.PureComponent {
  render() {
    const { children } = this.props;
    return (
      <HeaderPortal>
        <NavContainer>{children}</NavContainer>
      </HeaderPortal>
    );
  }
}
