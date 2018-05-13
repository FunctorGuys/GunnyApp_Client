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
     Room
} from "../components"; 

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

    onPressEnterRoom = () => {

    }
   
    render() {
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
                    <Room />
                    <Room />
                    <Room />
                    <Room />
                    <Room />
                    <Room />
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

export default Rooms;