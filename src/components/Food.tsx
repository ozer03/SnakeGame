import { StyleSheet, Text } from "react-native";
import { Coordinate } from "../types/types";


function getRandomFruit () {
    const fruitList = ["🍎", "🍊", "🍋", "🍌", "🍉"];
    const randomIndex = Math.floor(Math.random() * fruitList.length);
    return fruitList[randomIndex];
};

interface FoodProps {
    randomFruit: string
    x: number,
    y: number
}

export default function Food({ x, y, randomFruit }: FoodProps):JSX.Element {
    return (
        <Text style={[{top: y * 10, left: x * 10}, styles.food]}>{randomFruit}</Text>
    );
};

const styles = StyleSheet.create({
    food: {
        width: 20,
        height: 20,
        borderRadius: 7,
        position: 'absolute'
    }
});