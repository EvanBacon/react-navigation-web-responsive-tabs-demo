/* @flow */
import { Resizable } from '@expo/style-utils';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import Colors from '../../constants/Colors';
import DynamicHeader from './DynamicHeader';
import TabBar from './TabBar';
import TabLabel from './TabLabel';

function TabBarTop(props) {
  const { navigation, ...rest } = props;

  const [headerHeight, setHeight] = React.useState(size);

  return (
    <View style={{ marginTop: headerHeight }}>
      <Resizable>
        {({ width }) => (
          <DynamicHeader
            {...props}
            onHeightChanged={height => setHeight(height)}
            isMobileWidth={width < 520}
            position={props.position}
          >
            <TabBar
              {...rest}
              style={styles.tabBar}
              tabStyle={{ paddingHorizontal: 11 }}
              scrollWrapperStyle={{ height: '100%' }}
              navigationState={navigation.state}
              renderLabel={({ route }) => <TabLabel {...props} route={route} />}
            />
          </DynamicHeader>
        )}
      </Resizable>
    </View>
  );
}

export default TabBarTop;

const size = 72;

const styles = StyleSheet.create({
  icon: {
    height: 24,
    width: 24,
  },
  tabBar: {
    backgroundColor: Colors.header,
    height: 48,
  },
});
