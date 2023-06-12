import React, { useContext, useEffect, useState } from "react";
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import HTMLCard from "../components/HTMLCard";
import PatrolHistoryCard from "../components/PatrolHistoryCard";
import { useAuth } from "../contexts/AuthContext";
import { LoadingContext } from "../contexts/LoadingContext";
import { getPatrolHistory } from "../services/ApiService";

const PatrolHistoryScreen = ({ route }) => {
  const { access_token } = useAuth();
  const { page_patrol_id } = route.params;
  const [patrol_history, setPatrolHistory] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isHTMLCardVisible, setHTMLCardVisible] = useState(false);
  const [selectedHTMLContent, setSelectedHTMLContent] = useState("");
  const { dispatch } = useContext(LoadingContext);

  const fetchData = async () => {
    try {
      const patrol_history = await getPatrolHistory(
        page_patrol_id,
        access_token,
        dispatch
      );
      setPatrolHistory(patrol_history);
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

  const handleViewButtonPress = (htmlContent) => {
    setSelectedHTMLContent(htmlContent);
    setHTMLCardVisible(true);
  };

  const handleHTMLCardDismiss = () => {
    setHTMLCardVisible(false);
  };

  return (
    <>
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        {patrol_history.length === 0 ? (
          <View style={styles.emptyContent}>
            <Text style={styles.emptyText}>
              There is no history for this Patrol
            </Text>
          </View>
        ) : (
          patrol_history.map((history_entity) => (
            <PatrolHistoryCard
              key={history_entity.scrape_time}
              history_entity={history_entity}
              onView={handleViewButtonPress}
            />
          ))
        )}
      </ScrollView>
      <HTMLCard
        visible={isHTMLCardVisible}
        htmlContent={selectedHTMLContent}
        onView={handleViewButtonPress}
        onClose={handleHTMLCardDismiss}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  emptyContainer: {
    justifyContent: "center",
    backgroundColor: "#F5F5F5",
  },
  emptyContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    textAlign: "center",
  },
});

export default PatrolHistoryScreen;
