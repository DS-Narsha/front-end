import React, {useState, useContext, useEffect} from 'react';
import {useQuery, useQueryClient, useMutation} from '@tanstack/react-query';
import {Text, View} from 'react-native';
import MainNavigator from '../components/navigation/MainNavigator';
import NotAvailable from './NotAvailablePage';
import Config from 'react-native-config';

type UserData = {
  groupCode: string;
};

const Loding = () => {
  const queryClient = useQueryClient();
  const {data: userData} = useQuery(['user'], () => {
    return queryClient.getQueryData(['user']);
  }) as {data: UserData};

  // get time
  const getTime = async () => {
    try {
      const res = await fetch(
        `http://${Config.HOST_NAME}/api/group/get-time?groupCode=${userData.groupCode}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const json = await res.json();
      return json;
    } catch (err) {
      console.log(err);
    }
  };

  const timeQuery = useQuery({
    queryKey: ['time'],
    queryFn: getTime,
  });

  const [bool, setBool] = useState<Boolean>();

  useEffect(() => {
    console.log(bool);
  });

  useEffect(() => {
    const makeTime = async () => {
      const data = await getTime();
      if (data) {
        const startTime = timeQuery.data
          ? new Date(timeQuery.data.data.startTime)
          : new Date();
        const endTime = timeQuery.data
          ? new Date(timeQuery.data.data.endTime)
          : new Date();

        const now =
          String(new Date().getHours()).padStart(2, '0') +
          String(new Date().getMinutes()).padStart(2, '0');
        const start =
          String(startTime.getHours()).padStart(2, '0') +
          String(startTime.getMinutes()).padStart(2, '0');
        const end =
          String(endTime.getHours()).padStart(2, '0') +
          String(endTime.getMinutes()).padStart(2, '0');

        console.log('s:' + start);
        console.log('e:' + end);
        console.log(
          startTime.getHours() < endTime.getHours()
            ? start < now && now < end
            : start < now || now < end,
        );
        setBool(
          startTime.getHours() < endTime.getHours()
            ? start < now && now < end
            : start < now || now < end,
        );

        console.log(bool);
      }
    };

    makeTime();
  }, [timeQuery.data]);

  return <View>{bool ? <NotAvailable /> : <NotAvailable />}</View>;
};

export default Loding;
