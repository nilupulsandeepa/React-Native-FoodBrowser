// import { PushNotificationIOS } from 'react-native';
// import PushNotification from 'react-native-push-notification';

// PushNotification.configure({
//     onNotification: (notification) => {
//         console.log("Notification: ". notification);
//         notification.finish(PushNotificationIOS.FetchResult.NoData);
        
//     },
//     requestPermissions: true
// })

// export const createNotificationChannel = () => {
//     PushNotification.createChannel({
//         channelId: 'default-channel-id',
//         channelName: 'Default Channel'
//     },
//     (created) => console.log(`Notification channel created ${created}`)
//     );
// };

// export const showLocalNotification = (title: string, message: string) => {
//     PushNotification.localNotification({
//         channelId: 'default-channel-id',
//         title: title,
//         message: message,
//         playSound: true,
//         soundName: 'default'
//     });
// };