import { Tabs, useFocusEffect, useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { BackHandler, Platform, View } from "react-native";
import { useCallback } from "react";

type IoniconName = keyof typeof Ionicons.glyphMap;

export default function TabLayout() {
    const navigation = useNavigation();

    useFocusEffect(
        useCallback(() => {
            const onAndroidBackPress = () => {
                if (navigation.canGoBack()) {
                    navigation.goBack();
                    return true; // Prevent default behavior (exit app)
                }
                return false;
            };


            if (Platform.OS === "android") {
                BackHandler.addEventListener("hardwareBackPress", onAndroidBackPress);
                return () => {
                    BackHandler.removeEventListener("hardwareBackPress", onAndroidBackPress);
                };
            }
        }, [navigation])
    );

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: { height: 60, backgroundColor: "#fff" }, 
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Phone App",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="template"
                options={{
                    title: "Template",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="happy" size={size} color={color} />
                    ),
                }}
            />
        </Tabs>
    )
}