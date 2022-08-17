# React Native with Expo

The project contains a skeleton app for [React Native](https://reactnative.dev/) using [Expo](https://docs.expo.dev/).

Code is written in [TypeScript](https://www.typescriptlang.org/), and app uses [React Navigation](https://reactnavigation.org/docs/getting-started) for navigation.

## Setup and installation

From the [Expo installation guide](https://docs.expo.dev/get-started/installation/), install the following:

- Git
- Node.js
- Expo CLI
- Yarn
- VS Code

Also install the [Expo Go app](https://docs.expo.dev/get-started/installation/#2-expo-go-app-for-ios-and) on your iPhone or Android phone.

## Run the app

[Start the expo development server](https://docs.expo.dev/get-started/create-a-new-app/#starting-the-development-server) from the terminal, and [scan the QR code from the terminal output](https://docs.expo.dev/get-started/create-a-new-app/#opening-the-app-on-your-phonetablet) on your phone.

## Start writing code

When you make changes to the code, the changes will automatically be reflected in Expo Go.

## Building an Android APK

In order to install a real app on an Android phone, we build an APK using [Codemagic](https://reactnativeci.com/).

Install Codemagic into your repository on GitHub. Configuration and keystore has already been added to the project (the password for the keystore will be given by the instructors), and you only need to [configure the environment variables](https://docs.codemagic.io/yaml-quick-start/building-a-react-native-app/#configuring-environment-variables) for your build, and change the package name.

Replace the default package name (`no.itverket.itdagene.reactnative`) to something unique for your team in these three files:

- codemagic.yaml
- app.json
- build.gradle

Add your emails to `codemagic.yaml` at `publishing -> email -> recipients` to receive the APK by mail when built.

Install the APK on the phone.
