import { AppState } from "react-native";
import notifee, {AndroidImportance, AndroidColor} from '@notifee/react-native';

//@ts-ignore
const displayNotification = async message => {
    const channelAnoucement = await notifee.createChannel({
        id: 'default',
        name: 'narsha',
        importance: AndroidImportance.HIGH,
    });

    await notifee.displayNotification({
        title: message.notification.title,
        body: message.notification.body,
        android: {
            channelId: channelAnoucement,
            smallIcon: 'ic_launcher',
        }
    })
}

export default {
    displayNoti: (message: any) => displayNotification(message),
}