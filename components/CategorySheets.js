import * as React from "react";
import { StyleSheet, Text, View, Button, Image, Pressable, FlatList,Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import BottomSheet from "reanimated-bottom-sheet";
import Fonts from "../styles/Fonts";
export function CategorySheet({ sheetRef, callback }) {

  const categories = [
    { title: "🍜 Food", onPress: () => [callback(0),sheetRef.current.snapTo(0)] },
    { title: "🧑🏽‍🤝‍🧑🏻 Social Life", onPress: () => [callback(1),sheetRef.current.snapTo(0)] },
    { title: "🐱 Pets", onPress: () => [callback(2),sheetRef.current.snapTo(0)] },
    { title: "🚖 Transport", onPress: () => [callback(3),sheetRef.current.snapTo(0)] },
    { title: "🖼️ Culture", onPress: () => [callback(4),sheetRef.current.snapTo(0)] },
    { title: "🪑 Household", onPress: () => [callback(5),sheetRef.current.snapTo(0)] },
    { title: "👕 Apparel", onPress: () => [callback(6),sheetRef.current.snapTo(0)] },
    { title: "💄 Beauty", onPress: () => [callback(7),sheetRef.current.snapTo(0)] },
    { title: "🧘 Health", onPress: () => [callback(8),sheetRef.current.snapTo(0)] },
    { title: "📙 Education", onPress: () => [callback(9),sheetRef.current.snapTo(0)] },
    { title: "🎁 Gift", onPress: () => [callback(10),sheetRef.current.snapTo(0)] },
    { title: "Other", onPress: () => [callback(11),sheetRef.current.snapTo(0)] },
    // Add more objects for each additional component
  ];

  //sheetRef.current.snapTo(2);
  const renderContent = () => (
    <View style={styles.body}>
      <View style={styles.modalHeader}>
        <Text style={styles.modalTitle}>Category</Text>
        <View
          style={{
            flexDirection: "row",
            width: "17%",
            justifyContent: "space-between",
            alignContent: "center",
            alignContent: "center",
            alignSelf: "center",
            right:"5%",
          }}
        >
          <Image
            source={require("../assets/edit_icon.png")}
            style={[styles.icons, { width: Fonts.h6, height: Fonts.h6 }]}
          />
          <Pressable
            style={styles.iconButtons}
            onPress={() => sheetRef.current.snapTo(0)}
          >
            <Image
              source={require("../assets/x_icon.png")}
              style={[styles.icons, { width: Fonts.small, height: Fonts.small }]}
            />
          </Pressable>
        </View>
      </View>
      <View style={styles.modalCategories}>
        <FlatList
        style={{ flex: 1 }}
        contentContainerStyle={styles.categoriesList}
        data={categories}
        numColumns={3}
        renderItem={({item}) =>
          <View style={styles.modalCategory}>
          <Pressable style={{flex:1,justifyContent:"center"}} onPress={() => item.onPress()}>
            <Text>{item.title}</Text>
          </Pressable>
          </View>
      }
      />
      </View>
    </View>
  );
  const styles = StyleSheet.create({
    body: {
      backgroundColor: "#212226",
      height: "100%",
    },
    modalHeader: {
      backgroundColor: "#7e7f84",
      height: "12%",
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignContent: "center",
      alignItems: "center",
    },
    modalTitle: {
      left: "50%",
      fontSize: Fonts.regular,
      color: "#25262b",
      fontWeight: 400,
    },
    icons: {
      alignSelf: "center",
      tintColor: "#25262b",
    },
    modalCategories: {
      backgroundColor: "#27282d",
      width: "100%",
      height: "100%",
    },
    categoriesList:{
      width:"100%",
      height:"100%",
      backgroundColor:"transparent",
      
    },
    modalCategory:{
      backgroundColor:"transparent",
      width:"33.3%",
      height:Dimensions.get("window").height * 0.072,
      justifyContent:"center",
      alignItems:"center",
      borderRightWidth: 1,
      borderBottomWidth: 1.5,
      borderColor: "#3b3c41",
    },
    iconButtons: {
      backgroundColor: "transparent",
      alignSelf: "center",
      width:"40%",
      height:"100%",
    },
  });
  return (
    <>
      <BottomSheet
        ref={sheetRef}
        snapPoints={[0, "42%", "30%"]}
        initialSnap={0}
        renderContent={renderContent}
      />
    </>
  );
}
