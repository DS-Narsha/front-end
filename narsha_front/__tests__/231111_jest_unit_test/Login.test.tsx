import {fireEvent, render, screen} from '@testing-library/react-native';
import {userEvent} from '@testing-library/user-event';
import TestLoginPage from '../../test/TestLoginPage';
import '@testing-library/jest-dom';
import alertMock, {
  setAlertMock,
  restoreAlertMock,
} from '../../__mocks__/alertMock';

describe('LoginPage', () => {
  beforeEach(() => {
    setAlertMock();
  });

  afterEach(() => {
    restoreAlertMock();
  });

  it('사용자가 로그인 화면을 볼 수 있다.', () => {
    // 1. Arrange
    render(<TestLoginPage />);

    // 2. Act
    const textDisplay = screen.getByText('로그인');

    // 3. Assert
    expect(textDisplay).toHaveBeenCalledWith('로그인');
  });

  it('아이디를 입력하지 않았을 때', async () => {
    // 1. Arrange
    render(<TestLoginPage />);

    // 2. Act
    const inputID = screen.getByPlaceholderText('아이디');
    const TouchableOpacity = screen.getByText('확인!');

    // 3. Assert
    fireEvent.changeText(inputID, '');
    fireEvent.press(TouchableOpacity);

    expect(alertMock).toHaveBeenCalledWith('아이디를 입력해주세요.');
  });

  it('비밀번호를 입력하지 않았을 때', async () => {
    // 1. Arrange
    render(<TestLoginPage />);

    // 2. Act
    const inputID = screen.getByPlaceholderText('아이디');
    const inputPW = screen.getByPlaceholderText('비밀번호');
    const TouchableOpacity = screen.getByText('확인!');

    // 3. Assert
    fireEvent.changeText(inputID, '1234');
    fireEvent.changeText(inputPW, '');
    fireEvent.press(TouchableOpacity);

    expect(alertMock).toHaveBeenCalledWith('비밀번호를 입력해주세요.');
  });

  it('아이디와 비밀번호를 입력하지 않았을 때', () => {
    // 1. Arrange
    render(<TestLoginPage />);

    // 2. Act
    const inputID = screen.getByPlaceholderText('아이디');
    const inputPW = screen.getByPlaceholderText('비밀번호');
    const TouchableOpacity = screen.getByText('확인!');

    // 3. Assert
    fireEvent.changeText(inputID, '');
    fireEvent.changeText(inputPW, '');
    fireEvent.press(TouchableOpacity);

    expect(alertMock).toHaveBeenCalledWith('아이디와 비밀번호를 입력해주세요.');
  });
});
