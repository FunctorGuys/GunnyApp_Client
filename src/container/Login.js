import React from "react";
import {
    View,
    TextInput,
    Button,
    StyleSheet
} from "react-native";
import { connect } from "react-redux";

import {
    loginUser,
    getAbc
} from "../actions/users";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.form_data = {};
    }

    handleSubmit = async () => {
        const username = this.form_data.username._lastNativeText || "";
        const password = this.form_data.password._lastNativeText || "";
        
        try {
            await this.props.loginUser({username, password});
            const { navigate } = this.props.navigation;
            navigate("Rooms");
        } catch(er) {
            console.log(er);
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    ref={ref => this.form_data.username = ref}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    ref={ref => this.form_data.password = ref}
                />
                <View
                    style={styles.buttonContainer}
                >
                    <Button
                        onPress={this.handleSubmit}
                        color="#55688f"
                        title="Login"
                    />
                    <View style={styles.br} />
                    <Button
                        onPress={this.handleSubmit}
                        color="#55688f"
                        title="Sign Up"
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#a8a39f',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        width: '70%',
        height: 40,
    },
    buttonContainer: {
        marginTop: 30
    },
    br: {
        margin: 10
    }
})

const mapStateToProps = state => {
    return {
        ...state,
    }
}

const mapDispatchToProps = {
    loginUser,
    getAbc,
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);