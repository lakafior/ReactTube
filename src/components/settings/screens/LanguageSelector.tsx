import {StyleSheet, ScrollView, Platform} from "react-native";

import {useAppData} from "../../../context/AppDataContext";
import {useAppStyle} from "../../../context/AppStyleContext";
import {languages, parseLanguage} from "../../../utils/YTLanguages";
import {SettingsSelectorItem} from "../SettingsItem";
import SettingsSection from "../SettingsSection";

export default function LanguageSelectorScreen() {
  const {appSettings, updateSettings} = useAppData();
  const {style} = useAppStyle();
  const selected = parseLanguage(appSettings);
  const isTV = Platform.isTV;
  const tvTokens = style.appleTVTokens;

  const content = (
    <SettingsSection
      style={[
        styles.container,
        isTV && {backgroundColor: style.backgroundColor},
      ]}
      sectionTitle={"Languages"}>
      {languages.map(v => (
        <SettingsSelectorItem
          key={v.key}
          label={v.label}
          selected={selected.key === v.key}
          onPress={() =>
            updateSettings({
              languageSelected: v.key,
            })
          }
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
