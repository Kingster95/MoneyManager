import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomePage from "../pages/HomePage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Stats from "../pages/Stats";
import Accounts from "../pages/Accounts";
import Settings from "../pages/Settings";
import { Image } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import LogTransactions from "../pages/LogTransactions";
import Fonts from "../styles/Fonts";
export const Tab = createBottomTabNavigator();
export default function UserStack(){
    return(

        <NavigationContainer>
           <Tab.Navigator
                screenOptions={{
                    headerShown:false,
                    tabBarStyle: {backgroundColor:"#1F2022",height:"5.5%", borderTopWidth:1, borderTopColor:"#34373e"},
                    tabBarItemStyle: {backgroundColor:"#1F2022"},
                }}
               
                initialRouteName = "Trans."
                
           >
            <Tab.Screen name="Trans." component={HomePage} options={{
                tabBarLabel: "Trans.",
                tabBarActiveTintColor:"#fd6557",
                tabBarLabelStyle:{
                    fontSize: Fonts.small,
                    bottom: "10%",
                },
                tabBarIcon: ({focused}) =>
                (
                    <Image 
                        fadeDuration={0}
                        style={{width:Fonts.input,height:Fonts.input, tintColor: focused?"#fd6557":"grey"}}
                        source={require("../assets/transactions_icon.png")}
                    />
                ),
            }} />
            <Tab.Screen name="Stats" component={Stats} options={{
                tabBarLabel: "Stats",
                tabBarActiveTintColor:"#fd6557",
                tabBarLabelStyle:{
                    fontSize: Fonts.small,
                    bottom: "10%",
                },
                tabBarIcon: ({focused}) =>
                (
                    <Image 
                        fadeDuration={0}
                        style={{width:Fonts.input,height:Fonts.input, tintColor: focused?"#fd6557":"grey"}}
                        source={require("../assets/stats_icon.png")}
                    />
                ),
            }} />
             <Tab.Screen name="Accounts" component={Accounts} options={{
                tabBarLabel: "Accounts",
                tabBarActiveTintColor:"#fd6557",
                tabBarLabelStyle:{
                    fontSize: Fonts.small,
                    bottom: "10%",
                },
                tabBarIcon: ({focused}) =>
                (
                    <Image 
                        fadeDuration={0}
                        style={{width:Fonts.input,height:Fonts.input, tintColor: focused?"#fd6557":"grey"}}
                        source={require("../assets/accounts_icon.png")}
                    />
                ),
            }} />
            <Tab.Screen name="More" component={Settings} options={{
                tabBarLabel: "More",
                tabBarActiveTintColor:"#fd6557",
                tabBarLabelStyle:{
                    fontSize: Fonts.small,
                    bottom: "10%",
                },
                tabBarIcon: ({focused}) =>
                (
                    <Image 
                        fadeDuration={0}
                        style={{width:Fonts.input,height:Fonts.input, tintColor: focused?"#fd6557":"grey"}}
                        source={require("../assets/more_icon.png")}
                    />
                ),
            }} />
             <Tab.Screen name="LogTransactions" component={LogTransactions} options={{

                tabBarItemStyle:{display:"none"},
                tabBarStyle:{display:"none"},
            }} />
           </Tab.Navigator>
            
        </NavigationContainer>

    );
}