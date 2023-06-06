// import { CLIENT_ID, TENANT_ID } from "@env";
import { useNavigation } from "@react-navigation/native";
import {
  ResponseType,
  makeRedirectUri,
  useAuthRequest,
  useAutoDiscovery,
} from "expo-auth-session";
import Constants from "expo-constants";
import React, { useRef } from "react";
import { Button, StyleSheet, View } from "react-native";
import { useAuth } from "../AuthContext";
import { updateExpoPushToken } from "../services/ApiService";

export default function LoginScreen() {
  const { setAuth, push_notification_token } = useAuth();
  const navigation = useNavigation();
  const notificationListener = useRef();
  const responseListener = useRef();

  const redirectUri = makeRedirectUri({
    scheme: "com.beka.pagepatrol",
    path: "auth",
  });

  const discovery = useAutoDiscovery(
    `https://login.microsoftonline.com/${Constants.expoConfig.extra.TENANT_ID}/v2.0`
  );

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: Constants.expoConfig.extra.CLIENT_ID,
      // clientId: CLIENT_ID,
      responseType: ResponseType.Token,
      redirectUri,
      scopes: [
        "openid",
        "profile",
        "email",
        "api://ab7885e0-7bbe-46b3-b3b1-b35de314912e/user_impersonation",
      ],
    },
    discovery
  );

  React.useEffect(() => {
    const handleResponse = async () => {
      if (response?.type === "success") {
        const { access_token } = response.params;
        setAuth(access_token);
        //TODO: Add loading indicator when waiting for response from api
        await updateExpoPushToken(access_token, push_notification_token);

        navigation.navigate("Home");
      }
    };

    handleResponse();
  }, [response]);

  return (
    <View style={styles.container}>
      <Button
        disabled={!request}
        title="Login"
        onPress={() => {
          promptAsync();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
