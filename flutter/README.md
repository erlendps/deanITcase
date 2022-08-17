# Flutter

The project contains a skeleton app for [Flutter](https://docs.flutter.dev).

Code is written in [Dart](https://dart.dev/guides).


## Setup and installation

If this is your first time using Flutter, here is a suggestion of how you could set it up. From the
[Flutter installation guide](https://docs.flutter.dev/get-started/install), go through all the
following sections:

- "Get the Flutter SDK"
- "Run flutter doctor"
- "Update your path"
- "Android setup"

After this you should have the following tools installed:

- Git
- Flutter SDK
- Android Studio

Continue to the next step: [Set up an editor](https://docs.flutter.dev/get-started/editor?tab=androidstudio)
Install the Flutter and Dart plugins.

(Other editors than Android Studio are also possible to use if you prefer).


## Run the app

Open this project in Android Studio. Open the Flutter guide about [Test drive ](https://docs.flutter.dev/get-started/test-drive?tab=androidstudio)
and jump to the section "Run the app".

The "Config selector" field will need to be configured. Click on the field, and select "Edit Configurations..".
Click the + button in the top left corner. Select Flutter from the list. In the "Name" field,
enter "main.dart". In the Dart Entrypoint field, find the main.dart file at /itdagene-2022-mobil-app-case/flutter/lib/main.dart.

Now you can click "Run "main.dart"", AKA the play button in the toolbar.


## Start writing code

After you make changes to the code, click the "Hot reload" lightning shaped button to deploy the 
changes to your device.

Get a valid API token from one of the case instructors, and insert it into the _apiToken constant
in the `http_methods.dart` file.


## Building an Android APK

In order to install a real app on an Android device, we build using [Codemagic](https://docs.codemagic.io).

Install Codemagic into your repository on GitHub.

Replace the default package name (`no.itverket.itdagene.flutter`) to something unique for your team.
Do a project wide search & replace to find all the files where it should be changes. It should be
three AndroidManifest.xml files, one build.gradle file and lastly the MainActivity.kt file.

Add your emails to `codemagic.yaml` at `publishing -> email -> recipients` to receive the APK by mail when built.