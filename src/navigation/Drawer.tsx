import {useNavigation} from "@react-navigation/native";
import {Icon} from "@rneui/base";
import React, {forwardRef, useCallback, useEffect, useState} from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TVFocusGuideView,
  Platform,
} from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withSpring,
} from "react-native-reanimated";

import {NativeStackProp} from "./types";

import {useAccountContext} from "@/context/AccountContext";
import {useAppStyle} from "@/context/AppStyleContext";

interface Props {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  hideDrawer: SharedValue<boolean>;
}

export default function Drawer({open, onOpen, onClose, hideDrawer}: Props) {
  const account = useAccountContext();
  const {style} = useAppStyle();
  const isTV = Platform.isTV;
  const tvTokens = style.appleTVTokens;

  useEffect(() => {
    openDrawer.value = open;
  }, [open]);

  const openDrawer = useSharedValue(open);

  const style_animated = useAnimatedStyle(() => {
    const baseWidth = isTV && tvTokens ? 400 : 300;
    const collapsedWidth = isTV && tvTokens ? 200 : 150;

    return {
      height: "100%",
      width: withTiming(
        hideDrawer.value ? 0 : openDrawer.value ? baseWidth : collapsedWidth,
      ),
      paddingStart: withTiming(
        hideDrawer.value ? 0 : isTV && tvTokens ? 60 : 40,
      ),
    };
  });

  const navigation = useNavigation<NativeStackProp>();

  const navigationWrapper = useCallback(
    (fkt: () => void) => {
      return () => {
        onClose();
        fkt();
      };
    },
    [onClose],
  );

  return (
    <TVFocusGuideView autoFocus>
      <Animated.View
        style={[
          styles.container,
          style_animated,
          isTV &&
            tvTokens && {
              backgroundColor: tvTokens.cardBackgroundColor,
              shadowColor: tvTokens.shadowColor,
              shadowOpacity: tvTokens.shadowOpacity,
              shadowRadius: tvTokens.shadowRadius,
              elevation: tvTokens.elevation,
            },
        ]}>
        <DrawerItem
          title={"Home"}
          onFocus={() => onOpen()}
          start
          onPress={navigationWrapper(() =>
            // @ts-ignore
            navigation.navigate("Home", {screen: "HomeFeed"}),
          )}
          open={open}
          iconTitle={"home"}
        />
        <DrawerItem
          title={"Trending"}
          onFocus={() => onOpen()}
          onPress={navigationWrapper(() =>
            // @ts-ignore
            navigation.navigate("Home", {screen: "TrendingScreen"}),
          )}
          open={open}
          iconTitle={"trending-up"}
        />
        <DrawerItem
          title={"Search"}
          onFocus={() => onOpen()}
          onPress={() => navigation.navigate("Search")}
          open={open}
          iconTitle={"search"}
        />
        {account?.loginData?.accounts?.length > 0 ? (
          <>
            <DrawerItem
              title={"Subscriptions"}
              onFocus={() => onOpen()}
              onPress={() =>
                // @ts-ignore TODO: fix
                navigation.navigate("Home", {screen: "SubscriptionScreen"})
              }
              open={open}
              iconTitle={"subscriptions"}
            />
            <DrawerItem
              title={"History"}
              onFocus={() => onOpen()}
              onPress={() =>
                // @ts-ignore TODO: fix
                navigation.navigate("Home", {screen: "HistoryScreen"})
              }
              open={open}
              iconTitle={"history"}
            />
            <DrawerItem
              title={"Library"}
              onFocus={() => onOpen()}
              onPress={() =>
                // @ts-ignore TODO: fix
                navigation.navigate("Home", {screen: "LibraryScreen"})
              }
              open={open}
              iconTitle={"library"}
              iconType={"ionicon"}
            />
            <DrawerItem
              title={"MyYoutube"}
              onFocus={() => onOpen()}
              onPress={() =>
                // @ts-ignore TODO: fix
                navigation.navigate("Home", {screen: "MyYoutubeScreen"})
              }
              open={open}
              iconTitle={"youtube-tv"}
              iconType={"material-community"}
            />
          </>
        ) : (
          <DrawerItem
            title={"Login"}
            onFocus={() => onOpen()}
            onPress={() => navigation.navigate("LoginScreen")}
            open={open}
            iconTitle={"login"}
          />
        )}
        <DrawerItem
          bottom
          title={"Settings"}
          onFocus={() => onOpen()}
          onPress={() => navigation.navigate("SettingsScreen")}
          open={open}
          iconTitle={"settings"}
        />
      </Animated.View>
    </TVFocusGuideView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    paddingStart: 40,
    backgroundColor: "#333333",
  },
});

interface ItemProps {
  title: string;
  onFocus?: () => void;
  onBlur?: () => void;
  onPress?: () => void;
  start?: boolean;
  bottom?: boolean;
  iconTitle?: string;
  iconType?: string;
  open: boolean;
}

const DrawerItem = forwardRef<
  React.ElementRef<typeof TouchableOpacity>,
  ItemProps
>(
  (
    {title, onFocus, onBlur, onPress, start, bottom, iconTitle, iconType, open},
    ref,
  ) => {
    const {style} = useAppStyle();
    const isTV = Platform.isTV;
    const tvTokens = style.appleTVTokens;
    const [focus, setFocus] = useState(false);

    const textStyle = useAnimatedStyle(() => {
      return {
        opacity: withTiming(open ? 1 : 0),
      };
    });

    const focusStyle = useAnimatedStyle(() => {
      if (!isTV || !tvTokens) return {};

      return {
        transform: [
          {
            scale: withSpring(focus ? tvTokens.focusedScale : 1, {
              damping: 15,
              stiffness: 200,
            }),
          },
        ],
        opacity: withTiming(focus ? tvTokens.focusedOpacity : 1),
      };
    });

    return (
      <Animated.View style={focusStyle}>
        <TouchableOpacity
          style={[
            itemStyles.container,
            start || bottom
              ? {flex: 1, justifyContent: start ? "flex-end" : "flex-start"}
              : {},
            isTV &&
              tvTokens &&
              focus && {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                borderRadius: tvTokens.cardBorderRadius / 2,
                marginHorizontal: 8,
              },
          ]}
          onPress={onPress}
          onFocus={() => {
            setFocus(true);
            onFocus?.();
          }}
          onBlur={() => {
            setFocus(false);
            onBlur?.();
          }}>
          <Animated.View
            style={itemStyles.viewContainer}
            entering={FadeIn}
            exiting={FadeOut}>
            {iconTitle ? (
              <Icon
                name={iconTitle}
                type={iconType}
                color={"white"}
                size={isTV && tvTokens ? tvTokens.iconSize : 30}
              />
            ) : null}
            {open ? (
              <Animated.Text
                numberOfLines={1}
                style={[
                  itemStyles.text,
                  {color: style.textColor},
                  textStyle,
                  isTV &&
                    tvTokens && {
                      fontSize: tvTokens.bodyFontSize,
                      fontWeight: "600",
                    },
                ]}>
                {title}
              </Animated.Text>
            ) : null}
          </Animated.View>
        </TouchableOpacity>
      </Animated.View>
    );
  },
);

const itemStyles = StyleSheet.create({
  container: {
    padding: Platform.isTV ? 24 : 20,
    flex: 0,
  },
  viewContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontSize: Platform.isTV ? 22 : 20,
    paddingStart: Platform.isTV ? 20 : 15,
    fontWeight: Platform.isTV ? "600" : "normal",
  },
});
