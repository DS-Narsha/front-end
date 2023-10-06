import notifee from '@notifee/react-native';


const onDisplayNotification = async ({
    title = '',
    body = '',
  }: {
    title?: string;
    body?: string;
  }) => {
    const channelId = await notifee.createChannel({
      id: 'channelId',
      name: 'channelName',
    });
    console.log(title, body)
    await notifee.displayNotification({
      title,
      body,
      android: {
        channelId,
      },
    });
  };

  export { onDisplayNotification };
