import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Button, Dialog, Menu, Portal, TextInput } from "react-native-paper";
import { useAuth } from "../AuthContext";
import { addEntry } from "../services/ApiService";

const WebsiteMonitorForm = ({ visible, onDismiss, isEdit }) => {
  const [url, setUrl] = useState("");
  const [xPath, setXPath] = useState("");
  const [searchString, setSearchString] = useState("");
  const [scrapeInterval, setScrapeInterval] = useState(1);
  const [menuVisible, setMenuVisible] = useState(false);
  const { access_token } = useAuth();

  const scrapeIntervalValues = [1, 5, 15, 30, 60, 240, 720, 1440];

  const handleSave = async () => {
    if (isEdit) {
      // Placeholder logic for editing the form data
      //   console.log("Editing form data:", {
      //     url,
      //     xPath,
      //     searchString,
      //     scrapeInterval,
      //   });
      // Make PUT API request with updated data
    } else {
      // Placeholder logic for adding new form data
      //   console.log("Adding new form data:", {
      //     url,
      //     xPath,
      //     searchString,
      //     scrapeInterval,
      //     access_token
      //   });
      // Make POST API request with new data
      await addEntry(url, xPath, searchString, scrapeInterval, access_token);
    }
    // Clear form data
    setUrl("");
    setXPath("");
    setSearchString("");
    setScrapeInterval(1);
    onDismiss();
  };

  const handleCancel = () => {
    // Placeholder logic for cancelling the form
    console.log("Form cancelled");
    // Clear form data
    // setUrl("");
    // setXPath("");
    // setSearchString("");
    // setScrapeInterval(1);
    onDismiss();
  };

  const handleScrapeIntervalSelect = (interval) => {
    setScrapeInterval(interval);
    setMenuVisible(false);
  };

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Title>{isEdit ? "Edit" : "Add"} Website Monitor</Dialog.Title>
        <Dialog.Content>
          <TextInput
            label="URL"
            value={url}
            onChangeText={setUrl}
            style={styles.input}
          />
          <TextInput
            label="XPath"
            value={xPath}
            onChangeText={setXPath}
            style={styles.input}
          />
          <TextInput
            label="Search String"
            value={searchString}
            onChangeText={setSearchString}
            style={styles.input}
          />
          <Menu
            visible={menuVisible}
            onDismiss={() => setMenuVisible(false)}
            anchor={
              <Button
                mode="outlined"
                onPress={() => setMenuVisible(true)}
                style={styles.menuButton}
              >
                Scrape Interval (mins): {scrapeInterval}
              </Button>
            }
          >
            {scrapeIntervalValues.map((interval) => (
              <Menu.Item
                key={interval}
                onPress={() => handleScrapeIntervalSelect(interval)}
                title={interval.toString()}
              />
            ))}
          </Menu>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={handleCancel}>Cancel</Button>
          <Button onPress={handleSave}>Save</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 10,
  },
  menuButton: {
    marginBottom: 10,
  },
});

export default WebsiteMonitorForm;
