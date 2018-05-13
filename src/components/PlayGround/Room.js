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
        this.state = {
        }

        this.element = {}

        console.log(this.props);
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
    }

    onPressCreateRoom = () => { 
    }

    onPressEnterRoom = () => {
        this.props.onEnterRoom(this.props.roomData.id);
    }
   
    render() {
        const { roomData } = this.props;
        return (
            <View style={styles.room}>
                <View
                    style={{
                        position: "absolute",
                        zIndex: 1,
                        top: 0,
                        left: 0,
                    }}
                >
                    <Animated.Image source={require("../../images/player-icon-left.png")}
                        style={{
                            height: 50,
                            width: 50,
                        }}
                    />
                    <Text style={styles.text}>{roomData.creater.fullname}</Text>
                    <Text style={styles.text}>W: {roomData.creater.win} L:{roomData.creater.lose}</Text>
                </View>
                <View style={styles.buttonCenter} >
                    {
                        roomData.isFull ?
                        <Button
                            disabled
                            title="Đang chơi"
                            color="#3f0000"
                            onPress={() => {}}
                        /> : 
                        <Button
                            title="Vào chơi"
                            color="#3f0000"
                            onPress={this.onPressEnterRoom}
                        />
                    }
                </View>
                {
                    roomData.invitee.id &&
                    <View
                        style={{
                            position: "absolute",
                            zIndex: 1,
                            top: 0,
                            right: 0,
                        }}
                    >
                        <Animated.Image source={require("../../images/player-icon-right.png")}
                            style={{
                                height: 50,
                                width: 50,
                            }}
                        />
                        <Text style={styles.text}>{roomData.invitee.fullname}</Text>
                    <Text style={styles.text}>W: {roomData.invitee.win} L:{roomData.invitee.lose}</Text>
                    </View>
                }
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