// import React, { useEffect, useState } from 'react';
// import { View, Text, Button } from 'react-native';
// import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';

// const Test = () => {
//   const [userInfo, setUserInfo] = useState(null);

//   useEffect(() => {
//     configureGoogleSignIn();
//   }, []);

//   const configureGoogleSignIn = async () => {
//     await GoogleSignin.configure({
//       webClientId: 'YOUR_WEB_CLIENT_ID', // Replace with your web client ID
//     });
//   };

//   const signInWithGoogle = async () => {
//     try {
//       await GoogleSignin.hasPlayServices();
//       const { user, idToken } = await GoogleSignin.signIn();
//       setUserInfo({ user, idToken });
//     } catch (error) {
//       if (error.code === statusCodes.SIGN_IN_CANCELLED) {
//         // User cancelled the login process
//       } else if (error.code === statusCodes.IN_PROGRESS) {
//         // Operation (e.g., sign in) is in progress already
//       } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
//         // Play services not available or outdated on the device
//       } else {
//         // Some other error
//       }
//     }
//   };

//   const signOut = async () => {
//     try {
//       await GoogleSignin.revokeAccess();
//       await GoogleSignin.signOut();
//       setUserInfo(null);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <View>
//       {userInfo ? (
//         <View>
//           <Text>Welcome, {userInfo.user.name}!</Text>
//           <Text>ID Token: {userInfo.idToken}</Text>
//           <Button title="Sign Out" onPress={signOut} />
//         </View>
//       ) : (
//         <GoogleSigninButton
//           style={{ width: 192, height: 48 }}
//           size={GoogleSigninButton.Size.Wide}
//           color={GoogleSigninButton.Color.Dark}
//           onPress={signInWithGoogle}
//         />
//       )}
//     </View>
//   );
// };

// export default Test;