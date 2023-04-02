import { View, StyleSheet, Text, Image } from "react-native";
import Fonts from ".././styles/Fonts";
import { FlatList } from "react-native-gesture-handler";

const options = [
  {
    title: "Configuration",
    onPress: () => console.log("Configuration Pressed"),
    icon: require("../assets/configuration_icon.png"),
  },
  {
    title: "Accounts",
    onPress: () => console.log("Configuration Pressed"),
    icon: require("../assets/accounts_icon.png"),
  },
  {
    title: "Passcode",
    onPress: () => console.log("Configuration Pressed"),
    icon: require("../assets/passcode_icon.png"),
  },
  {
    title: "Style",
    onPress: () => console.log("Configuration Pressed"),
    icon: require("../assets/style_icon.png"),
  },
  {
    title: "PC Manager",
    onPress: () => console.log("Configuration Pressed"),
    icon: require("../assets/pc_icon.png"),
  },
  {
    title: "Backup",
    onPress: () => console.log("Configuration Pressed"),
    icon: require("../assets/backup_icon.png"),
  },
  {
    title: "Feedback",
    onPress: () => console.log("Configuration Pressed"),
    icon: require("../assets/feedback_icon.png"),
  },
  {
    title: "Help",
    onPress: () => console.log("Configuration Pressed"),
    icon: require("../assets/help_icon.png"),
  },
  {
    title: "Recommend",
    onPress: () => console.log("Configuration Pressed"),
    icon: require("../assets/like_icon.png"),
  },
  // Add more objects for each additional component
];
export default function Settings() {
  return (
    <View style={styles.body}>
      <View style={styles.header}>
        <Text style={{ fontSize: Fonts.input }}>Settings</Text>
        <Text style={{ color: "grey" }}>4.7.4 AD</Text>
      </View>
      <View style={styles.optionsContainer}>
        <FlatList
          style={{ flex: 1 }}
          contentContainerStyle={styles.categoriesList}
          data={options}
          numColumns={3}
          renderItem={({ item }) => (
            <View style={styles.modalCategory}>
              <Image style={styles.optionImage} source={item.icon} />
              <Text>{item.title}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "#25282F",
  },
  header: {
    padding: "3.75%",
    backgroundColor: "transparent",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  optionsContainer: {
    flex: 1,
    backgroundColor: "transparent",
    alignItems: "center",
    alignContent: "center",
  },
  categoriesList: {
    backgroundColor: "transparent",
    width: "95%",
    height: "50%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  modalCategory: {
    backgroundColor: "transparent",
    alignItems: "center",
    paddingTop: "15%",
    width: "33.3%",
    height: "100%",
  },
  optionImage: {
    width: Fonts.h3,
    height: Fonts.h3,
  },
});
