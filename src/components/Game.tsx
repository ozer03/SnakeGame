import * as React from 'react';
import {SafeAreaView, StyleSheet, View, Text, Image} from 'react-native';
import {Colors} from '../styles/colors';
import {PanGestureHandler} from 'react-native-gesture-handler';
import {Coordinate, Direction, GestureEventType} from '../types/types';
import Snake from './Snake';
import {checkGameOver} from '../utils/chechGameOver';
import Food from './Food';
import {checkEatsFood} from '../utils/checkEatFood';
import {randomFoodPosition} from '../utils/randomFoodPosition';
import Header from './Header';
import { saveHighScore, getHighScore } from '../helpers/asyncStoraceHelper';

const SNAKE_INITIAL_POSITION = [{x: 5, y: 5}];
const FOOD_INITIAL_POSITION = {x: 5, y: 20};
const GAME_BOUNDS = {xMin: 0, xMax: 35, yMin: 0, yMax: 63};
const MOVE_INTERVAL = 100;
// move interval increment her 1.5 kat artabilir
const MOVE_INTERVAL_INCREMENT = 0.5;
const SCORE_INCREMENT = 10;

export default function Game(): JSX.Element {
  const [direction, setDirection] = React.useState<Direction>(Direction.Rigth);
  const [snake, setSnake] = React.useState<Coordinate[]>(
    SNAKE_INITIAL_POSITION,
  );
  const [food, setFood] = React.useState<Coordinate>(FOOD_INITIAL_POSITION);
  const [isGameOver, setIsGameOver] = React.useState<boolean>(false);
  const [isPaused, setIsPaused] = React.useState<boolean>(false);
  const [score, setScore] = React.useState<number>(0);
  const [level, setLevel] = React.useState<number>(0);
  const [levelPoint, setLevelPoint] = React.useState<number>(50);
  const [speed, setSpeed] = React.useState<number>(MOVE_INTERVAL);
  const [highScore, setHighScore] = React.useState<number>(0);
  const [randomFruit, setRandomFruit] = React.useState<string>("🍎");

  React.useEffect(() => {
    // Load high score when the component mounts
    const loadHighScore = async () => {
      const storedHighScore = await getHighScore();
      setHighScore(storedHighScore);
    };
    loadHighScore();
  }, []);
  
  React.useEffect(() => {
    if (!isGameOver) {
      const intervalId = setInterval(() => {
        !isPaused && moveSnake();
      }, speed);
      return () => clearInterval(intervalId);
    }
  }, [snake, isGameOver, isPaused]);

  const moveSnake = () => {
    const snakeHead = snake[0];
    const newHead = {...snakeHead}; // creating a copy

    // check gameOver
    if (checkGameOver(snakeHead, GAME_BOUNDS)) {
      setIsGameOver(prev => !prev);
      if(score > highScore){
        setHighScore(score)
        saveHighScore(score)
      };
      return;
    };

    switch (direction) {
      case Direction.Up:
        newHead.y -= 1;
        break;
      case Direction.Down:
        newHead.y += 1;
        break;
      case Direction.Left:
        newHead.x -= 1;
        break;
      case Direction.Rigth:
        newHead.x += 1;
        break;
      default:
        break;
    }

    // if eats food
    // grow snake
    function getRandomFruit () {
      const fruitList = ["🍎", "🍊", "🍋", "🍌", "🍉"];
      const randomIndex = Math.floor(Math.random() * fruitList.length);
      return fruitList[randomIndex];
    };

    if (checkEatsFood(newHead, food, 2)) {
      // get another position for the food
      setFood(randomFoodPosition(GAME_BOUNDS.xMax, GAME_BOUNDS.yMax));
      setSnake([newHead, ...snake]);
      setRandomFruit(getRandomFruit());
      // increase the score
      setScore(score + SCORE_INCREMENT);
      // her 100 puandan sonra level i 1 arttır
      if(score >= levelPoint){
        setLevel(level + 1);
        setLevelPoint(levelPoint * 2);
        setSpeed(speed * MOVE_INTERVAL_INCREMENT);
      }
    } else {
      setSnake([newHead, ...snake.slice(0, -1)]);
    }
  };

  const handleGesture = (event: GestureEventType) => {
    const {translationX, translationY} = event.nativeEvent;

    if (Math.abs(translationX) > Math.abs(translationY)) {
      if (translationX > 0) {
        setDirection(Direction.Rigth);
      } else {
        setDirection(Direction.Left);
      }
    } else {
      if (translationY > 0) {
        setDirection(Direction.Down);
      } else {
        setDirection(Direction.Up);
      }
    }
  };

  const pauseGame = () => {
    setIsPaused(!isPaused);
  };

  const reloadGame = () => {
    setSnake(SNAKE_INITIAL_POSITION);
    setFood(FOOD_INITIAL_POSITION);
    setIsGameOver(false);
    setScore(0);
    setDirection(Direction.Rigth);
    setIsPaused(false);
    setLevel(0);
    setSpeed(MOVE_INTERVAL);
  };


  return (

    <PanGestureHandler onGestureEvent={handleGesture}>
      <SafeAreaView style={styles.container}>
        <Header
          isPaused={isPaused}
          pauseGame={pauseGame}
          reloadGame={reloadGame}
          highScore={highScore}
          >
          
          <View style={{alignItems:"center", flex: 1}}>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: Colors.primary}}>Level: {level}</Text>
          <Text
            style={{fontSize: 20, fontWeight: 'bold', color: Colors.primary}}>
            Point: {score}
          </Text>
            </View>  
         
        </Header>
        <View style={styles.boundaries}>
          <Snake snake={snake} />
          <Food x={food.x} y={food.y} randomFruit={randomFruit}/>
        </View>
      </SafeAreaView>
    </PanGestureHandler>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },

  boundaries: {
    flex: 1,
    borderColor: Colors.primary,
    borderWidth: 12,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    backgroundColor: Colors.background,
  },
});
