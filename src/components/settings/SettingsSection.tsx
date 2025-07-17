import React from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
  Platform,
} from "react-native";

import {useAppStyle} from "../../context/AppStyleContext";

interface Props {
  children?: React.ReactNode;
  sectionTitle?: string;
  style?: StyleProp<ViewStyle>;
}

export default function SettingsSection({
  children,
  style,
  sectionTitle,
}: Props) {
  const {style: appStyle} = useAppStyle();
  const isTV = Platform.isTV;
  const tvTokens = appStyle.appleTVTokens;

  return (
    <View
      style={[
        styles.section,
        style,
        isTV &&
          tvTokens && {
            paddingTop: tvTokens.cardMargin * 2,
            paddingHorizontal: tvTokens.cardMargin,
          },
      ]}>
      <Text
        style={[
          styles.sectionTitle,
          {color: appStyle.textColor},
          isTV &&
            tvTokens && {
              fontSize: tvTokens.headerFontSize,
              fontWeight: "700",
              marginHorizontal: tvTokens.cardMargin,
              marginVertical: tvTokens.cardMargin,
              textTransform: "none",
              letterSpacing: 0,
            },
        ]}>
        {sectionTitle}
      </Text>
      <View
        style={[
          styles.sectionBody,
          isTV &&
            tvTokens && {
              paddingLeft: 0,
              backgroundColor: "transparent",
              borderTopWidth: 0,
              borderBottomWidth: 0,
            },
        ]}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingTop: 12,
  },
  sectionTitle: {
    marginVertical: 8,
    marginHorizontal: 24,
    fontSize: 14,
    fontWeight: "600",
    color: "#a7a7a7",
    textTransform: "uppercase",
    letterSpacing: 1.2,
  },
  sectionBody: {
    paddingLeft: 24,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#e3e3e3",
  },
});
