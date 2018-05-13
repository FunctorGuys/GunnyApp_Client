import React from "react";
import {
    View,
    Button,
    Text,
    StyleSheet,
    Dimensions,
    Animated,
 } from "react-native";

class Room extends React.Component {
    constructor(props) {
        super(props);

        this.element = {}
    }

    onPressCreateRoom = () => { 
        console.log("new room");
    }

    onPressEnterRoom = () => {

    }
   
    render() {
        return (
            <View style={styles.room}>
                <View
                    style={{
                        position: "absolute",
                        zIndex: 1,
                        top: 0,
                        left: 10,
                    }}
                >
                    <Animated.Image source={require("../../images/player-icon-left.png")}
                        style={{
                            height: 50,
                            width: 50,
                        }}
                    />
                    <Text style={styles.text}>Jr Tinh</Text>
                    <Text style={styles.text}>Lv. 1</Text>
                </View>
                <View style={styles.buttonCenter} >
                    <Button
                        title="Vao Choi"
                        color="#3f0000"
                        onPress={this.onPressCreateRoom}
                    />
                </View>
                <View
                    style={{
                        position: "absolute",
                        zIndex: 1,
                        top: 0,
                        right: 10,
                    }}
                >
                    <Animated.Image source={require("../../images/player-icon-right.png")}
                        style={{
                            height: 50,
                            width: 50,
                        }}
                    />
                    <Text style={styles.text}>Jr Tinh</Text>
                    <Text style={styles.text}>Lv. 1</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    buttonCenter: {
        width: 100,
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: [
            {
                translateX: -50
            },
            {
                translateY: -15
            }
        ]
    },
    room: {
        width: "100%",
        height: 100,
        backgroundColor: "rgba(239, 2, 2, 0.1)",
        marginTop: 10
    },
    text: {
        textAlign: "center",
        color: "white"
    }
})

export default Room;