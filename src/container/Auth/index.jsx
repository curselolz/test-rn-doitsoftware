import React from 'react';
import {Container, Form, Item, Input, Text, Button, Content} from 'native-base';
import {Switch, View} from 'react-native';
import {useStore} from 'effector-react';
import {withNavigation} from 'react-navigation';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-community/async-storage';
import styles from '../../styles';
import {storeCheckbox, storeInput} from '../../store';
import {inputChanged, toggleSwitch, saveNavToStore} from '../../store/events';
import {addNewUser} from '../../store/effects/authEffect';
import {loginUser} from '../../store/effects/authEffect/login';

const Auth = ({navigation}) => {
  const switchValue = useStore(storeCheckbox);
  const inputData = [
    {key: 1, title: 'Username'},
    {key: 2, title: 'Password'},
  ];
  const inputSubmitValue = useStore(storeInput);
  saveNavToStore(navigation);
  AsyncStorage.getItem('authToken')
    .then(value => {
      if (value !== null) {
        navigation.navigate('Home');
      }
    })
    .catch(err => console.log(err));
  return (
    <Container style={styles.container}>
      <Content
        contentContainerStyle={{justifyContent: 'center', alignItems: 'center', flexGrow: 1}}>
        <Form>
          {switchValue && (
            <Item style={styles.input}>
              <Input
                placeholder="Email"
                onChangeText={text => inputChanged({name: 'Email', value: text})}
              />
            </Item>
          )}
          <Item style={styles.input}>
            {inputData.map(el => (
              <Input
                key={el.id}
                placeholder={el.title}
                onChangeText={text =>
                  inputChanged({
                    name: el.title,
                    value: text,
                  })
                }
              />
            ))}
          </Item>
          <View style={styles.viewSwitch}>
            <Text>Login / Register</Text>
            <Switch onValueChange={val => toggleSwitch(val)} value={switchValue} />
          </View>
          <Button
            style={styles.textCenter}
            onPress={() => {
              if (switchValue) {
                addNewUser(inputSubmitValue);
              } else {
                loginUser(inputSubmitValue);
              }
              navigation.navigate('Home');
            }}>
            <Text>{'log in'.toUpperCase()}</Text>
          </Button>
        </Form>
      </Content>
    </Container>
  );
};

Auth.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default withNavigation(Auth);
