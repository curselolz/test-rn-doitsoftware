import React from 'react';
import {Segment, Button, Text} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useStore} from 'effector-react';
import {changeSortOrder, openForEdit} from '../store/events';
import {storeEdit} from '../store';

export const NewButton = () => {
  return (
    <Segment>
      <Button onPress={() => changeSortOrder('asc')}>
        <Text>ASC</Text>
      </Button>
      <Button onPress={() => changeSortOrder('desc')}>
        <Text>DESC</Text>
      </Button>
    </Segment>
  );
};

export const IconEdit = () => {
  const value = useStore(storeEdit);
  return (
    <Icon.Button
      name="edit"
      color="blue"
      backgroundColor="transparent"
      onPress={() => openForEdit(!value)}
    />
  );
};