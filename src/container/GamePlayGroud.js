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
    Dimensions,
    Slider
 } from "react-native";
import Canvas from "react-native-canvas";

import {
    SliderV2,
} from "../components/common";

import {
    Stone,
    Player
} from "../components"; 

import { stylesPlayGround, stylesAppContainer } from "../styles/index";

class GamePlayGroud extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            theNextOne: -1,
            stonePos: {
                x: 0,
                y: 0
            },
            sliderPower: {
                value: 0,
                isRunning: false,
            },
            sliderAlpha: {
                value: 45,
            },
            me: {
                name: "player 1",
                pos: {
                    dir: -1,
                    x: 0,
                    y: 0,
                }
            },
            competitor: {
                name: "player 2",
                pos: {
                    dir: 1,
                    x: 0,
                    y: 0,
                }
            }
        }
        this.element = {};
        this.wWidth = Dimensions.get('window').width;
        this.wHeigth = Dimensions.get('window').height;
    }

    componentWillMount() {
        this.initStone();
        this.movePlayer('me', 0, this.wHeigth);
        this.movePlayer('competitor', this.wWidth, this.wHeigth);
    }

    initStone = () => {
        if (this.state.theNextOne === -1) {
            this.moveStone(0, this.wHeigth - 100);
        } else {
            this.moveStone(this.wWidth - 100, this.wHeigth - 100);
        }
        
    }

    initSlider = () => {
        this.setState({
            sliderPower: {
                value: 0,
                isRunning: false,
            },
            sliderAlpha: {
                value: 45,
            },
        })
    }

    shotStone = () => {
        let x = 0, y = 0;
        let alpha;
        let xStone = this.state.stonePos.x;
        let yStone = this.state.stonePos.y;

        if (this.state.theNextOne === -1) {
            alpha = this.state.sliderAlpha.value*Math.PI/180;
        } else {
            alpha = (this.state.sliderAlpha.value + 90)*Math.PI/180;
        }
        
        this.intervalStone = setInterval(() => {
            x += -10*this.state.theNextOne;
            y = (-10/(2*Math.pow(this.state.sliderPower.value, 2)*Math.pow(Math.cos(alpha), 2)))*Math.pow(x, 2) + x*Math.tan(alpha);
            this.moveStone(xStone + x, yStone - y);
            if (yStone - y > this.wHeigth) this.stopStone();
        }, 1)
    }

    stopStone = () => {
        this.setTheNextOne(-this.state.theNextOne);
        this.initStone();
        this.initSlider();
        clearInterval(this.intervalStone);
    }

    setTheNextOne = (dir) => {
        this.setState(() => {
            this.state.theNextOne = dir;
            return this.state;
        })
    }

    moveStone(x, y) {
        console.log(this.state.theNextOne, x ,y);
        this.setState({
            stonePos: { x, y }
        })
    }

    movePlayer = (who, x, y) => {
        this.setState(() => {
            this.state[`${who}`].pos.x = x;
            this.state[`${who}`].pos.y = y;
        })
    }

    onPressShot = () => {
        if (this.state.sliderPower.isRunning) {
            clearInterval(this.intervalSliderPower);
            this.setState(() => {
                this.state.sliderPower.isRunning = false;
                return this.state;
            })
            this.shotStone();
            return;
        }
        this.setState(() => {
            this.state.sliderPower.isRunning = true;
            return this.state;
        })
        this.intervalSliderPower = setInterval(() => {
            this.setState(() => {
                this.state.sliderPower.value += 1;
                if (this.state.sliderPower.value == 100) this.state.sliderPower.value = 0;
                return this.state;
            })
        }, 1);
    }

    handleChangeSliderAlpha = e => {
        this.setState({
            sliderAlpha: {
                value: e,
            }
        })
    }
   
    render() {
        return (
            <ImageBackground
                ref={ref => this.element.bg = ref}
                source={require("../images/bg.jpg")}
                style={stylesPlayGround.container}
            >
                <View
                    id="controls-btn"
                    style={{
                        width: this.wWidth/3,
                        // height: 50,
                        position: "absolute",
                        left: 0,
                        top: 20,
                    }}
                >
                    <Slider
                        step={1}
                        maximumValue={90}
                        onValueChange={this.handleChangeSliderAlpha}
                        value={this.state.sliderAlpha.value}
                    />
                    <SliderV2 color="#16ff64" value={this.state.sliderPower.value} />
                    <Text
                        onPress={this.onPressShot}
                        style={{
                            color: "white",
                            backgroundColor: "red",
                            width: 50,
                            height: 50,
                            borderRadius: 50,
                            borderWidth: 5,
                            borderColor: "#660c1b",
                            margin: 20,
                        }}
                    ></Text>
                </View>
                <Stone x={this.state.stonePos.x} y={this.state.stonePos.y} />
                <Player infoPlayer={this.state.me} />
                <Player infoPlayer={this.state.competitor} />
            </ImageBackground>
        )
    }
}

export default GamePlayGroud;