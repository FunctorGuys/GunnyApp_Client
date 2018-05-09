import {
    StackNavigator,
} from 'react-navigation';
import {
    App,
    ConnectServer,
    Login,
    Rooms,
    WaitingRoom,
    GamePlayGround,
 } from "./container";

const AppRoute = StackNavigator(
    {
        // App: { screen: App },
        ConnectServer: { screen: ConnectServer },
        Login: { screen: Login },
        // Rooms: { screen: Rooms },
        // WaitingRoom: { screen: WaitingRoom },
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