import {Feather} from "@expo/vector-icons";
import {StyleSheet, TouchableOpacity, View, Text, Platform} from "react-native";

import {useAppStyle} from "../../context/AppStyleContext";

interface Props {
  onPress?: () => void;
  icon: string;
  iconBackground: string;
  label: string;
  value: string;
}

export default function SettingsSelectorOverview({
  onPress,
  icon,
  iconBackground,
  label,
  value,
}: Props) {
  const {style} = useAppStyle();
  const isTV = Platform.isTV;
  const tvTokens = style.appleTVTokens;

  return (
    <View
      style={[
        styles.rowWrapper,
        styles.rowFirst,
        isTV &&
          tvTokens && {
            backgroundColor: tvTokens.cardBackgroundColor,
            borderRadius: tvTokens.cardBorderRadius,
            marginHorizontal: tvTokens.cardMargin,
            marginVertical: tvTokens.cardMargin / 2,
            shadowColor: tvTokens.shadowColor,
            shadowOpacity: tvTokens.shadowOpacity,
            shadowRadius: tvTokens.shadowRadius,
            elevation: tvTokens.elevation,
          },
      ]}>
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.row,
          isTV &&
            tvTokens && {
              padding: tvTokens.cardPadding,
              height: "auto",
              minHeight: 80,
            },
        ]}>
        <View
          style={[
            styles.rowIcon,
            {backgroundColor: iconBackground},
            isTV &&
              tvTokens && {
                width: tvTokens.iconSize + 6,
                height: tvTokens.iconSize + 6,
                borderRadius: 8,
              },
          ]}>
          <Feather
            color={"#fff"}
            // @ts-ignore
            name={icon}
            size={isTV && tvTokens ? tvTokens.iconSize : 20}
          />
        </View>

        <Text
          style={[
            styles.rowLabel,
            {color: style.textColor},
            isTV &&
              tvTokens && {
                fontSize: tvTokens.bodyFontSize,
                fontWeight: "600",
              },
          ]}>
          {label}
        </Text>

        <View style={styles.rowSpacer} />

        <Text
          style={[
            styles.rowValue,
            isTV &&
              tvTokens && {
                fontSize: tvTokens.captionFontSize,
                marginRight: 12,
              },
          ]}>
          {value}
        </Text>

        <Feather
          color={"#C6C6C6"}
          name={"chevron-right"}
          size={isTV && tvTokens ? tvTokens.iconSize - 8 : 20}
        />
      </TouchableOpacity>
    </View>
  );
}

interface PropsSelectorItem {
  onPress?: () => void;
  label: string;
  selected: boolean;
}

export function SettingsSelectorItem({
  onPress,
  label,
  selected,
}: PropsSelectorItem) {
  const {style} = useAppStyle();
  const isTV = Platform.isTV;
  const tvTokens = style.appleTVTokens;

  return (
    <View
      style={[
        styles.rowWrapper,
        styles.rowFirst,
        isTV &&
          tvTokens && {
            backgroundColor: tvTokens.cardBackgroundColor,
            borderRadius: tvTokens.cardBorderRadius,
            marginHorizontal: tvTokens.cardMargin,
            marginVertical: tvTokens.cardMargin / 2,
            shadowColor: tvTokens.shadowColor,
            shadowOpacity: tvTokens.shadowOpacity,
            shadowRadius: tvTokens.shadowRadius,
            elevation: tvTokens.elevation,
          },
      ]}>
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.row,
          isTV &&
            tvTokens && {
              padding: tvTokens.cardPadding,
              height: "auto",
              minHeight: 80,
            },
        ]}>
        <Text
          style={[
            styles.rowLabel,
            {color: style.textColor},
            isTV &&
              tvTokens && {
                fontSize: tvTokens.bodyFontSize,
                fontWeight: "600",
              },
          ]}>
          {label}
        </Text>

        <View style={styles.rowSpacer} />

        {selected ? (
          <Feather
            color={"#C6C6C6"}
            name={"check"}
            size={isTV && tvTokens ? tvTokens.iconSize - 8 : 20}
          />
        ) : null}
      </TouchableOpacity>
    </View>
  );
}

interface PropsStandaloneSelectorItem {
  onPress?: () => void;
  icon: string;
  iconBackground: string;
  label: string;
  selected: boolean;
}

export function SettingsStandaloneSelector({
  onPress,
  icon,
  iconBackground,
  label,
  selected,
}: PropsStandaloneSelectorItem) {
  const {style} = useAppStyle();
  const isTV = Platform.isTV;
  const tvTokens = style.appleTVTokens;

  return (
    <View
      style={[
        styles.rowWrapper,
        styles.rowFirst,
        isTV &&
          tvTokens && {
            backgroundColor: tvTokens.cardBackgroundColor,
            borderRadius: tvTokens.cardBorderRadius,
            marginHorizontal: tvTokens.cardMargin,
            marginVertical: tvTokens.cardMargin / 2,
            shadowColor: tvTokens.shadowColor,
            shadowOpacity: tvTokens.shadowOpacity,
            shadowRadius: tvTokens.shadowRadius,
            elevation: tvTokens.elevation,
          },
      ]}>
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.row,
          isTV &&
            tvTokens && {
              padding: tvTokens.cardPadding,
              height: "auto",
              minHeight: 80,
            },
        ]}>
        <View
          style={[
            styles.rowIcon,
            {backgroundColor: iconBackground},
            isTV &&
              tvTokens && {
                width: tvTokens.iconSize + 6,
                height: tvTokens.iconSize + 6,
                borderRadius: 8,
              },
          ]}>
          <Feather
            color={"#fff"}
            // @ts-ignore
            name={icon}
            size={isTV && tvTokens ? tvTokens.iconSize : 20}
          />
        </View>
        <Text
          style={[
            styles.rowLabel,
            {color: style.textColor},
            isTV &&
              tvTokens && {
                fontSize: tvTokens.bodyFontSize,
                fontWeight: "600",
              },
          ]}>
          {label}
        </Text>

        <View style={styles.rowSpacer} />

        {selected ? (
          <Feather
            color={"#C6C6C6"}
            name={"check"}
            size={isTV && tvTokens ? tvTokens.iconSize - 8 : 20}
          />
        ) : null}
      </TouchableOpacity>
    </View>
  );
}

interface PropsSettingsButton {
  onPress?: () => void;
  icon?: string;
  iconBackground?: string;
  label: string;
}

export function SettingsButton({
  onPress,
  icon,
  iconBackground,
  label,
}: PropsSettingsButton) {
  const {style} = useAppStyle();
  const isTV = Platform.isTV;
  const tvTokens = style.appleTVTokens;

  return (
    <View
      style={[
        styles.rowWrapper,
        styles.rowFirst,
        isTV &&
          tvTokens && {
            backgroundColor: tvTokens.cardBackgroundColor,
            borderRadius: tvTokens.cardBorderRadius,
            marginHorizontal: tvTokens.cardMargin,
            marginVertical: tvTokens.cardMargin / 2,
            shadowColor: tvTokens.shadowColor,
            shadowOpacity: tvTokens.shadowOpacity,
            shadowRadius: tvTokens.shadowRadius,
            elevation: tvTokens.elevation,
          },
      ]}>
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.row,
          isTV &&
            tvTokens && {
              padding: tvTokens.cardPadding,
              height: "auto",
              minHeight: 80,
            },
        ]}>
        {icon && iconBackground ? (
          <View
            style={[
              styles.rowIcon,
              {backgroundColor: iconBackground},
              isTV &&
                tvTokens && {
                  width: tvTokens.iconSize + 6,
                  height: tvTokens.iconSize + 6,
                  borderRadius: 8,
                },
            ]}>
            <Feather
              color={"#fff"}
              // @ts-ignore
              name={icon}
              size={isTV && tvTokens ? tvTokens.iconSize : 20}
            />
          </View>
        ) : null}

        <Text
          style={[
            styles.rowLabel,
            {color: style.textColor},
            isTV &&
              tvTokens && {
                fontSize: tvTokens.bodyFontSize,
                fontWeight: "600",
              },
          ]}>
          {label}
        </Text>

        <View style={styles.rowSpacer} />
      </TouchableOpacity>
    </View>
  );
}

// <View style={styles.rowWrapper}>
//   <View style={styles.row}>
//     <View
//       style={[styles.rowIcon, { backgroundColor: '#007AFF' }]}>
//       <FeatherIcon
//         color="#fff"
//         name="moon"
//         size={20} />
//     </View>
//
//     <Text style={styles.rowLabel}>Dark Mode</Text>
//
//     <View style={styles.rowSpacer} />
//
//     <Switch
//       onValueChange={emailNotifications =>
//         setForm({ ...form, emailNotifications })
//       }
//       value={form.emailNotifications} />
//   </View>
// </View>

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingRight: 24,
    height: 50,
  },
  rowWrapper: {
    borderTopWidth: 1,
    borderColor: "#e3e3e3",
  },
  rowFirst: {
    borderTopWidth: 0,
  },
  rowIcon: {
    width: 30,
    height: 30,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  rowLabel: {
    fontSize: 17,
    fontWeight: "500",
    color: "#000",
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  rowValue: {
    fontSize: 17,
    fontWeight: "500",
    color: "#8B8B8B",
    marginRight: 4,
  },
});
