import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  SetStateAction,
  Dispatch,
} from "react";
import { useNavigate, useLocation } from "react-router";
import { SaTokenInfo, Users } from "../openapi";
import { usersControllerApi } from "../services/request";

interface ContextType {
  isLogin: boolean;
  setIsLogin: Dispatch<SetStateAction<boolean>>;
  saTokenInfo: SaTokenInfo;
  setSaTokenInfo: Dispatch<SetStateAction<SaTokenInfo>>;
}

// 创建 AuthContext
export const AuthContext = createContext<ContextType>({} as ContextType);

interface Props {
  children?: React.ReactNode;
}

// 创建 AuthProvider 组件
export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [saTokenInfo, setSaTokenInfo] = useState({} as SaTokenInfo); // null 表示未登录
  const [isLogin, setIsLogin] = useState(false); // 初始化为 loading
  const navigate = useNavigate();
  const location = useLocation();

  const readUserInfoFromLocalStorage = () => {
    if (localStorage.getItem("saTokenInfo")) {
      const _saTokenInfo = JSON.parse(
        localStorage.getItem("saTokenInfo") as string
      );
      setSaTokenInfo({ ..._saTokenInfo });
      console.log(localStorage.getItem("saTokenInfo"));
      return false;
    }
    return true;
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await usersControllerApi.isLogin();
        const { statusCodeValue, data }: any = res.data;
        console.log(statusCodeValue, data);
        if (statusCodeValue == 200) {
          setIsLogin(data);
          readUserInfoFromLocalStorage();
        }
      } catch (error) {
        console.log(error);
      }
    })();
    //
  }, []);

  useEffect(() => {

    const validResult = readUserInfoFromLocalStorage();

    //console.log("(!isLogin || validResult)", !isLogin, validResult);

    if (!isLogin && validResult && !location.pathname.startsWith("/login")) {
      // 如果未登录，可以渲染一个提示信息，或者重定向到登录页面
      navigate(`/login?redireact=${location.pathname}`); // 或者 <Redirect to="/login" />; (如果使用 react-router)
    }
    //setHistory([...history, location.pathname]);
  }, [location.pathname]);

  // 传递给子组件的值
  const value = {
    isLogin, // 添加 loading 状态
    setIsLogin,
    saTokenInfo,
    setSaTokenInfo,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
