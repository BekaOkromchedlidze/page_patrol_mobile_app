import moment from "moment";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Card, Text } from "react-native-paper";

const PatrolHistoryCard = ({ history_entity, onView }) => {
  const handleView = () => {
    onView(history_entity);
    console.log("View button pressed");
  };

  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text>
          Time: {moment(history_entity.scrape_time).format("HH:mm DD-MM-YYYY")}
        </Text>
      </Card.Content>
      <Card.Actions style={styles.cardActions}>
        <TouchableOpacity onPress={handleView} style={styles.viewButton}>
          <Text style={styles.viewButtonText}>View</Text>
        </TouchableOpacity>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
  },
  cardActions: {
    justifyContent: "center",
    alignItems: "center",
  },
  viewButton: {
    backgroundColor: "#007BFF",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  viewButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default PatrolHistoryCard;
