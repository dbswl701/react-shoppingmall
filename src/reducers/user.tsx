/* 액션 타입 만들기 */
// Ducks 패턴을 따를땐 액션의 이름에 접두사를 넣어주세요.
// 이렇게 하면 다른 모듈과 액션 이름이 중복되는 것을 방지 할 수 있습니다.
// const LOGIN = 'user/LOGIN';
// const CARTIN = 'user/CARTIN';
enum ActionType {
  LOGIN = 'user/LOGIN',
  CARTIN = 'user/CARTIN',
}

/* 액션 생성함수 만들기 */
// 액션 생성함수를 만들고 export 키워드를 사용해서 내보내주세요.
export interface CartItem {
  category: string;
  count: number;
  id: number;
  image: string;
  price: number;
  title: string
}

export const login = (uid: string) => ({ type: ActionType.LOGIN, payload: uid });
export const cartIn = (data: CartItem[]) => ({ type: ActionType.CARTIN, payload: data });
// 오잉 로그인 시 카트 이 정보도 들고와야겠네.... 와우....

/* 초기 상태 선언 */
interface Init {
  uid: string;
  carts: CartItem[];
}
const initialState: Init = {
  uid: '',
  carts: [],
}

interface Action {
  type: ActionType,
  payload: {
    uid: string,
    cart: CartItem[],
  }
}

/* 리듀서 선언 */
// 리듀서는 export default 로 내보내주세요.
export default function user(state = initialState, action: Action) {
  switch (action.type) {
    case ActionType.LOGIN:
      return {
        ...state,
        uid: action.payload.uid,
      };
    case ActionType.CARTIN:
      return {
        ...state, // uid 는 그대로
        carts: action.payload.cart,
      };
    default:
      return state;
  }
}