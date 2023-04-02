import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TextInput,
  Pressable,
} from "react-native";
import { styles } from "../styles/LogTransactionsStyle";

import { AccountSheets } from "../components/AccountSheets";
import { CategorySheet } from "../components/CategorySheets";
import { Keyboard } from "react-native";
import Fonts from "../styles/Fonts";
import * as TransactionManager from '../hooks/transactionManager';

export default function LogTransactions() {
  //const [currentSection, setCurrentSection] = useState("Income");
  /*
This is me coding with siund
*/
  const refs = {
    accountRef: useRef(null),
    categoryRef: useRef(null),
    amountRef: useRef(null),
    accountSheetRef: useRef(null),
    categorySheetRef: useRef(null),
  };

  const [pressedIndex, setPressedIndex] = useState(0);

  const titles = ["Income", "Expense", "Transfer"];
  const colors = ["#6c9dd4", "#d76d6a", "white"];

  const [transaction, setTransaction] = useState({
    type: "",
    date: new Date(),
    account: "",
    category: "",
    amount: "",
    note: "",
    description: "",
  });

  const [index, setIndex] = useState(0);
  function TransactionCallback( data ){
    try{
    const numberData = Number(data);
      setIndex(numberData);
    }catch(e){
      console.error("Error setting index: ", e);
    }
  }
  function handleSave() {
    console.log("Attempt to add transaction..");
    TransactionManager.getLastIndex(TransactionCallback);
    console.log("Transaction number: ", index);

    if (transaction.account == "") {
      console.log("Account not set");
      refs.accountRef.current.focus();
      refs.accountSheetRef.current.snapTo(1);
      return;
    }
    if (transaction.category == "") {
      console.log("Category not set");
      refs.categoryRef.current.focus();
      refs.categorySheetRef.current.snapTo(1);
      return;
    }
    if (transaction.amount == "") {
      console.log("Amount not set");
      refs.amount.current.focus();
      return;
    }

    if (pressedIndex === 0) setTransaction({ ...transaction, type: "Income" });
    else if (pressedIndex === 1)
      setTransaction({ ...transaction, type: "Expense" });
    else if (pressedIndex === 2)
      setTransaction({ ...transaction, type: "Transfer" });

    setTimeout(() => {
      TransactionManager.saveTransaction(transaction,index);
    }, 1000);
  }

  const handleAccountCallback = (value) => {
    let accounts = ["Cash", "Accounts", "Card"];
    setTransaction({ ...transaction, account: accounts[value] });
  };

  const handleCategoryCallback = (value) => {
    let cateogries = [
      "🍜 Food",
      "🧑🏽‍🤝‍🧑🏻 Social Life",
      "🐱 Pets",
      "🚖 Transport",
      "🖼️ Culture",
      "🪑 Household",
      "👕 Apparel",
      "💄 Beauty",
      "🧘 Health",
      "📙 Education",
      "🎁 Gift",
      "Other",
    ];
    setTransaction({ ...transaction, category: cateogries[value] });
  };
  const [activeInput, setActiveInput] = useState(-1);
  return (
    <SafeAreaView style={styles.body}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image
            source={require("../assets/back_arrow.png")}
            style={{
              width: Fonts.h6,
              height: Fonts.h6,
              tintColor: "white",
              left: "7%",
            }}
          ></Image>
          <Text style={styles.headerTitle}>{titles[pressedIndex]}</Text>
        </View>
        <View style={styles.headerRight}>
          <Image
            source={require("../assets/bookmarks_icon.png")}
            style={{ width: Fonts.h6, height: Fonts.h6, tintColor: "white" }}
          />
        </View>
      </View>
      <View style={styles.categoriesBody}>
        <TouchableOpacity
          style={[
            styles.category,
            pressedIndex === 0 && { borderWidth: 1, borderColor: "#6c9dd4" },
          ]}
          onPress={() => setPressedIndex(0)}
        >
          <Text
            style={[
              styles.categoryTitle,
              pressedIndex === 0 && { color: "#6c9dd4" },
            ]}
          >
            Income
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.category,
            pressedIndex === 1 && { borderWidth: 1, borderColor: "#d17071" },
          ]}
          onPress={() => setPressedIndex(1)}
        >
          <Text
            style={[
              styles.categoryTitle,
              pressedIndex === 1 && { color: "#d17071" },
            ]}
          >
            Expense
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.category,
            pressedIndex === 2 && { borderWidth: 1, borderColor: "white" },
          ]}
          onPress={() => setPressedIndex(2)}
        >
          <Text
            style={[
              styles.categoryTitle,
              pressedIndex === 2 && { color: "white" },
            ]}
          >
            Transfer
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.formBody}>
        <View style={styles.formRow}>
          <Text style={styles.formRowTitle}>Date</Text>
          <View style={styles.formItem}>
            <Pressable>
            <Text
              style={styles.formItemText}
            >{transaction.date.toString()}</Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.formRow}>
          <Text style={styles.formRowTitle}>Account</Text>
          <TouchableOpacity
            style={[
              styles.formItem,
              activeInput === 0 && {
                borderBottomWidth: 1.5,
                borderColor: colors[pressedIndex],
              },
            ]}
            onPress={() => [
              refs.categorySheetRef.current.snapTo(0),
              refs.accountSheetRef.current.snapTo(1),

              Keyboard.dismiss(),
              setActiveInput(0),
            ]}
          >
            <Text style={styles.formItemText} ref={refs.accountRef}>
              {transaction.account}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.formRow}>
          <Text style={styles.formRowTitle}>Category</Text>
          <TouchableOpacity
            style={[
              styles.formItem,
              activeInput === 1 && {
                borderBottomWidth: 1.5,
                borderColor: colors[pressedIndex],
              },
            ]}
            onPress={() => [
              refs.accountSheetRef.current.snapTo(0),
              refs.categorySheetRef.current.snapTo(1),

              Keyboard.dismiss(),
              setActiveInput(1),
            ]}
          >
            <Text style={styles.formItemText} ref={refs.categoryRef}>
              {transaction.category}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.formRow}>
          <Text style={styles.formRowTitle}>Amount</Text>
          <View style={styles.formItem}>
            <TextInput
            ref={refs.amountRef}
            keyboardType="numeric"
              style={styles.formItemText}
              placeholder=" "
              value={transaction.amount}
              onPressIn={() => [
                refs.categorySheetRef.current.snapTo(0),
                refs.accountSheetRef.current.snapTo(0),
              ]}
              onChangeText={(text) =>
                setTransaction({ ...transaction, amount: text })
              }
            ></TextInput>
          </View>
        </View>
        <View style={styles.formRow}>
          <Text style={styles.formRowTitle}>Note</Text>
          <View style={styles.formItem}>
            <TextInput
              style={styles.formItemText}
              placeholder=" "
              value={transaction.note}
              onPressIn={() => [
                refs.categorySheetRef.current.snapTo(0),
                refs.accountSheetRef.current.snapTo(0),
              ]}
              onChangeText={(text) =>
                setTransaction({ ...transaction, note: text })
              }
            ></TextInput>
          </View>
        </View>
      </View>
      <View style={styles.divider} />
      <View style={styles.descriptionBody}>
        <TextInput
          placeholder="Description"
          style={[styles.formItemText, { fontSize: Fonts.medium }]}
          placeholderTextColor={"#747579"}
          value={transaction.description}
          onChangeText={(text) =>
            setTransaction({ ...transaction, description: text })
          }
        />
        <Image
          style={{
            tintColor: "#67686c",
            width: Fonts.h6,
            height: Fonts.h6,
            right: "50%",
          }}
          source={require("../assets/camera_icon.png")}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.saveButton, { backgroundColor: colors[pressedIndex] }]}
          onPress={()=>handleSave}
        >
          <Text
            style={{
              color: pressedIndex === 2 ? "black" : "white",
              fontSize: Fonts.regular,
            }}
          >
            Save
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.continueButton}>
          <Text style={{ color: "white", fontSize: Fonts.medium }}>
            Continue
          </Text>
        </TouchableOpacity>
      </View>

      <AccountSheets
        sheetRef={refs.accountSheetRef}
        callback={handleAccountCallback}
      />
      <CategorySheet
        sheetRef={refs.categorySheetRef}
        callback={handleCategoryCallback}
      />
      
    </SafeAreaView>
  );
}
