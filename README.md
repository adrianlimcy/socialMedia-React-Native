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