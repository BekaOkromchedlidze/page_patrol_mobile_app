import { BlurView } from "expo-blur";
import React, { useContext } from "react";
import { ActivityIndicator, Dimensions, StyleSheet } from "react-native";
import { LoadingContext } from "../contexts/LoadingContext";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const LoadingIndicator = () => {
  // const { loadingCount } = useContext(LoadingContext);
  const { loading } = useContext(LoadingContext);

  if (loading > 0) {
    return (
      <BlurView intensity={200} style={styles.overlay}>
        <ActivityIndicator size="large" color="#95959e" />
      </BlurView>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: windowWidth,
    height: windowHeight,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
});

export default LoadingIndicator;
