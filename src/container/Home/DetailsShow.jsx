import React from 'react';
import {useStore} from 'effector-react';
import {Container, Content, Card, CardItem, Body, Button, Text, Input} from 'native-base';
import {View} from 'react-native';
import deleteTaskEffect from '../../store/effects/deleteEffect';
import storeInputDetails from '../../store/storeInputDetails';
import getTasksList from '../../store/effects/getTasksList';

import {storeNavigation, storeEdit} from '../../store';
import styles from '../../styles';
import getTimeFromDate from '../../utils/time';
import {inputChangedDetails} from '../../store/events';
import editEffect from '../../store/effects/editEffect';

const DetailsShow = navProp => {
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
  const element = params;
  const canEdit = useStore(storeEdit);
  const editDone = useStore(storeEdit);
  return (
    <Container>
      <Content>
        {canEdit ? (
          <>
            {inputData.map(el => (
              <CardItem key={el.id}>
                <Body>
                  <Input
                    key={el.id}
                    style={styles.input}
                    placeholder={element[el.title]}
                    onChangeText={text => inputChangedDetails({name: el.title, value: text})}
                  />
                </Body>
              </CardItem>
            ))}
          </>
        ) : (
          <>
            <Card>
              <CardItem>
                <Body>
                  <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontSize: 25}}>{element.title}</Text>
                  </View>
                </Body>
              </CardItem>
            </Card>
            <Card>
              <CardItem>
                <Body>
                  <Text>Priority:{element.priority}</Text>
                </Body>
              </CardItem>
            </Card>
            <Card style={{marginTop: 25}}>
              <CardItem>
                <Body>
                  <Text>Date:{getTimeFromDate(element.dueBy)}</Text>
                </Body>
              </CardItem>
            </Card>
            <Card style={{marginTop: 25}}>
              <CardItem>
                <Body>
                  <Text>Description:{element.description}</Text>
                </Body>
              </CardItem>
            </Card>
          </>
        )}
        <Button
          light
          onPress={() => {
            if(canEdit) {
              editEffect({ oldData: element, newData: dataSubmit, nav:navProp });
            } else {
              deleteTaskEffect(element.id);
              navigation.navigate('Home')
            }
            getTasksList();
          }}>
          <Text>{canEdit ? 'Edit task' : 'Delete event'}</Text>
        </Button>
      </Content>
    </Container>
  );
};

export default DetailsShow;
