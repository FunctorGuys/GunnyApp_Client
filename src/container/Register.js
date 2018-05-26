import React from "react";
import {
    View,
    TextInput,
    Text,
    Button,
    StyleSheet
} from "react-native";
import {
    bootstrap
} from "../styles";
import { connect } from "react-redux";
import {
    getDataForm
} from "../constants/function.common.js"

import {
    registerUser,
    getAbc
} from "../actions/users";

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.form_data = {};
        this.state = {
            error: "",
            isConnecting: false
        }
    }

    getDataForm = () => {
        return getDataForm(this.form_data);
    }

    handleSubmit = async () => {
        const data = this.getDataForm();
        if (data) {
            try {
                this.setState({
                    isConnecting: true,
                })
                await this.props.registerUser(data, (er, data) => {
                    if (!er) {
                        this.setState({
                            error: "",
                            isConnecting: false
                        })
                        this.props.navigation.navigate("Login");
                    }
                });

            } catch(er) {
                this.setState({
                    isConnecting: false,
                    error: er.response.data.error,
                })
            }
        } else {
            this.setState({
                error: "Please fill all input!"
            })
        }
    }

    handleLogin = () => {
        this.props.navigation.navigate("Login");
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
                <TextInput
                    style={styles.input}
                    placeholder="Confirm Password"
                    ref={ref => this.form_data.cfpassword = ref}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Fullname"
                    ref={ref => this.form_data.fullname = ref}
                />
                <Text style={bootstrap.textDanger}>{this.state.error}</Text>
                <View
                    style={styles.buttonContainer}
                >
                    <Button
                        disabled={this.state.isConnecting}
                        onPress={this.handleSubmit}
                        color="#55688f"
                        title="Enter"
                    />
                    <View style={styles.br} />
                    <Button
                        onPress={this.handleLogin}
                        color="#55688f"
                        title="Back"
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
    registerUser,
    getAbc,
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);