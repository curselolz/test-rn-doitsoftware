import React from 'react';
import {Container, Form, Item, Input, Text, Button, Content} from 'native-base';
import {Switch, View} from 'react-native';
import {useStore} from 'effector-react';
import {withNavigation} from 'react-navigation';
import PropTypes from 'prop-types';
import styles from '../../styles';
import {storeCheckbox, storeInput, storeError} from '../../store';
import {inputChanged, toggleSwitch, saveNavToStore} from '../../store/events';
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
  const errValue = useStore(storeError);
  const emptyValue = inputSubmitValue.some(el => el.value === '');
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
          {errValue && (
            <View style={styles.viewSwitch}>
              <Text>Err validation </Text>
            </View>
          )}
          <Button
            style={styles.textCenter}
            onPress={() => {
              if (switchValue) {
                if (validationField(inputSubmitValue)) {
                  addNewUser({data: inputSubmitValue, nav: navigation});
                }
              } else if (inputSubmitValue.length === 2 && !emptyValue) {
                loginUser({data: inputSubmitValue, nav: navigation});
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
