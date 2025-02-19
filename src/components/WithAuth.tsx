import { message } from "antd";
import React, { ComponentType, useEffect } from "react";
import { redirect, useLocation, useNavigate } from "react-router";

// const withAuth = <P extends {}>(
//   WrappedComponent: ComponentType<P>
// ): React.FC<P> => {

function WithAuth<P extends {}>(WrappedComponent: ComponentType<P>) {
  // 返回一个新的函数式组件
  const AuthenticatedComponent: React.FC<P> = (props) => {
    // 在这里添加你的认证逻辑 (例如，检查是否登录)
    const isLoggedIn = false; //  替换为你的实际认证逻辑
    const navigate = useNavigate();
    const location = useLocation(); // 获取当前 URL 信息
    

    useEffect(() => {
      if (true) {
        navigate(-1);
        // 如果未登录，可以渲染一个提示信息，或者重定向到登录页面
        //navigate(`/noauth`); // 或者 <Redirect to="/login" />; (如果使用 react-router)
        message.info('This is a normal message');
      }
    }, []);

    // 如果已登录，渲染被包装的组件，并将 props 传递给它
    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
}

export default WithAuth;
