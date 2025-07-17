import {StyleSheet, ScrollView, Platform} from "react-native";

import {AppSettings, useAppData} from "../../../context/AppDataContext";
import {useAppStyle} from "../../../context/AppStyleContext";
import {SettingsSelectorItem} from "../SettingsItem";
import SettingsSection from "../SettingsSection";

interface PlayerResolution {
  key: string;
  label: string;
}

const playerResolutions: {[key: string]: PlayerResolution} = {
  http: {
    key: "http",
    label: "HTTP",
  },
  hls: {
    key: "hls",
    label: "HLS",
  },
  hlsLocal: {
    key: "hlsLocal",
    label: "HLS Local",
  },
};

export default function PlayerResolutionSelectorScreen() {
  const {appSettings, updateSettings} = useAppData();
  const {style} = useAppStyle();
  const player = parsePlayerResolution(appSettings);
  const isTV = Platform.isTV;
  const tvTokens = style.appleTVTokens;

  const onPress = (type: PlayerResolution) => {
    if (type.key === "http") {
      updateSettings({
        hlsEnabled: false,
        localHlsEnabled: false,
      });
    } else if (type.key === "hls") {
      updateSettings({
        hlsEnabled: true,
        localHlsEnabled: false,
      });
    } else if (type.key === "hlsLocal") {
      updateSettings({
        hlsEnabled: false,
        localHlsEnabled: true,
      });
    }
  };

  const content = (
    <SettingsSection
      style={[
        styles.container,
        isTV && {backgroundColor: style.backgroundColor},
      ]}
      sectionTitle={"Player Resolution Variant"}>
      {Object.values(playerResolutions).map(v => (
        <SettingsSelectorItem
          key={v.key}
          label={v.label}
          selected={player.key === v.key}
          onPress={() => onPress(v)}
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

export function parsePlayerResolution(appSettings: AppSettings) {
  if (appSettings.hlsEnabled) {
    return playerResolutions["hls"];
  } else if (appSettings.localHlsEnabled) {
    return playerResolutions["hlsLocal"];
  } else {
    return playerResolutions["http"];
  }
}
