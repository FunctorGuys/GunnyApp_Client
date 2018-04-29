import React from "react";
import {
    View,
    TextInput,
    Button
 } from "react-native";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.form_data = {};
    }

    handleSubmit = () => {
        console.log(this.props);
    }

    render() {
        return (
            <View>
                <TextInput
                    style={{height: 40}}
                    placeholder="Username"
                    ref={ref => this.form_data.username = ref}
                />
                <TextInput
                    style={{height: 40}}
                    placeholder="Password"
                    ref={ref => this.form_data.password = ref}
                />
                <Button
                    onPress={this.handleSubmit}
                    color="#55688f"
                    title="Login"
                />
            </View>
        )
    }
}

export default Login;