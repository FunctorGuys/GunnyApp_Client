import React from "react";
import {
    View,
    TextInput,
    Button,
    Text,
    StyleSheet
} from "react-native";
import { connect } from "react-redux";
import {
    getDataForm
} from "../constants/function.common.js"
import {
    loginUser,
    getAbc
} from "../actions/users";
import {
    bootstrap
} from "../styles/index";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.form_data = {};
        this.state = {
            isConnecting: false,
            error: "",
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
                await this.props.loginUser(data);
                const { navigate } = this.props.navigation;
                navigate("Rooms");
            } catch(er) {
                console.log(er);
                this.setState({
                    isConnecting: false,
                    error: "Username and password incorrect!"
                })
            }
        } else {
            this.setState({
                isConnecting: false,
                error: "Please fill all input!"
            })
        }
        
    }

    handleSignUp = () => {
        this.props.navigation.navigate("Register");
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
                <Text style={bootstrap.textDanger} >{this.state.error}</Text>
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
                        onPress={this.handleSignUp}
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