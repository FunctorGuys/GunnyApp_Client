import React from "react";
import {
    Animated,
 } from "react-native";

const Stone = ({ x, y }) => {
    return (
        <Animated.Image source={ require("../../images/stone.png") }
            style={{
                height: 30,
                width: 30,
                position: "absolute",
                zIndex: 1,
                top: 0,
                left: 0,
                resizeMode: 'stretch',
                transform: [
                    {
                        translateX: x
                    },
                    {
                        translateY: y
                    }
                ]
            }}
        />
    )
}

export default Stone;