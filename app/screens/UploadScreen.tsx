import React from "react";
import { StyleSheet, View, Modal } from "react-native";
import LottieView from "lottie-react-native";
import * as Progress from "react-native-progress";

import colors from "../config/colors";

const UploadScreen = ({
  progress,
  visible = false,
  onDone,
}: {
  progress: number;
  visible: boolean;
  onDone: () => void;
}) => {
  return (
    <>
      <Modal visible={visible}>
        <View style={styles.container}>
          {progress < 1 ? (
            <Progress.Bar
              color={colors.primary}
              width={200}
              progress={progress}
            />
          ) : (
            <LottieView
              style={styles.animation}
              autoPlay
              loop={false}
              source={require("../assets/animations/done.json")}
              onAnimationFinish={onDone}
            />
          )}
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  animation: {
    width: 150,
  },
});

export default UploadScreen;
