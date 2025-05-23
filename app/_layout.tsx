import { View } from "react-native"
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useState } from "react";
import * as SplashScreen from 'expo-splash-screen';
import "../global.css"

export default function App() {
    const insets = useSafeAreaInsets();
    const [appIsReady, setAppIsReady] = useState(false);

    // Keep the splash screen visible while we fetch resources
    SplashScreen.preventAutoHideAsync();

    // Set the animation options. This is optional.
    SplashScreen.setOptions({
        duration: 1000,
        fade: true,
    });

    useEffect(() => {
        async function prepare() {
            try {
                // Pre-load fonts, make any API calls you need to do here
                // Artificially delay for two seconds to simulate a slow loading
                // experience. Remove this if you copy and paste the code!
                await new Promise(resolve => setTimeout(resolve, 2000));
            } catch (e) {
                console.warn(e);
            } finally {
                // Tell the application to render
                setAppIsReady(true);
            }
        }

        prepare();
    }, []);

    const onLayoutRootView = useCallback(() => {
        if (appIsReady) {
            // This tells the splash screen to hide immediately! If we call this after
            // `setAppIsReady`, then we may see a blank screen while the app is
            // loading its initial state and rendering its first pixels. So instead,
            // we hide the splash screen once we know the root view has already
            // performed layout.
            SplashScreen.hideAsync();
        }
    }, [appIsReady]);

    if (!appIsReady) {
        return null;
    }

    return (
        <SafeAreaProvider style={{ flex: 1 }}>
            <View onLayout={onLayoutRootView} style={{ flex: 1, paddingTop: insets.top }}>
                <Stack screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="(tabs)"  />
                </Stack>
                <StatusBar />
            </View>
        </SafeAreaProvider>
    )
}