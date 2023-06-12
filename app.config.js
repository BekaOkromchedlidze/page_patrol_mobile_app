module.exports = {
  name: "PagePatrol",
  slug: "PagePatrol",
  owner: "beeks246",
  scheme: "com.beka.pagepatrol",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.beka.pagepatrol",
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
    package: "com.beka.pagepatrol",
    googleServicesFile: "./google-services.json",
  },
  web: {
    favicon: "./assets/favicon.png",
  },
  plugins: [],
  extra: {
    CLIENT_ID: "ab7885e0-7bbe-46b3-b3b1-b35de314912e",
    TENANT_ID: "de2d86e2-5a10-4bb5-a955-50bacb888543",
    REDIRECT_URI: "https://auth.expo.io/@beeks246/PagePatrol",
    BACKEND_BASE_URL:
      process.env.BACKEND_BASE_URL ?? "http://192.168.1.223:8000",
    // SECRET_TEST: process.env.SECRET_TEST ?? "secret_test_undefined",
    eas: {
      projectId: "7220d82d-abcc-4d6c-b737-c94bd12643ab",
    },
  },
};
