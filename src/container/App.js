import React from 'react';
import { View, Button, Text } from "react-native";
import { stylesAppContainer } from "../styles";
import { connect } from "react-redux";
import {
    addUser
} from "../actions/users";


const mapStateToProps = (store) => {
    return {
        users: store.users,
    }
}

const mapDispatchToProps = {
    addUser,
}


class App extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
    }

    render() {
        return (
            <View>
                <Text>sadfasf</Text>
            </View>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);