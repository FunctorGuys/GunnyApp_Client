import React from "react";
import {
    View,
    TextInput,
    Button,
    StyleSheet
} from "react-native";
import { connect } from "react-redux";
import {
    sk_connect
} from "../actions/socket";

// Will move this to socket action
import SocketIOClient from 'socket.io-client';
//

class ConnectServer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isConnecting: false,
        }
        this.form_data = {};
    }

    componentWillMount() {
        this.setState({
            isConnecting: false
        })
    }

    handleSubmit = () => {
        const { navigate } = this.props.navigation;
        const host = this.form_data.ip._lastNativeText;
        if (host) {
            const _host = `http://${host}`;
            const _socket = SocketIOClient(_host);
            _socket.on("connect", () => {
                this.props.sk_connect(_socket, _host);
                this.setState({
                    isConnecting: true
                })
                navigate("Login");
            })
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={{
                        width: "70%",
                        height: 40,
                        marginBottom: 50
                    }}
                    placeholder="Type here to check ip server address!"
                    ref={ref => this.form_data.ip = ref}
                />
                
                <Button
                    disabled={this.state.isConnecting}
                    onPress={this.handleSubmit}
                    color="#55688f"
                    title="Connect to server"
                />
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
})

const mapStateToProps = state => {
    return {
        ...state,
    }
}

const mapDispatchToProps = {
    sk_connect,
}

export default connect(mapStateToProps, mapDispatchToProps)(ConnectServer);