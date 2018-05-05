import React from "react";
import {
    View
} from "react-native"


const SliderV2 = ({ color, ...props }) => {
    return (
        <View
            style={{
                height: 4,
                borderWidth: 1,
                borderColor: "black",
                paddingRight: 2,
                marginLeft: 20,
            }}
        >
            <View
                style={{
                    width: `${props.value}%`,
                    height: "100%",
                    backgroundColor: color,
                }}
            />
        </View>
    )
}

export default SliderV2;