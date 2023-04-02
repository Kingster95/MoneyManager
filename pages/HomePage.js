import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { styles } from "../styles/HomePageStyle";
import Fonts from "../styles/Fonts";
import * as TransactionManager from "../hooks/transactionManager";
import DailyView from "./ViewModes/daily";

export default function HomePage({ navigation }) {
  const [selectedDate, setSelectedDate] = useState("");
  const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  //MAIN BALANCES
  const [income, setIncome] = useState(0.0);
  const [expenses, setExpenses] = useState(0.0);
  const [total, setTotal] = useState(0.0);

  // Category index
  const [pressedIndex, setPressedIndex] = useState(0);

  const [transactionsNumber, setTransactionsNumber] = useState(0);
  const [transactions, setTransactions] = useState([]);

  const categoryPress = (index) => {
    setPressedIndex(index);
  };
  const [selected_year,setSelectedYear] = useState(new Date().getFullYear());
  const [selected_month,setSelectedMonth] = useState(new Date().getMonth());

  function getCurrentDate() {
    var month = new Date().getMonth() + 1; //To get the Current Month
    var year = new Date().getFullYear();
    setSelectedYear(year);
    setSelectedMonth(month+1);
    return MONTHS[month] + " " + year;
  }

  function nextMonth(){
    console.log("pressed next");
    if ( selected_month < 12 )
      setSelectedMonth(selected_month+1);
    else
    {  
      setSelectedMonth(0);
      setSelectedYear(selected_year+1);
    }
    console.log(MONTHS[selected_month] + " " + selected_year);
    setSelectedDate(MONTHS[selected_month] + " " + selected_year);
  }
  function previousMonth(){
    console.log("pressed next");
    if ( selected_month > 0 )
      setSelectedMonth(selected_month-1);
    else
    {  
      setSelectedMonth(11);
      setSelectedYear(selected_year-1);
    }
    console.log(MONTHS[selected_month] + " " + selected_year);
    setSelectedDate(MONTHS[selected_month] + " " + selected_year);
  }
  
  function getIndexCallback(data) {
    try {
      const numberData = Number(data);
      setTransactionsNumber(numberData);
    } catch (e) {
      console.error("Setting Transaction Number error: ", e);
    }
  }
  function nextMonth(){
    console.log("pressed next");
    if ( selected_month < 12 )
      setSelectedMonth(selected_month+1);
    else
    {  
      setSelectedMonth(selected_month+1);
      setSelectedYear(selected_year+1);
    }
    console.log(MONTHS[selected_month] + " " + selected_year);
    setSelectedDate(MONTHS[selected_month] + " " + selected_year);
  }
  function getIndexCallback(data) {
    try {
      const numberData = Number(data);
      setTransactionsNumber(numberData);
    } catch (e) {
      console.error("Setting Transaction Number error: ", e);
    }
  }
  function getTransactionCallback(data) {
    const transactionString = data;
    try {
      const transactionObj = JSON.parse(transactionString);
      const date = new Date(transactionObj.date);
      const dayOfWeek = new Intl.DateTimeFormat("en-US", {
        weekday: "long",
      }).format(date);
      console.log("Type: ", transactionObj.type);
      const newTransaction = {
        type: transactionObj.type || "",
        date: date || new Date(),
        account: transactionObj.account || "",
        category: transactionObj.category || "",
        amount: transactionObj.amount || "",
        note: transactionObj.note || "",
        description: transactionObj.description || "",
        dayOfWeek: dayOfWeek || "",
      };
      const amount = Number(newTransaction.amount);
      if ( newTransaction.type=="Expense")
      {
        setExpenses(expenses+amount);
        setTotal(total-amount);
      }
      else
      {
        setIncome(income+amount);
        setTotal(total+amount);
      }
      setTransactions((prevTransactions) => {
        const updatedTransactions = [...prevTransactions, newTransaction];
        updatedTransactions.sort((a, b) => b.date - a.date); // Sort transactions by date (descending)
        return updatedTransactions;
      });
      
    } catch (error) {
      console.error("Invalid transaction string:", transactionString);
    }
  }
  useEffect(() => {
    if (selectedDate === "") {
      setSelectedDate(getCurrentDate());
      TransactionManager.getLastIndex(getIndexCallback);
      for (i = 0; i <= transactionsNumber; i++)
        TransactionManager.getTransaction(i, getTransactionCallback);


    }
  }, []);
  function LogTransaction() {
    navigation.navigate("LogTransactions");
  }
  return (
    <SafeAreaView style={styles.body}>
      <View style={styles.topRow}>
        <View style={styles.monthContainer}>
          <TouchableOpacity
            style={{width:"10%"}}
          onPress={() => previousMonth()}>
            <Image
              style={styles.arrowIcon}
              source={require("../assets/left_arrow.png")}
            ></Image>
          </TouchableOpacity>
          <View style={{ width: "7.5%" }} />
          <Text style={styles.monthText}>{selectedDate}</Text>
          <View style={{ width: "7.5%" }} />
          <TouchableOpacity 
          style={{width:"10%"}}
          onPress={() => nextMonth()}>
            <Image
              style={styles.arrowIcon}
              source={require("../assets/right_arrow.png")}
            ></Image>
          </TouchableOpacity>
        </View>
        <View style={{ width: "25%" }} />
        <View style={styles.iconsRow}>
          <TouchableOpacity>
            <Image
              style={styles.topIcons}
              source={require("../assets/bookmarks_icon.png")}
            ></Image>
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              style={styles.topIcons}
              source={require("../assets/search_icon.png")}
            ></Image>
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              style={styles.topIcons}
              source={require("../assets/settings_icon.png")}
            ></Image>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.viewCategory}>
        <TouchableOpacity
          style={[
            styles.viewOption,
            pressedIndex === 0 && { borderBottomWidth: 3 },
          ]}
          onPress={() => categoryPress(0)}
        >
          <Text
            style={[
              styles.viewOptionTitle,
              pressedIndex === 0 && { color: "white" },
            ]}
          >
            Daily
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.viewOption,
            pressedIndex === 1 && { borderBottomWidth: 3 },
          ]}
          onPress={() => categoryPress(1)}
        >
          <Text
            style={[
              styles.viewOptionTitle,
              pressedIndex === 1 && { color: "white" },
            ]}
          >
            Calendar
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.viewOption,
            pressedIndex === 2 && { borderBottomWidth: 3 },
          ]}
          onPress={() => categoryPress(2)}
        >
          <Text
            style={[
              styles.viewOptionTitle,
              pressedIndex === 2 && { color: "white" },
            ]}
          >
            Monthly
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.viewOption,
            pressedIndex === 3 && { borderBottomWidth: 3 },
          ]}
          onPress={() => categoryPress(3)}
        >
          <Text
            style={[
              styles.viewOptionTitle,
              pressedIndex === 3 && { color: "white" },
            ]}
          >
            Total
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.viewOption,
            pressedIndex === 4 && { borderBottomWidth: 3 },
          ]}
          onPress={() => categoryPress(4)}
        >
          <Text
            style={[
              styles.viewOptionTitle,
              pressedIndex === 4 && { color: "white" },
            ]}
          >
            Note
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.mainBalances}>
        <View style={styles.mainBalancesChild}>
          <Text style={styles.mainBalancesTitle}>Income</Text>
          <Text style={[styles.mainBalancesSubtitle, { color: "#6b9ad0" }]}>
            {income.toFixed(2)}
          </Text>
        </View>
        <View style={styles.mainBalancesChild}>
          <Text style={styles.mainBalancesTitle}>Expenses</Text>
          <Text style={[styles.mainBalancesSubtitle, { color: "#d96e6e" }]}>
            {expenses.toFixed(2)}
          </Text>
        </View>
        <View style={styles.mainBalancesChild}>
          <Text style={styles.mainBalancesTitle}>Total</Text>
          <Text style={[styles.mainBalancesSubtitle, { color: "#fafbfb" }]}>
            {total.toFixed(2)}
          </Text>
        </View>
      </View>
      {pressedIndex===0?
      <DailyView transactions={transactions} transactionsNumber={transactionsNumber}/>
      : null}
      <TouchableOpacity
        style={styles.floatingTransactions}
        onPress={LogTransaction}
      >
        <Image
          source={require("../assets/plus_icon.png")}
          style={{
            width: Fonts.regular,
            height: Fonts.regular,
            alignSelf: "center",
            tintColor: "white",
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.floatingNotes}>
        <Image
          source={require("../assets/notes_icon.png")}
          style={{
            width: Fonts.h4,
            height: Fonts.h4,
            alignSelf: "center",
            tintColor: "white",
            alignSelf: "center",
          }}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
