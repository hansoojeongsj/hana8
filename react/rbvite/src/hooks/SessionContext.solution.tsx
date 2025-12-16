import {
  createContext,
  use,
  useReducer,
  useRef,
  type PropsWithChildren,
  type RefObject,
} from 'react';
import type { LoginHandler } from '../components/Login';
export type ItemType = {
  id: number;
  name: string;
  price: number;
  isSoldOut?: boolean;
};
export type LoginUser = { id: number; name: string; age: number };
export type Session = {
  loginUser: LoginUser | null;
  cart: ItemType[];
};
export type LoginFunction = (name: string, age: number) => void;

const DefaultSession = {
  // loginUser: null,
  loginUser: { id: 1, name: 'Hong', age: 33 },
  cart: [
    { id: 100, name: '라면', price: 3000 },
    { id: 101, name: '컵라면', price: 2000 },
    { id: 200, name: '파', price: 5000 },
  ],
};

type SessionContextValue = {
  session: Session;
  login: LoginFunction;
  logout: () => void;
  loginHandlerRef: RefObject<LoginHandler | null> | null;
  removeItem: (id: number) => void;
  saveItem: (item: ItemType) => void;
};

// 1. createContext
const SessionContext = createContext<SessionContextValue>({
  session: DefaultSession,
  login: () => {},
  logout: () => {},
  loginHandlerRef: null,
  removeItem: () => {},
  saveItem: () => {},
});

// payload 옵셔널로 안 쓰는게 좋음 
type Action =
  | { type: 'LOGIN'; payload: LoginUser }
  | { type: 'LOGOUT' }
  | { type: 'REMOVE_ITEM'; payload: number }
  | { type: 'SAVE_ITEM'; payload: ItemType };

const sessionReducer = (state: Session, action: Action): Session => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, loginUser: action.payload };

    case 'LOGOUT':
      return { ...state, loginUser: null };

    case 'REMOVE_ITEM':
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };

    case 'SAVE_ITEM': {
      const { id, name, price } = action.payload;
      const exists = id && state.cart.find((item) => item.id === id);

      if (exists) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === id ? { id, name, price } : item
          ),
        };
      }

      const newItem = {
        id: Math.max(...state.cart.map((item) => item.id), 0) + 1,
        name,
        price,
      };

      return { ...state, cart: [...state.cart, newItem] };
    }

    default:
      return state;
  }
};

// 2. Provider
export function SessionProvider({ children }: PropsWithChildren) {
  const [session, dispatch] = useReducer(sessionReducer, DefaultSession);

  const loginHandlerRef = useRef<LoginHandler>(null);

  const login: LoginFunction = (name, age) => {
    if (!loginHandlerRef.current?.validate()) return;

    dispatch({
      type: 'LOGIN',
      payload: { id: 1, name, age },
    });
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const removeItem = (id: number) => {
    if (!confirm('Are u sure?')) return;
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const saveItem = (item: ItemType) => {
    dispatch({ type: 'SAVE_ITEM', payload: item });
  };

  return (
    <SessionContext.Provider
      value={{
        session,
        login,
        logout,
        loginHandlerRef,
        removeItem,
        saveItem,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}

// 3. useCounter
export const useSession = () => use(SessionContext);
