import React, { useContext, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Button, Dialog, Menu, Portal, TextInput } from "react-native-paper";
import { useAuth } from "../contexts/AuthContext";
import { LoadingContext } from "../contexts/LoadingContext";
import { addEntry, updateEntry } from "../services/ApiService";

const WebsiteMonitorForm = ({ visible, onDismiss, isEdit, initialEntry }) => {
  const [RowKey, setRowKey] = useState("");
  const [url, setUrl] = useState("");
  const [xPath, setXPath] = useState("");
  const [searchString, setSearchString] = useState("");
  const [scrapeInterval, setScrapeInterval] = useState(1);
  const [menuVisible, setMenuVisible] = useState(false);
  const { access_token } = useAuth();
  const { dispatch } = useContext(LoadingContext);

  const scrapeIntervalValues = [1, 5, 15, 30, 60, 240, 720, 1440];

  useEffect(() => {
    if (initialEntry) {
      setRowKey(initialEntry.RowKey);
      setUrl(initialEntry.url);
      setXPath(initialEntry.xpath);
      setSearchString(initialEntry.search_string);
      setScrapeInterval(initialEntry.scrape_interval);
    } else {
      setUrl("");
      setXPath("");
      setSearchString("");
      setScrapeInterval(1);
    }
  }, [initialEntry]);

  const handleSave = async () => {
    if (isEdit) {
      // Make PUT API request with updated data
      await updateEntry(
        RowKey,
        url,
        xPath,
        searchString,
        scrapeInterval,
        access_token,
        dispatch
      );
    } else {
      // Make POST API request with new data
      await addEntry(
        url,
        xPath,
        searchString,
        scrapeInterval,
        access_token,
        dispatch
      );
    }
    // Clear saved form data
    setUrl("");
    setXPath("");
    setSearchString("");
    setScrapeInterval(1);
    onDismiss();
  };

  const handleCancel = () => {
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
