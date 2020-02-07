import React, {useState, useEffect} from 'react';
import {useList, useStore} from 'effector-react';
import {Container, Content, List, ListItem, Text, Button, Left, Body, Right} from 'native-base';
import {withNavigation} from 'react-navigation';
import {View, Picker, RefreshControl} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';
import {twoMergedStore, storeRefresh} from '../../store';
import {changeSort} from '../../store/events';
import getTasksList from '../../store/effects/getTasksList';

import styles from '../../styles';
import getTimeFromDate from '../../utils/time';

const Feed = ({navigation}) => {
  useEffect(() => {
    // getTasksList();
    return () => {
      AsyncStorage.removeItem('authToken');
    };
  });

  const list = useList(twoMergedStore, element => (
    <ListItem
      key={element.id}
      noIndent
      style={{borderWidth:1,borderColor:'red', flexGrow: 1, backgroundColor: '#cde1f9'}}
      onPress={() => navigation.navigate('DetailsShow', element)}>
      <Left>
        <Text>{element.title}</Text>
      </Left>
      <Body>
        <Text>Priority: {element.priority}</Text>
        <Text>Due to: {getTimeFromDate(element.dueBy)}</Text>
      </Body>
      <Right>
        <Icon name="arrow-right" />
      </Right>
    </ListItem>
  ));
  const [value, changeValue] = useState('name');
  const refreshing = useStore(storeRefresh);
  return (
    <Container>
      <Content refreshControl={<RefreshControl refreshing={refreshing} onRefresh={getTasksList} />}>
        <List>{list}</List>
      </Content>
      <View style={{alignItems: 'flex-end'}}>
        <Button style={styles.btnAdd} rounded small onPress={() => navigation.navigate('Details')}>
          <Text style={{paddingLeft: 0, paddingRight: 0, color: 'white', fontSize: 25}}>+</Text>
        </Button>
        <Picker
          selectedValue={value}
          style={{height: 50, width: 150}}
          onValueChange={itemValue => {
            changeSort(itemValue);
            changeValue(itemValue);
          }}>
          <Picker.Item label="Name" value="name" />
          <Picker.Item label="Priority" value="priority" />
          <Picker.Item label="Date" value="date" />
        </Picker>
      </View>
    </Container>
  );
};

Feed.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default withNavigation(Feed);
