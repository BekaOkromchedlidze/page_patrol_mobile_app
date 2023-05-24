import React from "react";
import { StyleSheet } from "react-native";
import { Card, IconButton, Switch, Text } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const WebsiteMonitorCard = ({ entry, onEdit, onDelete, onSwitch }) => {
  const handleEdit = () => {
    onEdit(entry);
  };

  const handleDelete = () => {
    onDelete(entry);
  };

  const handleSwitch = () => {
    onSwitch(entry);
    console.log("Switch button pressed");
  };

  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text>URL: {entry.url}</Text>
        <Text>XPath: {entry.xpath}</Text>
        <Text>Search String: {entry.search_string}</Text>
        <Text>Scrape Interval: {entry.scrape_interval}</Text>
      </Card.Content>
      <Card.Actions style={styles.cardActions}>
        <Switch
          value={entry.is_enabled ? true : false}
          onValueChange={handleSwitch}
          style={styles.switchButton}
        />
        <IconButton
          icon={({ color, size }) => (
            <MaterialCommunityIcons name="pencil" color={color} size={size} />
          )}
          onPress={handleEdit}
        />
        <IconButton
          icon={({ color, size }) => (
            <MaterialCommunityIcons name="close" color={color} size={size} />
          )}
          color="red"
          onPress={handleDelete}
        />
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
  },
  cardActions: {
    justifyContent: "flex-end",
  },
  switchButton: {
    position: "absolute",
    left: 0,
    bottom: 8,
    marginLeft: 10,
  },
});

export default WebsiteMonitorCard;
