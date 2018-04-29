import React from "react";
import {
    View,
    TextInput,
    Button
 } from "react-native";

class ConnectServer extends React.Component {
    constructor(props) {
        super(props);
        this.form_data = {};
    }

    handleSubmit = () => {
        const { navigate } = this.props.navigation;
        if (this.form_data.ip._lastNativeText === "ok") {
            navigate("Login", {
                username: "Admin",
                password: "123456"
            })
        }
    }

    render() {
        return (
            <View>
                <TextInput
                    style={{height: 40}}
                    placeholder="Type here to check ip server address!"
                    ref={ref => this.form_data.ip = ref}
                />
                <Button
                    onPress={this.handleSubmit}
                    color="#55688f"
                    title="Check Ip"
                />
            </View>
        )
    }
}

export default ConnectServer;