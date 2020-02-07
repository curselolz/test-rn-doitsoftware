import React from 'react';
import {useStore} from 'effector-react';
import {Container, Content, Card, CardItem, Body, Input, Button, Text} from 'native-base';
import {inputChangedDetails} from '../../store/events';
import addTaskEffect from '../../store/effects/addEffect';
import storeInputDetails from '../../store/storeInputDetails';

import styles from '../../styles';

const Details = navProp => {
  const inputData = [
    {id: 1, name: 'Title', title: 'title'},
    {id: 2, name: 'Priority', title: 'priority'},
    {id: 3, name: 'Description', title: 'description'},
  ];
  const dataSubmit = useStore(storeInputDetails);
  const {navigation} = navProp;
  return (
    <Container>
      <Content>
        <Card style={{flexGrow: 1}}>
          {inputData.map(el => (
            <CardItem key={el.id}>
              <Body>
                <Input
                  style={styles.input}
                  placeholder={el.title}
                  onChangeText={text => inputChangedDetails({name: el.title, value: text})}
                />
              </Body>
            </CardItem>
          ))}
          <Button
            light
            onPress={() => {
              addTaskEffect(dataSubmit);
              navigation.navigate('Home');
            }}>
            <Text>Add event</Text>
          </Button>
        </Card>
      </Content>
    </Container>
  );
};

export default Details;
