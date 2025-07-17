import {Platform} from "react-native";
import {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
} from "react-native-reanimated";

/**
 * Hook for Apple TV focus animations
 * Provides scale and opacity animations for focused elements
 */
export function useTVFocusAnimation(scale = 1.05, opacity = 0.8) {
  const focused = useSharedValue(false);

  const animatedStyle = useAnimatedStyle(() => {
    if (!Platform.isTV) return {};

    return {
      transform: [
        {
          scale: withSpring(focused.value ? scale : 1, {
            damping: 15,
            stiffness: 200,
          }),
        },
      ],
      opacity: focused.value ? opacity : 1,
    };
  });

  const onFocus = () => {
    focused.value = true;
  };

  const onBlur = () => {
    focused.value = false;
  };

  return {
    animatedStyle,
    onFocus,
    onBlur,
    focused,
  };
}

/**
 * Get Apple TV-specific styling constants
 */
export function getTVStyleConstants() {
  if (!Platform.isTV) return null;

  return {
    cardPadding: 32,
    cardMargin: 16,
    cardBorderRadius: 16,
    headerFontSize: 32,
    bodyFontSize: 20,
    captionFontSize: 16,
    iconSize: 36,
    minTouchTarget: 80,
    focusScale: 1.05,
    focusOpacity: 0.8,
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  };
}

/**
 * Check if the current platform is Apple TV
 */
export const isAppleTV = Platform.isTV;

/**
 * Get platform-specific font size
 */
export function getFontSize(base: number, tvMultiplier = 1.3): number {
  return Platform.isTV ? Math.round(base * tvMultiplier) : base;
}

/**
 * Get platform-specific spacing
 */
export function getSpacing(base: number, tvMultiplier = 1.5): number {
  return Platform.isTV ? Math.round(base * tvMultiplier) : base;
}

/**
 * Get platform-specific icon size
 */
export function getIconSize(base: number, tvSize?: number): number {
  return Platform.isTV ? tvSize || Math.round(base * 1.5) : base;
}
