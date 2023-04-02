import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { call } from "react-native-reanimated";

export async function setIndex( value ){
    try{
        const stringValue = value.toString();
        await AsyncStorage.setItem("index",stringValue);
        console.log("Index saved successfuly with value: ", stringValue);
    } catch(e){
        console.error("Error saving index: ", e);
    }
}
export async function getLastIndex( callback ){
    try{
        const value = await AsyncStorage.getItem("index");
        if ( value != null ){
            console.log("Index exists: ", value);
            callback(value);
        }
        else
        {
            console.log("Index empty");
            setIndex(0);
            callback(0);
        }
    } catch ( e ){
        console.error("Error fetching index: ", e);
    }
}
export async function saveTransaction( transaction, index ){
    try{
        const jsonValue = JSON.stringify(transaction);
        await AsyncStorage.setItem("TransactionIndex" +{index},jsonValue);
        console.log("Transaction " + {index} + " Saved", jsonValue);
        setIndex(index+1);
        
        if ( transaction.type === "Income" )
        {
            const value = await AsyncStorage.getItem("Income");
            if ( value != null ){
                const numberData = Number(data) + Number(transaction.amount);
                await AsyncStorage.setItem("Income",numberData);
            }
            
        }
        else if ( transaction.type ==="Expense" )
        {
            const value = await AsyncStorage.getItem("Expense");
            if ( value != null ){
                const numberData = Number(data) + Number(transaction.amount);
                await AsyncStorage.setItem("Expense",numberData);
            }
        }
            
    } catch(e){
        console.error("Error saving transaction: ", e);
    }
}
export async function getTransaction( index, callback ){
    try{
        const transactionData = await AsyncStorage.getItem("TransactionIndex" +{index});
        console.log("Fetching Transaction ",index," successfully");
        callback(transactionData);
    } catch ( e ){
        console.error("Error Fetching Transaction: ", e);
    }
}