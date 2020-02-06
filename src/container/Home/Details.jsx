import React from 'react';
import {useStore} from 'effector-react';
import {Container, Content, Card, CardItem, Body, Input, Button, Text} from 'native-base';
import {View} from 'react-native';
import {inputChangedDetails} from '../../store/events';
import addTaskEffect from '../../store/effects/addEffect';
import deleteTaskEffect from '../../store/effects/deleteEffect';
import storeInputDetails from '../../store/storeInputDetails';
import getTasksList from '../../store/effects/getTasksList';

import {storeNavigation, storeEdit} from '../../store';
import styles from '../../styles';
import getTimeFromDate from '../../utils/time';

const Details = navProp => {
  const inputData = [
    {id: 1, name: 'Title', title: 'title'},
    {id: 2, name: 'Priority', title: 'priority'},
    {id: 3, name: 'Description', title: 'description'},
  ];
  const dataSubmit = useStore(storeInputDetails);
  const nav = useStore(storeNavigation);
  const {navigation} = navProp;
  const {state} = navigation;
  const {params} = state;
  const element = {title: 'empty'};
  if (typeof params !== 'undefined') {
    Object.assign(element, params);
  }
  const canEdit = useStore(storeEdit);
  return (
    <Container>
      <Content>
        <Card style={{flexGrow: 1}}>
          {inputData.map(el => (
            <CardItem key={el.id}>
              <Body>
                <Input
                  style={styles.input}
                  placeholder={element.title !== 'empty' ? element[el.title] : el.title}
                  onChangeText={text => inputChangedDetails({name: el.title, value: text})}
                />
              </Body>
            </CardItem>
          ))}
          <Button
            light
            onPress={() => {
              if (element.title === 'empty') {
                addTaskEffect(dataSubmit);
              } else {
                deleteTaskEffect(element.id);
              }
              nav.navigate('Home');
              getTasksList();
            }}>
            <Text>{element.title === 'empty' ? 'Add event' : 'Delete event'}</Text>
          </Button>
        </Card>
      </Content>
    </Container>
  );
};

export default Details;
