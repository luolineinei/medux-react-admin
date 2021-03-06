import 'assets/css/global.m.less';
import 'assets/css/override.less';
import 'moment/locale/zh-cn';

import {ConfigProvider} from 'antd';
import NotFound from 'components/NotFound';
import React from 'react';
import {Switch} from '@medux/react-web-router';
import {connect} from 'react-redux';
import moment from 'moment';
import zhCN from 'antd/es/locale/zh_CN';
import GlobalLoading from '../GlobalLoading';
import LoginPage from '../LoginPage';
import LoginPop from '../LoginPop';
import RegisterPage from '../RegisterPage';
import RegisterPop from '../RegisterPop';
import RegistrationAgreement from '../RegistrationAgreement';

moment.locale('zh-cn');

const AdminLayout = loadView('adminLayout', 'main');
const ArticleLayout = loadView('articleLayout', 'main');

interface StoreProps {
  routeViews: RouteViews;
}

const Component: React.FC<StoreProps & DispatchProp> = ({routeViews}) => {
  // eslint-disable-next-line no-restricted-globals
  const title = `@Medux-${pageNames[location.pathname] || document.title || pageNames['/']}`;
  React.useEffect(() => {
    document.title = title;
  }, [title]);
  return (
    <ConfigProvider locale={zhCN}>
      <Switch elseView={<NotFound />}>
        {routeViews.app?.loginPage && <LoginPage />}
        {routeViews.app?.registerPage && <RegisterPage />}
        {routeViews.adminLayout?.main && <AdminLayout />}
        {routeViews.articleLayout?.main && <ArticleLayout />}
      </Switch>
      <GlobalLoading />
      <RegisterPop />
      <RegistrationAgreement />
      <LoginPop />
    </ConfigProvider>
  );
};

const mapStateToProps: (state: RootState) => StoreProps = (state) => {
  return {
    routeViews: state.route.data.views,
  };
};

export default connect(mapStateToProps)(React.memo(Component));
