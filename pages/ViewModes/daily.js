import { styles } from "../../styles/HomePageStyle";
import { Text, View, Image } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Fonts from "../../styles/Fonts";
export default function DailyView({transactions, transactionsNumber}) {
  return (
    <>
    <View style={styles.bodyTransactions}>
      {transactionsNumber === 0 ? (
        <View style={{ bottom: "20%" }}>
          <Image
            source={require("../../assets/money-bag.png")}
            style={{
              tintColor: "grey",
              width: Fonts.extraLarge,
              height: Fonts.extraLarge,
              alignSelf: "center",
              bottom: "15%",
            }}
          />
          <Text
            style={{ color: "grey", fontSize: Fonts.medium, fontWeight: 300 }}
          >
            No data available
          </Text>
        </View>
      ) : (
        <FlatList
          data={transactions}
          style={{ width: "100%", height: "100%" }}
          contentContainerStyle={styles.transactionsContainer}
          renderItem={({ item }) => (
            <View style={styles.modalCategory}>
              <View style={styles.transactionTopBar}>
                <Text
                  style={{
                    fontSize: Fonts.input,
                    fontWeight: 500,
                    color: "white",
                  }}
                >
                  {Intl.DateTimeFormat("en-US", { day: "numeric" }).format(
                    item.date
                  )}
                </Text>
                <View style={styles.transactionDayContainer}>
                  <Text
                    style={{
                      color: "white",
                      alignSelf: "center",
                      fontSize: Fonts.small,
                    }}
                  >
                    {Intl.DateTimeFormat("en-US", {
                      weekday: "short",
                    }).format(item.date)}
                  </Text>
                </View>
                <Text
                  style={{
                    left: "30%",
                    fontSize: Fonts.small,
                    color: "#797a7f",
                    fontWeight: 300,
                  }}
                >
                  {Intl.DateTimeFormat("en-US", {
                    month: "2-digit",
                  }).format(item.date)}
                  .
                  {Intl.DateTimeFormat("en-US", {
                    year: "numeric",
                  }).format(item.date)}
                </Text>
                <Text
                  style={{
                    color: "#6b9ad0",
                    left: "275%",
                    fontSize: Fonts.medium,
                  }}
                >
                  ${item.type == "Income" ? item.amount : "0.00"}
                </Text>
                <Text
                  style={{
                    color: "#d96e6e",
                    left: "450%",
                    fontSize: Fonts.medium,
                  }}
                >
                  ${item.type == "Expense" ? item.amount : "0.00"}
                </Text>
              </View>
              <View style={styles.transactionDetails}>
                <View style={{ left: "5%", flexDirection: "row" }}>
                  <Text style={{ color: "grey", fontSize: Fonts.medium }}>
                    {item.category}
                  </Text>
                  <Text
                    style={{
                      color: "grey",
                      left: "50%",
                      fontSize: Fonts.medium,
                    }}
                  >
                    {item.account}
                  </Text>
                </View>
                <View style={{ left: "505%" }}>
                  <Text
                    style={{
                      color: item.type === "Income" ? "#d96e6e" : "#6b9ad0",
                    }}
                  >
                    ${item.amount}
                  </Text>
                </View>
              </View>
            </View>
          )}
        />
      )}
    </View>
    </>
  );
}
