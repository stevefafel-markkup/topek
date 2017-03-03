import PushNotification from "react-native-push-notification"
import { InteractionManager } from "react-native"
import * as authActions from "../state/actions/authActions"
import * as Utils from "../lib/utils"

class PushService {

  initialize(dispatch) {

    PushNotification.configure({

      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function(token) {
          console.log("DeviceToken:", token);
          dispatch(authActions.registerDevice(token.token, token.os))
      },

      // (required) Called when a remote or local notification is opened or received
      onNotification: function(notification) {
          console.log("Notification:", notification);
      },

      // ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications) 
      senderID: "843730666183",

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
          alert: true,
          badge: true,
          sound: true
      },

      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,

      /**
        * (optional) default: true
        * - Specified if permissions (ios) and token (android and ios) will requested or not,
        * - if not, you must call PushNotification.requestPermissions() later
        */
      requestPermissions: false,
    });
    
  }

  requestPermissions() {
    PushNotification.requestPermissions();
  }

}

export default new PushService()