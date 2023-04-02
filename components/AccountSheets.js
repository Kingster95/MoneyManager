import * as React from "react";
import { StyleSheet, Text, View, Button, Image, Pressable } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import BottomSheet from "reanimated-bottom-sheet";
import Fonts from "../styles/Fonts";
export function AccountSheets({ sheetRef, callback }) {
  //sheetRef.current.snapTo(2);
  const renderContent = () => (
    <View style={styles.body}>
      <View style={styles.modalHeader}>
        <Text style={styles.modalTitle}>Accounts</Text>
        <View
          style={{
            flexDirection: "row",
            width: "35%",
            justifyContent: "space-evenly",
            alignContent: "center",
            alignContent: "center",
            alignSelf: "center",
          }}
        >
          <Image
            source={require("../assets/ungroup_icon.png")}
            style={[styles.icons, { width: Fonts.h5, height: Fonts.h5 }]}
          />
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
        <View style={styles.modalCategory}>
          <Pressable
            onPressIn={() => [callback(0), sheetRef.current.snapTo(0)]}
            style={({ pressed }) => [
              styles.categoryTouchable,
              { opacity: pressed ? 0.5 : 1 },
            ]}
          >
            <Text style={styles.categoryTitle}>Cash</Text>
          </Pressable>
        </View>
        <View style={styles.modalCategory}>
          <Pressable
            onPressIn={() => [callback(1), sheetRef.current.snapTo(0)]}
            style={({ pressed }) => [
              styles.categoryTouchable,
              { opacity: pressed ? 0.5 : 1 },
            ]}
          >
            <Text style={styles.categoryTitle}>Accounts</Text>
          </Pressable>
        </View>
        <View style={styles.modalCategory}>
          <Pressable
            onPressIn={() => [callback(2), sheetRef.current.snapTo(0)]}
            style={({ pressed }) => [
              styles.categoryTouchable,
              { opacity: pressed ? 0.5 : 1 },
            ]}
          >
            <Text style={styles.categoryTitle}>Card</Text>
          </Pressable>
        </View>
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
      height: "20%",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
    },
    modalCategory: {
      width: "33.3%",
      height: "100%",
      backgroundColor: "transparent",
      alignItems: "center",
      justifyContent: "center",
      borderRightWidth: 1,
      borderBottomWidth: 1.5,
      borderColor: "#3b3c41",
    },
    categoryTouchable: {
      backgroundColor: "transparent",
      width: "100%",
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
    categoryTitle: {
      fontSize: Fonts.medium,
      color: "white",
    },
    iconButtons: {
      backgroundColor: "transparent",
      alignSelf: "center",
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
