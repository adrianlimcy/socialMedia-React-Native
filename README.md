# Steps
1.  added the repository from
    - https://github.com/PacktPublishing/React-Projects/tree/ch11-initial
2.  cd server
3.  npm install && npm audit fix
4.  cd ../client
5.  npm install && npm audit fix && npm start
6.  expo upgrade

# Getting the local machine IP address
1.  Windows cmd
    -   ipconfig
2.  MAC Terminal
    -   ipconfig getifaddr en0

#   Client
1.  met with error
    - expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view
2.  npm audit fix
3.  npm start
4.  book code forgot to add the port 4000 in the const API_URL
    -   http://xxx.xxx.xxx.xxx:4000/graphql
5.  Username: test
    Password: test

# Mobile permissions for camera
1.  expo install expo-permissions
2.  expo install expo-image-picker
3.  npm install @expo/react-native-action-sheet
4.  removing the if platform == ios makes it work on Android

# Notification
1.  mkdir client/utils
2.  touch client/utils/registerForPushNotificationsAsync.js
3.  encountered error
    do this before step 1
    expo install expo-notifications
3.  change import {Notifications} from 'expo' to import * as Notifications from 'expo-notifications'
4.  error encountered
    Notification is deprecated, so there is no longer an addListener function