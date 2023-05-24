import React, { useEffect, useState } from "react";
import { RefreshControl, ScrollView, StyleSheet } from "react-native";
import { FAB } from "react-native-paper";
import { useAuth } from "../AuthContext";
import WebsiteMonitorCard from "../components/WebsiteMonitorCard";
import WebsiteMonitorForm from "../components/WebsiteMonitorForm";
import { deleteEntry, getEntries, toggleEntry } from "../services/ApiService";

const HomeScreen = () => {
  const { access_token } = useAuth();
  const [entries, setEntries] = useState([]);
  const [isFormVisible, setFormVisible] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);

  const fetchData = async () => {
    try {
      // console.log(access_token);
      const data = await getEntries(access_token);
      // console.log(data);
      setEntries(data);
    } catch (error) {
      console.error("Error fetching entries:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [access_token]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchData();
    setRefreshing(false);
  };

  const handleAddButtonPress = () => {
    setFormVisible(true);
    setSelectedEntry(null);
    setEdit(false);
  };

  const handleFormDismiss = () => {
    setFormVisible(false);
    handleRefresh();
  };

  const handleEditButtonPress = (entry) => {
    setSelectedEntry(entry);
    setEdit(true);
    setFormVisible(true);
  };

  const handleDeleteButtonPress = async (entry) => {
    await deleteEntry(entry.RowKey, access_token);
    handleRefresh();
  };

  const handleSwitchButtonPress = async (entry) => {
    await toggleEntry(entry.RowKey, access_token);
    handleRefresh();
  };

  return (
    <>
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        {entries.map((entry) => (
          <WebsiteMonitorCard
            key={entry.RowKey}
            entry={entry}
            onEdit={handleEditButtonPress}
            onDelete={handleDeleteButtonPress}
            onSwitch={handleSwitchButtonPress}
          />
        ))}
      </ScrollView>
      <FAB
        style={styles.fab}
        icon="plus"
        color="white"
        onPress={handleAddButtonPress}
      />
      <WebsiteMonitorForm
        visible={isFormVisible}
        onDismiss={handleFormDismiss}
        initialEntry={selectedEntry}
        isEdit={isEdit}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  fab: {
    position: "absolute",
    backgroundColor: "#007BFF",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default HomeScreen;
