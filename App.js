import "react-native-gesture-handler";
import UserStack from "./navigation/userStack";
import { StatusBar, StyleSheet, View } from "react-native";
export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto"/>
      <UserStack />
    </View>
  );
}

const styles = StyleSheet.create({
    container:{
      flex: 1,
    },
});
