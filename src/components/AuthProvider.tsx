import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  SetStateAction,
  Dispatch,
} from "react";
import { useNavigate, useLocation } from "react-router";
import { BiUser } from "../openapi";

interface ContextType {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  user: BiUser;
  setUser: Dispatch<SetStateAction<BiUser>>;
}

// 创建 AuthContext
export const AuthContext = createContext<ContextType>({} as ContextType);

interface Props {
  children?: React.ReactNode;
}

// 创建 AuthProvider 组件
export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState({} as BiUser); // null 表示未登录
  const [loading, setLoading] = useState(true); // 初始化为 loading
  const navigate = useNavigate();
  const location = useLocation();

  const readUserInfoFromLocalStorage = () => {
    if (localStorage.getItem("user")) {
      const _user = JSON.parse(localStorage.getItem("user") as string);
      setUser({ ..._user });
      setLoading(false);
      console.log(localStorage.getItem("user"));
      return false;
    }
    return true;
  };

  useEffect(() => {
    readUserInfoFromLocalStorage();
  }, []);

  useEffect(() => {
    const validResult = readUserInfoFromLocalStorage();

    //console.log(validResult, !loading, user);

    if ((loading && user && validResult) && !location.pathname.startsWith("/login")) {
      // 如果未登录，可以渲染一个提示信息，或者重定向到登录页面
      navigate(`/login?redireact=${location.pathname}`); // 或者 <Redirect to="/login" />; (如果使用 react-router)
    }
    //setHistory([...history, location.pathname]);
  }, [location.pathname]);

  // 传递给子组件的值
  const value = {
    loading, // 添加 loading 状态
    setLoading,
    user,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
