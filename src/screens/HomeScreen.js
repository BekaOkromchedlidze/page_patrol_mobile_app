import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { RefreshControl, ScrollView, StyleSheet } from "react-native";
import { FAB } from "react-native-paper";
import PagePatrolCard from "../components/PagePatrolCard";
import PagePatrolForm from "../components/PagePatrolForm";
import { useAuth } from "../contexts/AuthContext";
import { LoadingContext } from "../contexts/LoadingContext";
import { deleteEntry, getEntries, toggleEntry } from "../services/ApiService";

const HomeScreen = () => {
  const { access_token } = useAuth();
  const navigation = useNavigation();
  const [entries, setEntries] = useState([]);
  const [isFormVisible, setFormVisible] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const { dispatch } = useContext(LoadingContext);

  const fetchData = async () => {
    try {
      // console.log(access_token);
      const data = await getEntries(access_token, dispatch);
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
    await deleteEntry(entry.RowKey, access_token, dispatch);
    handleRefresh();
  };

  const handleSwitchButtonPress = async (entry) => {
    await toggleEntry(entry.RowKey, access_token, dispatch);
    handleRefresh();
  };

  const handleHistoryButtonPress = (page_patrol_id) => {
    navigation.navigate("Patrol History", { page_patrol_id });
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
          <PagePatrolCard
            key={entry.RowKey}
            entry={entry}
            onEdit={handleEditButtonPress}
            onDelete={handleDeleteButtonPress}
            onSwitch={handleSwitchButtonPress}
            onHistory={handleHistoryButtonPress}
          />
        ))}
      </ScrollView>
      <FAB
        style={styles.fab}
        icon="plus"
        color="white"
        onPress={handleAddButtonPress}
      />
      <PagePatrolForm
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
