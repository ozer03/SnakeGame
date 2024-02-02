import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Colors } from "../styles/colors";

interface HeaderProps {
    reloadGame: () => void
    pauseGame: () => void
    children: JSX.Element
    isPaused: boolean
    highScore: number
};

export default function Header({
    children,
    reloadGame,
    pauseGame,
    isPaused,
    highScore
}: HeaderProps):JSX.Element {


    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={reloadGame} style={{flex:1, flexDirection: 'row', alignItems: 'center', gap: 5}}>
                <Icon name="reload" size={35} color={Colors.primary}/>
                <Text style={{color: Colors.primary}}>High Score: {highScore}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={pauseGame} style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <Icon 
                    name={isPaused ? "play-circle" : "pause-circle"}
                    size={35}
                    color={Colors.primary}
                />
            </TouchableOpacity>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 0.05,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderColor: Colors.primary,
        borderWidth: 12,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        borderBottomWidth: 0,
        padding: 15,
        backgroundColor: Colors.background,
    },
});