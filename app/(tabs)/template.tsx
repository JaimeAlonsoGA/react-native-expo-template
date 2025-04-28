import { useFocusEffect, useNavigation } from "expo-router";
import { useCallback } from "react";
import { BackHandler, Platform, Text, View } from "react-native";

const Payments = () => {
    return (
        <View style={{ flex: 1 }} className="flex w-full items-center justify-center p-8" >
            <Text>This is a React Native on Expo template with native navigation, vector icons, tailwindCSS, splash screen and safe area already implemented. Happy coding.</Text>
        </View>
    );
};

export default Payments;