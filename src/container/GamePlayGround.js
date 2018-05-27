import React from "react";
import { connect } from "react-redux";
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Dimensions
} from "react-native";

import {
    O_CARO,
    X_CARO
} from "../constants/caro.constants";

import {
    initSquares,
    onPressSquare
} from "../actions/room";

const uuid = require('uuid');

class GamePlayGround extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: [],
            whoWin: null,
            waitForCheck: {
                is: false,
                x: null,
                y: null,
            },
        }

        this.numColSquare = 10;
        this.wWidth = Dimensions.get('window').width;
        this.wHeigth = Dimensions.get('window').height;
        this.sizeSquare = parseInt(((this.wWidth > this.wHeigth ? this.wHeigth : this.wWidth) - 50) / this.numColSquare, 10);
        this.props.initSquares(this.numColSquare);
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.waitForCheck.is) {
            const {x, y} = this.state.waitForCheck;

            this.checkCaroWin(nextProps.squares, x, y, data => {
                console.log(data);
            });

            this.setState({
                waitForCheck: {
                    is: false,
                }
            });
        }
    }

    componentWillMount() {
        console.log("Will mount GAME PLAY GROUND");
        // this.setState(() => {
        //     for(let i = 0; i < this.numColSquare; i++) {
        //         const newRowAr = [];
        //         for (let j = 0; j < this.numColSquare; j++) {
        //             newRowAr.push({
        //                 id: i + "|" + j,
        //                 isFill: false,
        //                 isWin: false,
        //                 text: "",
        //             });
        //         }
        //         this.state.squares.push(newRowAr);
        //     }
        //     return this.state;
        // });
    }

    onPressSquare = _sq => {
        return async () => {
            const posSq = _sq.id.split("|");
            const x = parseInt(posSq[0]);
            const y = parseInt(posSq[1]);
            console.log(x, y);
            if (this.props.isAllowPress) {
                try {
                    if (this.props.squares[x][y].isFill) throw new Error("Please choose empty space");
                    await this.props.onPressSquare(x, y);
                    this.setState({
                        waitForCheck: {
                            is: true,
                            x,
                            y,
                        }
                    });
                    // console.log(this.props.squares[x][y]);
                    
                    // Check caro here



                } catch (er) {
                    alert(er);
                }
            } else {
                alert("Ban chua toi luot");
            }

            // if (!this.state.squares[x][y].isFill) {
            //     this.setState(() => {
            //         this.state.squares[x][y].isFill = true;
            //         this.state.squares[x][y].text = 'O';
            //         return this.state;
            //     });
            // }
            // if (!this.state.squares[x][y].isFill) {
            //     this.setState(() => {
            //         this.state.squares[x][y].isFill = true;
            //         this.state.squares[x][y].text = 'O';
            //         return this.state;
            //     }, this.checkCaroWin(x, y, isWin => {
            //         if (isWin) {
            //             alert("DONE");
            //         }
            //     }));
            // }
        }
    }

    checkCaroWin = (squares, x, y, cb) => {
        // return () => {
            const text = squares[x][y].text;
            let dem = 0;
            let isChecked = false;
            // checkNgang
            for (let ng = x - 4; ng <= x + 4; ng++) {
                if (ng < 0 || ng > this.numColSquare - 1) continue;
                if (squares[ng][y].isFill && squares[ng][y].text === text) dem++;
                else dem = 0;
                if (dem === 5) {
                    const arPositionWin = [];
                    for (let w = ng - 4; w <= ng; w++) {
                        arPositionWin.push({
                            x: w,
                            y: y,
                        });
                        // this.setState(() => {
                        //     squares[w][y].isWin = true;
                        //     this.state.whoWin = squares[x][y].text;
                        //     return this.state;
                        // });
                    }

                    isChecked = true;
                    cb(arPositionWin);
                    break;
                }
            }
            if (isChecked) return;
            // check doc
            dem = 0;
            for (let doc = y - 4; doc <= y + 4; doc++) {
                if (doc < 0 || doc > this.numColSquare - 1) continue;
                if (squares[x][doc].isFill && squares[x][doc].text === text) dem++;
                else dem = 0;
                if (dem === 5) {
                    const arPositionWin = [];
                    for (let w = doc - 4; w <= doc; w++) {
                        arPositionWin.push({
                            x: x,
                            y: w,
                        });
                        // this.setState(() => {
                        //     squares[x][w].isWin = true;
                        //     this.state.whoWin = squares[x][y].text;
                        //     return this.state;
                        // });

                    }

                    isChecked = true;
                    cb(arPositionWin);
                    break;
                }
            }
            if (isChecked) return;

            // Cheo trai
            if (isChecked) return;
            dem = 0;
            for (let cheoT = x - 4; cheoT <= x + 4; cheoT++) {
                const _x = cheoT;
                const _y = y - (x - cheoT);

                if (_x < 0 || _y < 0 || _x > this.numColSquare - 1 || _y > this.numColSquare - 1) continue;
                if (squares[_x][_y].isFill && squares[_x][_y].text === text) dem++;
                else dem = 0;
                if (dem === 5) {
                    const arPositionWin = [];
                    for (let w = _x - 4; w <= _x; w++) {
                        const _w = _y - (_x - w);
                        arPositionWin.push({
                            x: w,
                            y: _w,
                        });
                        // this.setState(() => {
                        //     squares[w][_w].isWin = true;
                        //     this.state.whoWin = squares[x][y].text;
                        //     return this.state;
                        // });
                    }
                    isChecked = true;
                    cb(arPositionWin);
                    break;
                }
            }
            if (isChecked) return;
            // Cheo phai
            dem = 0;
            for (let cheoP = x - 4; cheoP <= x + 4; cheoP++) {
                const _x = cheoP;
                const _y = y + (x - cheoP);

                if (_x < 0 || _y < 0 || _x > this.numColSquare - 1 || _y > this.numColSquare - 1) continue;
                if (squares[_x][_y].isFill && squares[_x][_y].text === text) dem++;
                else dem = 0;
                if (dem === 5) {
                    const arPositionWin = [];
                    for (let w = _x - 4; w <= _x; w++) {
                        const _w = _y + (_x - w);
                        arPositionWin.push({
                            x: w,
                            y: _w,
                        });
                        // this.setState(() => {
                        //     squares[w][_w].isWin = true;
                        //     this.state.whoWin = squares[x][y].text;
                        //     return this.state;
                        // });
                    }
                    isChecked = true;
                    cb(arPositionWin);
                    break;
                }
            }
        // }
    }

    render() {
        return (
            <View style={stylesGamePlayGround.container}>
                <Text>Caro</Text>
                <View style={{
                    width: this.sizeSquare * this.numColSquare,
                    height: this.sizeSquare * this.numColSquare,
                    flex: 1, flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    {
                        this.props.squares.map(rowSq => {
                            return (
                                <View key={uuid()}>
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
                                                            <Text style={{
                                                                textAlign: 'center',
                                                                backgroundColor: sq.isWin ? 'green' : 'transparent',
                                                                height: '100%',
                                                                fontSize: this.sizeSquare / 2,
                                                                color: sq.text === O_CARO ? "#0061ff" : "#ff0004"
                                                            }}>{sq.text}</Text>
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

const mapStateToProps = store => {
    return {
        isAllowPress: store.rooms.selectedRoom.isAllowPress,
        squares: store.rooms.selectedRoom.squares,
    }
}

const mapDispatchToProps = {
    initSquares,
    onPressSquare,
}

export default connect(mapStateToProps, mapDispatchToProps)(GamePlayGround);