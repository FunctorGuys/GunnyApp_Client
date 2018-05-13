import React from "react";
import {
    View,
    TextInput,
    Button,
    Text,
    StyleSheet,
    Dimensions,
    ImageBackground,
    ScrollView,
    Animated,
 } from "react-native";

import {
    connect
} from "react-redux";

 import {
     Room
} from "../components"; 

import {
    enterRoom,
    leaveRoom,
    onReady
} from "../actions/room";

const uuid = require("uuid");

class Rooms extends React.Component {
    constructor(props) {
        super(props);

        this.element = {}
        this.wWidth = Dimensions.get('window').width;
        this.wHeigth = Dimensions.get('window').height;
    }

    onPressCreateRoom = () => { 
        console.log("new room");
    }

    handleEnterRoom = (room_id) => {
        this.props.enterRoom(room_id);
    }

    handleLeaveRoom = (room_id) => {
        this.props.leaveRoom(room_id);
    }

    handleOnReady = (room_id, user_id) => {
        this.props.onReady(room_id, user_id);
    }
   
    render() {
        const roomSelected = this.props.allRooms.filter(room => room.id === this.props.selectedRoom.idRoom)[0];
        return (
            <ImageBackground
                ref={ref => this.element.bg = ref}
                source={require("../images/bg.png")}
                style={styles.container}
            >
                <View style={styles.barTop}>
                    <View style={styles.buttonNew} >
                        <Button
                            title="New Room"
                            color="#841584"
                            onPress={this.onPressCreateRoom}
                        />
                    </View>

                    <View style={styles.buttonPlay} >
                        <Button
                            title="Play"
                            color="#008229"
                            onPress={this.onPressCreateRoom}
                        />
                    </View>
                </View>

                <ScrollView style={{
                    width: "100%",
                    height: this.wHeigth - 150,
                    position: "absolute",
                    left: 0,
                    top: 100,
                }}>
                    {
                        !this.props.selectedRoom.idRoom ? this.props.allRooms.map(room => {
                            return (
                                <Room
                                    key={uuid()}
                                    roomData={room}
                                    onEnterRoom={this.handleEnterRoom}
                                />
                            );
                        }) : 
                        <Room
                            roomData={roomSelected}
                            onLeaveRoom={this.handleLeaveRoom}
                            onPressReady={this.handleOnReady}
                        />
                    }
                </ScrollView>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'top',
    },
    barTop: {
        marginTop: 50,
        width: "100%",  
        position: "relative"
    },
    buttonNew: {
        width: '40%',
        position: "absolute",
        left: 0,
        top: 0
        // height: 40
    },
    buttonPlay: {
        width: '40%',
        position: "absolute",
        right: 0,
        top: 0
        // height: 40
    },
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
        backgroundColor: "rgba(239, 2, 2, 0.3)",
        marginTop: 10
    },
    text: {
        textAlign: "center"
    }
})

const mapStateToProps = store => {
    return {
        selectedRoom: store.rooms.selectedRoom,
        allRooms: store.rooms.allRooms,
    }
}

const mapDispatchToProps = {
    enterRoom,
    leaveRoom,
    onReady
}

export default connect(mapStateToProps, mapDispatchToProps)(Rooms);