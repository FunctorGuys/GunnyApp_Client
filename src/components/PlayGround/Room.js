import React from "react";
import {
    View,
    Button,
    Text,
    StyleSheet,
    Dimensions,
    Animated,
 } from "react-native";

import { connect } from "react-redux";

const Player = props => {
    let sourceImg = require("../../images/player-icon-left.png");
    let style = {
        position: "absolute",
        zIndex: 1,
        top: 0,
    }
    if (props.isRight) {
        style.right = 5;
        sourceImg = require("../../images/player-icon-right.png");
    } else {
        style.left = 5;
    }

    const { user } = props;

    return (
        <View
            style={style}
        >
            <Animated.Image source={sourceImg}
                style={{
                    height: 50,
                    width: 50,
                }}
            />
            <Text style={[
                styles.text,
                {
                    color: user.isReady ? "#00ff59" : "#ffffff"
                }
            ]}>{user.fullname}</Text>
            <Text style={styles.text}>W: {user.win} L:{user.lose}</Text>
        </View>
    );
} 

class Room extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }

        this.element = {}
    }

    componentWillReceiveProps(nextProps) {
        // console.log("nextProps.roomData", nextProps.roomData);
        const { creater, invitee } = nextProps.roomData;
        if (creater.isReady && invitee.isReady && !nextProps.selectedRoom.isReady) {
            nextProps.onPlaying();
        }
    }

    onPressCreateRoom = () => { 
    }

    onPressEnterRoom = () => {
        this.props.onEnterRoom(this.props.roomData.id);
    }

    onPressReady = () => {
        this.props.onPressReady(this.props.roomData.id, this.props.userLogged.id);
    }

    onPressNoReady = () => {
        this.props.onPressNoReady(this.props.roomData.id, this.props.userLogged.id);
    }

    getButtonCenter = () => {
        return (
            <View style={styles.buttonCenter} >
                {
                    this.props.roomData.isFull ?
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
        );
    }

    onLeaveRoom = () => {
        this.props.onLeaveRoom(this.props.roomData.id);
    }

    getButtonsJoined = () => {
        const me = this.props.roomData.creater.id === this.props.userLogged.id ? this.props.roomData.creater : this.props.roomData.invitee;
        return (
            <View>
                <View style={styles.buttonLeave} >
                    <Button
                        title="Thoát"
                        color="#8c995e"
                        onPress={this.onLeaveRoom}
                    />
                </View>

                <View style={styles.buttonReady} >
                    {
                        me.isReady ?
                        <Button
                            title="Hủy sẵn sàng"
                            color="#009dc4"
                            onPress={this.onPressNoReady}
                        /> :
                        <Button
                            title="Sẵn sàng"
                            color="#009dc4"
                            onPress={this.onPressReady}
                        />
                    }
                </View>
            </View>
        )
    }
   
    render() {
        const { roomData } = this.props;
        return (
            <View style={styles.room}>
                <Player user={roomData.creater} />
                
                {
                    this.props.roomData.id !== this.props.selectedRoom.idRoom ?
                    this.getButtonCenter() :
                    this.getButtonsJoined()
                }

                
                {
                    roomData.invitee.id &&
                   <Player user={roomData.invitee} isRight />
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
    buttonReady: {
        width: 100,
        position: "absolute",
        left: "50%",
        top: 10,
        transform: [
            {
                translateX: -50
            }
        ]
    },
    buttonLeave: {
        width: 100,
        position: "absolute",
        left: "50%",
        top: 60,
        transform: [
            {
                translateX: -50
            },
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

const mapStateToProps = store => {
    return {
        userLogged: store.user.userLogged,
        selectedRoom: store.rooms.selectedRoom
    }
}

export default connect(mapStateToProps)(Room);