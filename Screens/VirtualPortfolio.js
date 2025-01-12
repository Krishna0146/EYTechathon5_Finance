import React, { useState } from 'react';
import { Text, Pressable, Button, ScrollView, View, TouchableOpacity } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const VPort = () => {
  const [showStocksDetails, setShowStocksDetails] = useState(false);
  const [showBondsDetails, setShowBondsDetails] = useState(false);
  const [chartType, setChartType] = useState("asset");

  const screenWidth = Dimensions.get("window").width;

  const assetAllocationData = [
    { name: "Stocks", population: 70, color: "#3498db", legendFontColor: "#7F7F7F", legendFontSize: 12 },
    { name: "Bonds", population: 30, color: "#95a5a6", legendFontColor: "#7F7F7F", legendFontSize: 12 },
  ];

  const sectorAllocationData = [
    { name: "Banking", population: 42, color: "#2ecc71", legendFontColor: "#7F7F7F", legendFontSize: 12 },
    { name: "IT", population: 30, color: "#e74c3c", legendFontColor: "#7F7F7F", legendFontSize: 12 },
    { name: "Oil & Gas", population: 28, color: "#f1c40f", legendFontColor: "#7F7F7F", legendFontSize: 12 },
  ];

  const renderDetails = (type) => {
    if (type === "stocks") {
      return (
        <View style={{ backgroundColor: '#f0f0f0', padding: 10, borderRadius: 10, marginBottom: 10 }}>
          <Text>Invested: 7000</Text>
          <Text>Current Value: 8950</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
            <Button title="Delete" onPress={() => {}} />
            <Button title="Edit" onPress={() => {}} />
          </View>
        </View>
      );
    } else if (type === "bonds") {
      return (
        <View style={{ backgroundColor: '#f0f0f0', padding: 10, borderRadius: 10, marginBottom: 10 }}>
          <Text>Invested: 3000</Text>
          <Text>Current Value: 3350</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
            <Button title="Delete" onPress={() => {}} />
            <Button title="Edit" onPress={() => {}} />
          </View>
        </View>
      );
    }
  };

  return (
    <ScrollView style={{ backgroundColor: '#f8f8f8', padding: 15 }}>
      {/* Header Section */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#ffff00', padding: 15, borderRadius: 10, marginBottom: 15 }}>
        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 18 }}>Virtual Portfolio</Text>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Your Portfolio</Text>
        <Pressable style={{ backgroundColor: '#3498db', padding: 10, borderRadius: 10 }}>
          <Text style={{ color: '#fff' }}>New+</Text>
        </Pressable>
      </View>

      {/* Portfolio Section */}
      <View style={{ backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 15 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
          <Text>Portfolio Name</Text>
          <Text>P&L</Text>
        </View>
        <View style={{ height: 1, backgroundColor: '#ddd', marginBottom: 10 }} />

        {/* Stocks */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
          <Text>Stocks</Text>
          <Text>1950</Text>
          <TouchableOpacity onPress={() => setShowStocksDetails(!showStocksDetails)}>
            <Text style={{ fontSize: 20 }}>{showStocksDetails ? "▲" : "▼"}</Text>
          </TouchableOpacity>
        </View>
        {showStocksDetails && renderDetails("stocks")}

        {/* Bonds */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
          <Text>Bonds</Text>
          <Text>300</Text>
          <TouchableOpacity onPress={() => setShowBondsDetails(!showBondsDetails)}>
            <Text style={{ fontSize: 20 }}>{showBondsDetails ? "▲" : "▼"}</Text>
          </TouchableOpacity>
        </View>
        {showBondsDetails && renderDetails("bonds")}

        <View style={{ height: 1, backgroundColor: '#ddd', marginBottom: 10 }} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text>Total P&L</Text>
          <Text>2250</Text>
        </View>
      </View>

      {/* Footer Section */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 }}>
        <Pressable
          style={{ flex: 1, backgroundColor: '#ccc', padding: 10, borderRadius: 10, marginHorizontal: 5 }}
          onPress={() => setChartType("asset")}
        >
          <Text style={{ textAlign: 'center' }}>Asset Allocation</Text>
        </Pressable>
        <Pressable
          style={{ flex: 1, backgroundColor: '#ccc', padding: 10, borderRadius: 10, marginHorizontal: 5 }}
          onPress={() => setChartType("sector")}
        >
          <Text style={{ textAlign: 'center' }}>Sector Allocation</Text>
        </Pressable>
      </View>

      {/* Pie Chart */}
      <View style={{ alignItems: 'center', marginTop: 20 }}>
        <PieChart
          data={chartType === "asset" ? assetAllocationData : sectorAllocationData}
          width={screenWidth}
          height={220}
          chartConfig={{
            backgroundGradientFrom: "#ffffff",
            backgroundGradientTo: "#ffffff",
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      </View>
    </ScrollView>
  );
};

export default VPort;
