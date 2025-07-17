import {CompositeScreenProps} from "@react-navigation/native";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {Icon} from "@rneui/base";
import React, {useCallback, useEffect} from "react";
import {Platform, StyleSheet, View, ScrollView} from "react-native";

import SettingsItem, {
  SettingsButton,
} from "../components/settings/SettingsItem";
import SettingsSection from "../components/settings/SettingsSection";
import {parsePlayerResolution} from "../components/settings/screens/PlayerResolutionSelector";
import {parsePlayerType} from "../components/settings/screens/PlayerSelector";
import {useAppData} from "../context/AppDataContext";
import {useAppStyle} from "../context/AppStyleContext";
import {RootStackParamList} from "../navigation/RootStackNavigator";
import {SettingsStackParamList} from "../navigation/SettingsNavigator";
import {parseLanguage} from "../utils/YTLanguages";

import {useAccountContext} from "@/context/AccountContext";

type Props = CompositeScreenProps<
  NativeStackScreenProps<SettingsStackParamList, "Root">,
  NativeStackScreenProps<RootStackParamList, "SettingsScreen">
>;

export default function SettingsScreen({navigation}: Props) {
  const {appSettings} = useAppData();
  const {logout, clearAllData} = useAccountContext();
  const {style} = useAppStyle();
  const isTV = Platform.isTV;
  const tvTokens = style.appleTVTokens;

  useEffect(() => {
    if (!Platform.isTV) {
      navigation.setOptions({
        headerRight: () => (
          <Icon
            name={"login"}
            onPress={() => navigation.navigate("LoginScreen")}
            color={"white"}
            style={{marginEnd: 10}}
          />
        ),
      });
    }
  }, [navigation]);

  const navigate = useCallback<(typeof navigation)["navigate"]>(
    (args: any) => {
      if (Platform.isTV) {
        return navigation.navigate(args);
      } else {
        // @ts-ignore
        return navigation.navigate("SettingsScreen", {screen: args});
      }
    },
    [navigation],
  );

  const content = (
    <>
      <SettingsSection sectionTitle={"General"}>
        <SettingsItem
          icon={"globe"}
          iconBackground={"#fe9400"}
          label={"Language"}
          value={parseLanguage(appSettings).label}
          onPress={() => navigate("LanguageSelector")}
        />
        <SettingsItem
          icon={"play-circle"}
          iconBackground={"blue"}
          label={"Video player"}
          value={parsePlayerType(appSettings).label}
          onPress={() => navigate("PlayerSelector")}
        />
        <SettingsItem
          icon={"settings"}
          iconBackground={"#f5d132"}
          label={"Video resolution variant"}
          value={parsePlayerResolution(appSettings).label}
          onPress={() => navigate("PlayerResolutionSelector")}
        />
        <SettingsItem
          icon={"clock"}
          iconBackground={"#32a852"}
          label={"History enabled"}
          value={appSettings.trackingEnabled ? "True" : "False"}
          onPress={() => navigate("TrackingSelector")}
        />
      </SettingsSection>

      <SettingsSection sectionTitle={"Account"}>
        <SettingsButton
          icon={"trash-2"}
          iconBackground={"#ff3333"}
          label={"Clear all"}
          onPress={() => clearAllData()}
        />
        <SettingsButton
          icon={"log-out"}
          iconBackground={"#666666"}
          label={"Logout"}
          onPress={() => logout()}
        />
      </SettingsSection>
    </>
  );

  if (isTV && tvTokens) {
    return (
      <ScrollView
        style={[
          styles.containerStyle,
          {backgroundColor: style.backgroundColor},
        ]}
        contentContainerStyle={{
          paddingBottom: tvTokens.cardMargin * 4,
        }}
        showsVerticalScrollIndicator={false}>
        {content}
      </ScrollView>
    );
  }

  return <View style={styles.containerStyle}>{content}</View>;
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
  },
  checkBoxStyle: {
    flex: 1,
  },
});
