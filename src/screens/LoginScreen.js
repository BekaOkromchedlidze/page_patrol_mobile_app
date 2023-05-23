import { CLIENT_ID, TENANT_ID } from "@env";
import { useNavigation } from "@react-navigation/native";
import {
  ResponseType,
  makeRedirectUri,
  useAuthRequest,
  useAutoDiscovery,
} from "expo-auth-session";
import * as React from "react";
import { Button, StyleSheet, View } from "react-native";
import { useAuth } from "../AuthContext";

export default function LoginScreen() {
  const { setAuth } = useAuth();
  const navigation = useNavigation();

  const redirectUri = makeRedirectUri({
    scheme: "pagepatrol://",
    path: "auth",
  });

  // const discovery = {
  //   authorizationEndpoint: `https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/authorize`,
  //   tokenEndpoint: `https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/token`,
  // };
  const discovery = useAutoDiscovery(
    `https://login.microsoftonline.com/${TENANT_ID}/v2.0`
  );

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: CLIENT_ID,
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
    if (response?.type === "success") {
      const { access_token } = response.params;
      // Save the access_token and perform necessary actions
      setAuth(access_token);
      // console.log(access_token);
      navigation.navigate("Home");
    }
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
