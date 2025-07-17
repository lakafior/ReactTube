import React, {createContext, useContext} from "react";
import {Platform} from "react-native";

type StyleType = "dark" | "light";

interface AppleTVTokens {
  cardBackgroundColor: string;
  cardBorderRadius: number;
  cardPadding: number;
  cardMargin: number;
  headerFontSize: number;
  bodyFontSize: number;
  captionFontSize: number;
  iconSize: number;
  focusedScale: number;
  focusedOpacity: number;
  shadowColor: string;
  shadowOpacity: number;
  shadowRadius: number;
  elevation: number;
}

interface AppStyle {
  textColor: string;
  invertedTextColor: string;
  backgroundColor: string;
  backgroundColorAlpha: string;
  appleTVTokens?: AppleTVTokens;
}

const appleTVTokens: AppleTVTokens = {
  cardBackgroundColor: "#1c1c1e",
  cardBorderRadius: 16,
  cardPadding: 32,
  cardMargin: 16,
  headerFontSize: 32,
  bodyFontSize: 20,
  captionFontSize: 16,
  iconSize: 36,
  focusedScale: 1.05,
  focusedOpacity: 0.8,
  shadowColor: "#000",
  shadowOpacity: 0.3,
  shadowRadius: 8,
  elevation: 8,
};

const dark: AppStyle = {
  textColor: "white",
  invertedTextColor: "black",
  backgroundColor: "black",
  backgroundColorAlpha: "#111111cc",
  appleTVTokens: Platform.isTV ? appleTVTokens : undefined,
};

interface AppStyleContext {
  type: StyleType;
  style: AppStyle;
}

const Context = createContext<AppStyleContext>({
  style: dark,
  type: "dark",
});

interface Props {
  children?: React.ReactNode;
}

export default function AppStyleProvider({children}: Props) {
  const value: AppStyleContext = {
    type: "dark",
    style: dark,
  };

  return <Context.Provider value={value} children={children} />;
}

export function useAppStyle() {
  return useContext(Context);
}
