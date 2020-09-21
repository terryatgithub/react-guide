import React, { useEffect } from 'react';
import BottomNav from "@/components/BottomNav";
import '@/static/iconfont/iconfont.css'

interface BasicLayoutProps {}

//组件复合的方式
const BasicLayout: React.FC<BasicLayoutProps> = props => {
  const { children } = props;
  useEffect(() => {}, []);
  return (
    <div>
      <article>{children}</article>
      <BottomNav />
    </div>
  );
};
export default BasicLayout;
