import React, {useEffect} from 'react';
import {Container, Form, Item, Input, Text, Button, Content} from 'native-base';
import {Switch, View} from 'react-native';
import {useStore} from 'effector-react';
import {withNavigation} from 'react-navigation';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-community/async-storage';
import styles from '../../styles';
import {storeCheckbox, storeInput, storeError} from '../../store';
import {inputChanged, toggleSwitch, saveNavToStore, clearValue} from '../../store/events';
import {addNewUser} from '../../store/effects/authEffect';
import {loginUser} from '../../store/effects/authEffect/login';
import validationField from '../../utils/fieldValidation';

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
    const errValue = useStore(storeError);
  return (
    <Container style={styles.container}>
      <Content
        contentContainerStyle={{justifyContent: 'center', alignItems: 'center', flexGrow: 1}}>
        <Form>
          {switchValue && (
            <Item style={styles.input}>
              <Input
                type="email"
                placeholder="Email"
                onChangeText={text => inputChanged({name: 'Email', value: text})}
              />
            </Item>
          )}
          <Item style={styles.input}>
            {inputData.map(el => (
              <Input
                secureTextEntry={el.title === 'Password' && true}
                autoCompleteType="password"
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
          {(!validationField(inputSubmitValue) || !errValue) && (
            <View style={styles.viewSwitch}>
              <Text>Err validation </Text>
            </View>
          )}
          <Button
            style={styles.textCenter}
            onPress={() => {
              clearValue();
              if (switchValue) {
                if (validationField(inputSubmitValue) || errValue) {
                  addNewUser(inputSubmitValue);
                  navigation.navigate('Home');
                }
              } else {
                if (validationField(inputSubmitValue) || errValue) {
                  loginUser(inputSubmitValue);
                  navigation.navigate('Home');
                }
              }
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
