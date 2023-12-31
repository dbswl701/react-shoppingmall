/* 액션 타입 만들기 */
// Ducks 패턴을 따를땐 액션의 이름에 접두사를 넣어주세요.
// 이렇게 하면 다른 모듈과 액션 이름이 중복되는 것을 방지 할 수 있습니다.
const SET_LOADING = 'loading/SET_LOADING';


/* 액션 생성함수 만들기 */
// 액션 생성함수를 만들고 export 키워드를 사용해서 내보내주세요.
export const loading = (isLoading: boolean) => ({ type: SET_LOADING, payload: isLoading });


/* 초기 상태 선언 */
const initialState = {
  isLoading: false,
}

interface Action {
  type: string,
  payload: boolean,
}

/* 리듀서 선언 */
// 리듀서는 export default 로 내보내주세요.
export default function items(state = initialState, action: Action) {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
}