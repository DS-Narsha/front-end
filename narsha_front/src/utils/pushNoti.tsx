import { AppState } from "react-native";
import notifee, {AndroidImportance, AndroidColor} from '@notifee/react-native';

//@ts-ignore
const displayNotification = async message => {
    console.log(message+ "sdkfksdfjkdsh");
    await notifee.createChannel({
        id: 'channel_id', // 채널 ID
        name: 'Channel Name', // 채널 이름
        importance: AndroidImportance.HIGH, // 알림 중요도 설정
      });

    const channelId = 'channel_id';

    await notifee.displayNotification({
        title: message.notification.title,
        body: message.notification.body,
        android: {
            channelId,
        }
    })
}

export default {
    displayNoti: (message: any) => displayNotification(message),
}