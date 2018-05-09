import React from "react";
import {
    View,
    TextInput,
    Button,
    StyleSheet
 } from "react-native";
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

    handleSubmit = () => {
        const { navigate } = this.props.navigation;
        const hostSocket = this.form_data.ip._lastNativeText;
        if (hostSocket) {
            this.socket = SocketIOClient('http://192.168.0.47:3001');
            this.socket.on("mes", data => {
                console.log(data);
            })

            // this.setState({
            //     isConnecting: true
            // })
            // navigate("Login");
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

export default ConnectServer;