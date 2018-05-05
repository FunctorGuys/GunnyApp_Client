import React from "react";
import {
    Animated,
} from "react-native";

const w = 100;
const h = 100;

const Player = ({ infoPlayer, ...props }) => {
    const pos = {
        x: infoPlayer.pos.x,
        y: infoPlayer.pos.y - h
    }

    let srcStone = require("../../images/player-icon-left.png");
    if (infoPlayer.pos.dir === 1) {
        srcStone = require("../../images/player-icon-right.png");
        pos.x = pos.x - w;
    }

    const _onLongPess = e => {
        console.log(e);
    }

    return (
        <Animated.Image source={srcStone}
            style={{
                height: h,
                width: w,
                position: "absolute",
                zIndex: 1,
                top: 0,
                left: 0,
                transform: [
                    {
                        translateX: pos.x
                    },
                    {
                        translateY: pos.y
                    }
                ]
            }}
        />
    )
}

export default Player;