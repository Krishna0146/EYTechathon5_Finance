import React, { useEffect, useState } from "react";
import { Button, Platform, View, StyleSheet, Text } from "react-native";
import * as Notifications from "expo-notifications";

// Configure notification settings
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function Notify() {
  const [expoPushToken, setExpoPushToken] = useState(null);
  const [notification, setNotification] = useState(false);
  const notificationListener = React.useRef();
  const responseListener = React.useRef();

  useEffect(() => {
    // Request permissions and get the push token
    registerForPushNotificationsAsync().then((token) => setExpoPushToken(token));

    // Listen for incoming notifications
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    // Handle notification response
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    // Clean up listeners on unmount
    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text>Your Expo Push Token: {expoPushToken}</Text>
      <View style={{ marginVertical: 20 }}>
        <Button
          title="Send Local Notification"
          onPress={async () => {
            await Notifications.scheduleNotificationAsync({
              content: {
                title: "Hello! 📬",
                body: "This is a test notification!",
                data: { someData: "Go here" },
              },
              trigger: { seconds: 2 },
            });
          }}
        />
      </View>
      {notification && (
        <Text>
          Notification Received: {notification.request.content.title} -{" "}
          {notification.request.content.body}
        </Text>
      )}
    </View>
  );
}

// Function to request permissions and get push token
async function registerForPushNotificationsAsync() {
  let token;
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    alert("Failed to get push token for notifications!");
    return;
  }

  token = (await Notifications.getExpoPushTokenAsync()).data;

  return token;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
});
