import { StyleSheet } from "react-native";

const stylesAppContainer = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ccc',
      alignItems: 'center',
      justifyContent: 'center',
    },
});

const stylesPlayGround = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        backgroundColor: '#ccc',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    infoPlayer: {
        borderColor: "#f7b35b",
        borderWidth: 1,
        // width: "50%",
    },
    canvas: {
        borderColor: "#f7b35b",
        borderWidth: 1,
        width: "10%",
        height: 50,
        position: "absolute",
        zIndex: 1,
        top: 0
    }
});

export {
    stylesAppContainer,
    stylesPlayGround
}