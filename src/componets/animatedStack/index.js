import {
  GestureHandlerRootView,
  PanGestureHandler,
} from 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View, useWindowDimensions, Text} from 'react-native';

import Animated, {
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import Like from '../../assets/images/LIKE.png';
import Nope from '../../assets/images/nope.png';

const ROTATION = 60;
const SWIPE_WELOCITY = 600;

function AnimatedStack(props) {
  const {data, renderItem, onSwipLeft, onSwipRight, setCurrentUser} = props;
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentProfile = data[currentIndex];

  const [nextIndex, setNexttIndex] = useState(currentIndex + 1);
  const nextProfile = data[nextIndex];

  const {width: screenWidth} = useWindowDimensions();
  const hiddenTranslatX = 2 * screenWidth;
  const translateX = useSharedValue(0);
  const rotate = useDerivedValue(
    () =>
      interpolate(translateX.value, [0, hiddenTranslatX], [0, ROTATION]) +
      'deg',
  );
  const cardStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: translateX.value,
      },
      {
        rotate: rotate.value,
      },
    ],
  }));

  const nextCardStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(
          translateX.value,
          [-hiddenTranslatX, 0, hiddenTranslatX],
          [1, 0.8, 1],
        ),
      },
    ],
    opacity: interpolate(
      translateX.value,
      [-hiddenTranslatX, 0, hiddenTranslatX],
      [1, 0.75, 1],
    ),
  }));

  const likeStyle = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [0, screenWidth / 2.5], [0, 1]),
  }));
  const nopeStyle = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [-screenWidth / 2.5, 0], [1, 0]),
  }));

  const gesterHandler = useAnimatedGestureHandler({
    onStart: (_, context) => {
      context.startX = translateX.value;
    },
    onActive: (event, context) => {
      translateX.value = context.startX + event.translationX;
    },
    onEnd: event => {
      if (Math.abs(event.velocityX) < SWIPE_WELOCITY) {
        translateX.value = withSpring(0);
        return;
      }

      translateX.value = withSpring(
        hiddenTranslatX * Math.sign(event.velocityX),
        {},
        () => runOnJS(setCurrentIndex)(currentIndex + 1),
      );

      const onSwip = event.velocityX > 0 ? onSwipRight : onSwipLeft;
      onSwip && runOnJS(onSwip)();
    },
  });

  useEffect(() => {
    translateX.value = 0;
    setNexttIndex(currentIndex + 1);
  }, [currentIndex, translateX]);

  useEffect(() => {
    setCurrentUser(currentProfile);
  }, [currentProfile, setCurrentUser]); // eslint-disable-line

  return (
    <GestureHandlerRootView style={styles.pageContainer}>
      {nextProfile && (
        <View style={styles.nextCard}>
          <Animated.View style={[styles.animatedCard, nextCardStyle]}>
            {renderItem({item: nextProfile})}
          </Animated.View>
        </View>
      )}
      {currentProfile ? (
        <PanGestureHandler onGestureEvent={gesterHandler}>
          <Animated.View style={[styles.animatedCard, cardStyle]}>
            <View style={styles.pageContainer}>
              <Animated.Image
                source={Like}
                style={[styles.like, likeStyle]}
                resizeMode="contain"
              />
              <Animated.Image
                source={Nope}
                style={[styles.nope, nopeStyle]}
                resizeMode="contain"
              />
              {renderItem({item: currentProfile})}
            </View>
          </Animated.View>
        </PanGestureHandler>
      ) : (
        <View>
          <Text>Oopps, No more users </Text>
        </View>
      )}
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  animatedCard: {
    width: '100%',
    height: '70%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextCard: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  like: {
    width: 100,
    height: 80,
    position: 'absolute',
    top: 150,
    left: 20,
    zIndex: 1,
    elevation: 1,
  },
  nope: {
    width: 100,
    height: 80,
    position: 'absolute',
    top: 150,
    right: 20,
    zIndex: 1,
    elevation: 1,
  },
});

export default AnimatedStack;
