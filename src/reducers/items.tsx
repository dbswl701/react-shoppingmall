/* 액션 타입 만들기 */
// Ducks 패턴을 따를땐 액션의 이름에 접두사를 넣어주세요.
// 이렇게 하면 다른 모듈과 액션 이름이 중복되는 것을 방지 할 수 있습니다.
// const LOAD = 'items/LOAD';
// const CATEGORY = 'items/CATEGORY';
enum ActionType {
  LOAD = 'items/LOAD',
  CATEGORY = 'items/CATEGORY',
}

/* 액션 생성함수 만들기 */
// 액션 생성함수를 만들고 export 키워드를 사용해서 내보내주세요.

type Item = {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: {rate: number, count: number};
  title: string;
}
export const load = (data: Item[]) => ({ type: ActionType.LOAD, payload: data });
export const category = (data: Item[]) => ({ type: ActionType.CATEGORY, payload: data });


interface Init {
  total: Item[],
  filteredList: Item[],
}

/* 초기 상태 선언 */
const initialState: Init = {
  total: [],
  filteredList: [],
}


interface Action {
  type: ActionType;
  payload: Item[];
}

/* 리듀서 선언 */
// 리듀서는 export default 로 내보내주세요.
export default function items(state = initialState, action: Action) {
  switch (action.type) {
    case ActionType.LOAD:
      return {
        ...state,
        total: action.payload,
        filteredList: action.payload,
      };
    case ActionType.CATEGORY:
      return {
        ...state,
        // selectedCategory: action.payload,
        filteredList: action.payload
      };
    default:
      return state;
  }
}