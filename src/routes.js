import React from 'react';
import {IndexRoute, Route} from 'react-router';
import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
import {
    About,
    App,
    Chat,
    Home,
    Login,
    LoginSuccess,
    NotFound,
    Pagination,
    Signup,
    Welcome,
    Widgets,
  } from 'containers';

export default (store) => {
  const requireLogin = (nextState, replace, cb) => {
    function checkAuth() {
      const { auth: { user }} = store.getState();
      if (!user) {
        // oops, not logged in, so can't be here!
        replace('/welcome');
      }
      cb();
    }

    if (!isAuthLoaded(store.getState())) {
      store.dispatch(loadAuth()).then(checkAuth);
    } else {
      checkAuth();
    }
  };

  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route path="/" component={App}>
      { /* Home (main) route */ }
      <IndexRoute component={Home} onEnter={requireLogin}/>

      { /* Routes requiring login */ }
      <Route onEnter={requireLogin}>
        <Route path="about" component={About}/>
        <Route path="chat" component={Chat}/>
        <Route path="loginSuccess" component={LoginSuccess}/>
        <Route path="pagination" component={Pagination}/>
        <Route path="widgets" component={Widgets}/>
      </Route>

      { /* Routes */ }
      <Route path="welcome" component={Welcome}/>
      <Route path="login" component={Login}/>
      <Route path="signup" component={Signup}/>

      { /* Catch all route */ }
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
