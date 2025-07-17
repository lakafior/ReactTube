import {StyleSheet, ScrollView, Platform} from "react-native";

import {AppSettings, useAppData} from "../../../context/AppDataContext";
import {useAppStyle} from "../../../context/AppStyleContext";
import {SettingsSelectorItem} from "../SettingsItem";
import SettingsSection from "../SettingsSection";

interface PlayerType {
  key: string;
  label: string;
}

const playerTypes: {[key: string]: PlayerType} = {
  native: {
    key: "native",
    label: "Native",
  },
  nativeOverlay: {
    key: "nativeOverlay",
    label: "Native Overlay (Alpha)",
  },
  vlc: {
    key: "vlc",
    label: "VLC",
  },
};

export default function PlayerTypeSelectorScreen() {
  const {appSettings, updateSettings} = useAppData();
  const {style} = useAppStyle();
  const player = parsePlayerType(appSettings);
  const isTV = Platform.isTV;
  const tvTokens = style.appleTVTokens;

  const content = (
    <SettingsSection
      style={[
        styles.container,
        isTV && {backgroundColor: style.backgroundColor},
      ]}
      sectionTitle={"Player Types"}>
      {Object.values(playerTypes).map(v => (
        <SettingsSelectorItem
          key={v.key}
          label={v.label}
          selected={player.key === v.key}
          onPress={() => {
            updateSettings({
              vlcEnabled: !(v.key === "nativeOverlay" || v.key === "native"),
              ownOverlayEnabled: v.key === "nativeOverlay",
            });
          }}
        />
      ))}
    </SettingsSection>
  );

  if (isTV && tvTokens) {
    return (
      <ScrollView
        style={{backgroundColor: style.backgroundColor}}
        contentContainerStyle={{
          paddingBottom: tvTokens.cardMargin * 4,
        }}
        showsVerticalScrollIndicator={false}>
        {content}
      </ScrollView>
    );
  }

  return content;
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    backgroundColor: "#111111",
  },
});

export function parsePlayerType(appSettings: AppSettings) {
  if (appSettings.vlcEnabled) {
    return playerTypes["vlc"];
  } else if (appSettings.ownOverlayEnabled) {
    return playerTypes["nativeOverlay"];
  } else {
    return playerTypes["native"];
  }
}
