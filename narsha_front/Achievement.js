import { createStore} from "redux";

export const SUCCESS = "SUCCESS";

export const turn = num => ({ type: SUCCESS, num });

const initalState = {
  achieve: []
}

export const turnAchieve = (state = initalState, action) => {
  switch (action.type) {
    case SUCCESS:
      return {
        ...state,
        achieve: [...state.achieve, action.num],
      };

    // default를 쓰지 않으면 맨처음 state에 count값이 undefined가 나옵니다 꼭! default문을 넣으세요
    default:
      return state;
  }
};

const store = createStore(turnAchieve);

export default store;