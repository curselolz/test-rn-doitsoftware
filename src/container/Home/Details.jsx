import React from 'react';
import {ActivityIndicator} from 'react-native';
import {useStore} from 'effector-react';
import {Container, Content, Card, CardItem, Body, Input, Button, Text} from 'native-base';
import {inputChangedDetails} from '../../store/events';
import addTaskEffect from '../../store/effects/addEffect';
import storeInputDetails from '../../store/storeInputDetails';

import styles from '../../styles';
import {storeError, storeWait} from '../../store';
import validationField from '../../utils/fieldValidation';

const Details = navProp => {
  const inputData = [
    {id: 1, name: 'Title', title: 'title'},
    {id: 2, name: 'Priority', title: 'priority'},
    {id: 3, name: 'Description', title: 'description'},
  ];
  const dataSubmit = useStore(storeInputDetails);
  const {navigation} = navProp;
  const erorField = useStore(storeError);
  const waitResponse = useStore(storeWait);
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
          {(erorField || !validationField(dataSubmit)) && (
            <CardItem>
              <Text style={styles.errorValidation}>Eror validation empty or uppercase letter</Text>
            </CardItem>
          )}
          <Button
            light
            onPress={() => {
              if (validationField(dataSubmit)) {
                addTaskEffect({ data: dataSubmit, nav:navProp});
              }
            }}>
            {waitResponse ? <ActivityIndicator size="large" color="#0000ff" /> : <Text>Add event</Text>}
          </Button>
        </Card>
      </Content>
    </Container>
  );
};

export default Details;
