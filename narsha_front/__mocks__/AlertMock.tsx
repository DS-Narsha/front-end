import {Alert} from 'react-native';

const alertMock = jest.fn();

export const setAlertMock = () => {
  jest.spyOn(Alert, 'alert').mockImplementation(alertMock);
};

export const restoreAlertMock = () => {
  jest.spyOn(Alert, 'alert').mockRestore();
};

export default alertMock;
