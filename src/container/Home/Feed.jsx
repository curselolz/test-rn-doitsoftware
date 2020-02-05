
import React from 'react';
import { useList, useStore } from 'effector-react'
import { Container, Content, List, ListItem } from 'native-base';
import { store } from '../../store/';

const Feed = () => {
  const data = useStore(store);
  const list = useList(data, ({ name }, index) => (
    <ListItem>
      [{index}] {name}
    </ListItem>
  ));
  return (
    <Container>
      <Content>
        <Text>1231232</Text>
      </Content>
    </Container>
  );
};

export default Feed;