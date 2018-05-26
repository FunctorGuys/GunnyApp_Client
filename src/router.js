import {
    StackNavigator,
} from 'react-navigation';
import {
    App,
    ConnectServer,
    Login,
    Register,
    Rooms,
    WaitingRoom,
    GamePlayGround,
 } from "./container";

const AppRoute = StackNavigator(
    {
        // App: { screen: App },
        ConnectServer: { screen: ConnectServer },
        Login: { screen: Login },
        Register: { screen: Register},
        Rooms: { screen: Rooms },
        WaitingRoom: { screen: WaitingRoom },
        GamePlayGround: { screen: GamePlayGround }
    },
    {
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
        }
    }
);

export default AppRoute;