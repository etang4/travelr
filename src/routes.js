import React from 'react';
import {IndexRoute, Route} from 'react-router';
import { isLoaded as isAuthLoaded, load as loadAuth, instagramLogin } from 'redux/modules/auth';
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
      const search = nextState.location.search;
      if (search) {
        const query = search.substring(1);
        const params = query.split('&');
        let accessToken;
        for (let index = 0; index < params.length; index++) {
          const pair = params[index].split('=');
          if (pair[0] === 'code') {
            accessToken = pair[1];
            break;
          }
        }
        // FIXME: Hacky way to access accessToken
        store.dispatch(instagramLogin(accessToken))
        .then(() =>{
          const {
            auth: {
              user
            }
          } = store.getState();

          // FIXME: Currently we assume any token is valid
          if (!user) {
            // oops, not logged in, so can't be here!
            replace('/welcome');
          }

          cb();
        });
      } else {
        const {
          auth: {
            user
          }
        } = store.getState();

        if (!user) {
          // oops, not logged in, so can't be here!
          replace('/welcome');
        }
        cb();
      }
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
