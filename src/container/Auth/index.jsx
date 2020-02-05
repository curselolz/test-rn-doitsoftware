
import React from 'react';
import { Container, Form, Item, Input, Text,  Button, Content } from 'native-base';
import { Switch, View } from 'react-native';
import { styles } from '../../styles';
import { useStore } from 'effector-react';
import { storeCheckbox, storeInput } from '../../store';
import { inputChanged, toggleSwitch } from '../../store/events';
import { addNewUser, fetchUser } from '../../store/sideEffects';

const Auth = () => {
  const switchValue = useStore(storeCheckbox);
  const inputData = ['Username', 'Password'];
  const inputSubmitValue = useStore(storeInput);
  console.log(switchValue)
  return (
    <Container style={styles.container}>
      <Content>
        <Form>
          {/* {switchValue && (
            <Item style={styles.input}>
              <Input
                placeholder='Email'
                onChangeText={text => inputChanged({
                  name: 'Email',
                  value: text
                })}
              />
            </Item>
          )} */}
          <Item style={styles.input}>
            <Input
              placeholder='Email'
              onChangeText={text => inputChanged({
                name: 'Email',
                value: text
              })}
            />
          </Item>
          <Item style={styles.input}>
            {inputData.map(el => (
              <Input
                placeholder={el}
                onChangeText={text => inputChanged({
                  name: el,
                  value: text
                })}
              />
            ))}
          </Item>
          <View style={styles.viewSwitch}>
            <Text>Login / Register</Text>
            <Switch
              onValueChange={val => toggleSwitch(val)}
              value={switchValue}
            />
          </View>
          <Button style={styles.textCenter} onPress={() => addNewUser(inputSubmitValue)}>
            <Text>{'log in'.toUpperCase()}</Text>
          </Button>
        </Form>
      </Content>
    </Container>
  );
};

export default Auth;