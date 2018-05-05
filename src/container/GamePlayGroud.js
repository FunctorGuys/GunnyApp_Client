import React from "react";
import ReactDOM from 'react-dom';
import {
    Image,
    ImageBackground,
    Animated,
    View,
    TextInput,
    Button,
    Text,
    Dimensions
 } from "react-native";
import Canvas from "react-native-canvas";

import { stylesPlayGround, stylesAppContainer } from "../styles/index";

class GamePlayGroud extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stonePos: {
                x: 0,
                y: Dimensions.get('window').height - 50
            },
            intervalStone: null,
        }
        this.element = {};
    }

    componentDidMount() {
        let x = 0, y = 0;
        let alpha = 45*Math.PI/180;
        let xStone = this.state.stonePos.x;
        let yStone = this.state.stonePos.y;
        this.setState({
            intervalStone: setInterval(() => {
                x+=10;
                y = (-10/(2*Math.pow(70, 2)*Math.pow(Math.cos(alpha), 2)))*Math.pow(x, 2) + x*Math.tan(alpha);
                this.moveStone(x, yStone - y);
            }, 1)
        })
    }

    

    moveStone(x, y) {
        console.log(x, y);
        if (y > 1000) clearInterval(this.state.intervalStone);
        this.setState({
            stonePos: { x, y }
        })
    }
   
    render() {
        return (
            <ImageBackground ref={ref => this.element.bg = ref} id="bg" source={ require("../images/bg.jpg") } style={stylesPlayGround.container}>
                <Animated.Image id="stone" source={ require("../images/stone.png") }
                    style={{
                        height: 50,
                        width: 50,
                        position: "absolute",
                        zIndex: 1,
                        bottom: 50,
                        top: 0,
                        resizeMode: 'stretch',
                        transform: [
                            {
                                translateX: this.state.stonePos.x
                            },
                            {
                                translateY: this.state.stonePos.y
                            }
                        ]
                    }}
                ></Animated.Image>
            </ImageBackground>
        )
    }
}


export default GamePlayGroud;