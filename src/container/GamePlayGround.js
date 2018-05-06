import React from "react";
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Dimensions
} from "react-native";

class GamePlayGround extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: [],
        }

        this.numColSquare = 5;
        this.wWidth = Dimensions.get('window').width;
        this.wHeigth = Dimensions.get('window').height;
        this.sizeSquare = parseInt(((this.wWidth > this.wHeigth ? this.wHeigth : this.wWidth) - 50)/this.numColSquare, 10);
    }

    componentWillMount() {
        this.setState(() => {
            for(let i = 0; i < this.numColSquare; i++) {
                const newRowAr = [];
                for (let j = 0; j < this.numColSquare; j++) {
                    newRowAr.push({
                        id: '' + i +  j,
                        isFill: false,
                        text: "X",
                    });
                }
                this.state.squares.push(newRowAr);
            }
            return this.state;
        });
    }

    onPressSquare = _sq => {
        return () => {
            this.setState(() => {
                const posSq = _sq.id.split("");
                this.state.squares[parseInt(posSq[0])][parseInt(posSq[1])].isFill = true;
                return this.state;
            })
        }
    }

    render() {
        return (
            <View style={stylesGamePlayGround.container}>
                <Text>Caro</Text>
                <View style={{
                    width: this.sizeSquare*this.numColSquare,
                    height: this.sizeSquare*this.numColSquare,
                    flex: 1, flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                {
                    this.state.squares.map(rowSq => {
                        return (
                            <View>
                                {
                                    rowSq.map(sq => {
                                        return (
                                            <TouchableOpacity key={sq.id}
                                                style={{
                                                    borderWidth: 1,
                                                    borderColor: "black",
                                                    width: this.sizeSquare,
                                                    height: this.sizeSquare
                                                }}
                                                onPress={this.onPressSquare(sq)}
                                            >
                                                {
                                                    sq.isFill ? 
                                                    <Text style={{ textAlign: 'center' }}>{sq.text}</Text>
                                                    : null
                                                }
                                            </TouchableOpacity>
                                        )
                                    })
                                }
                            </View>
                        )
                    })
                }
                </View>
            </View>
        )
    }
}

const stylesGamePlayGround = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: '#ccc',
      alignItems: 'center',
      justifyContent: 'center',
    },
});

export default GamePlayGround;