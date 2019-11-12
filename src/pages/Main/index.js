import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {Animated} from 'react-native';
import {
  PanGestureHandler,
  State,
  TouchableOpacity,
} from 'react-native-gesture-handler';

import Header from '~/components/Header';
import Tabs from '~/components/Tabs';
import Menu from '~/components/Menu';

import {
  Container,
  Content,
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  Title,
  Description,
  Annotation,
  SafeAreaView,
  HideMoney,
} from './styles';

export default function Main() {
  const [eye, setEye] = useState();

  let offset = 0;
  const translateY = new Animated.Value(0);

  const animatedEvent = Animated.event(
    [
      {
        nativeEvent: {
          translationY: translateY,
        },
      },
    ],
    {useNativeDriver: true},
  );

  function onHandlerStateChanged(event) {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      let opened = false;
      const {translationY} = event.nativeEvent;

      offset += translationY;

      if (translationY >= 100) {
        opened = true;
      } else {
        translateY.setValue(offset);
        translateY.setOffset(0);
        offset = 0;
      }

      Animated.timing(translateY, {
        toValue: opened ? 380 : 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        offset = opened ? 380 : 0;
        translateY.setOffset(offset);
        translateY.setValue(0);
      });
    }
  }

  return (
    <SafeAreaView>
      <Container>
        <Header />
        <Content>
          <Menu translateY={translateY} />

          <PanGestureHandler
            onGestureEvent={animatedEvent}
            onHandlerStateChange={onHandlerStateChanged}>
            <Card
              style={{
                transform: [
                  {
                    translateY: translateY.interpolate({
                      inputRange: [-350, 0, 380],
                      outputRange: [-50, 0, 380],
                      extrapolate: 'clamp',
                    }),
                  },
                ],
              }}>
              <CardHeader>
                <Icon name="attach-money" size={28} color="#666" />
                <TouchableOpacity onPress={() => setEye(!eye)}>
                  <Icon
                    name={eye ? 'visibility-off' : 'visibility'}
                    size={28}
                    color="#666"
                  />
                </TouchableOpacity>
              </CardHeader>
              <CardContent>
                <Title>Saldo disponível</Title>
                {!eye ? (
                  <HideMoney />
                ) : (
                  <Description>R$ 785.542,18</Description>
                )}
              </CardContent>
              <CardFooter>
                <Annotation>
                  Transferência de R$ 20,00 recebida de Danilo Aguiar hoje às
                  06:00h
                </Annotation>
              </CardFooter>
            </Card>
          </PanGestureHandler>
        </Content>

        <Tabs translateY={translateY} />
      </Container>
    </SafeAreaView>
  );
}
