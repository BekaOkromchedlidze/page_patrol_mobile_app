import * as React from "react";
import { ScrollView, useWindowDimensions } from "react-native";
import { Dialog, Portal } from "react-native-paper";
import HTML from "react-native-render-html";

const HTMLCard = ({ visible, onClose, htmlContent }) => {
  const windowWidth = useWindowDimensions().width;

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onClose}>
        <Dialog.ScrollArea>
          <ScrollView contentContainerStyle={{ paddingHorizontal: 24 }}>
            <HTML
              source={{ html: htmlContent }}
              ignoredDomTags={["button", "source", "noscript"]}
              contentWidth={windowWidth}
            />
          </ScrollView>
        </Dialog.ScrollArea>
      </Dialog>
    </Portal>
  );
};

export default HTMLCard;
