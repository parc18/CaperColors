// import { routerActions } from 'react-router-redux';
// import { connectedReduxRedirect } from 'redux-auth-wrapper/history4/redirect';
import { App, Home, NotFound, EventDescription, BookEvent, ThankYouPage, About, Vision, Refund, Privacy, Terms, PreHome } from 'containers';

// const isAuthenticated = connectedReduxRedirect({
//   redirectPath: '/login',
//   authenticatedSelector: state => state.auth.user !== null,
//   redirectAction: routerActions.replace,
//   wrapperDisplayName: 'UserIsAuthenticated'
// });

// const isNotAuthenticated = connectedReduxRedirect({
//   redirectPath: '/',
//   authenticatedSelector: state => state.auth.user === null,
//   redirectAction: routerActions.replace,
//   wrapperDisplayName: 'UserIsAuthenticated',
//   allowRedirectBack: false
// });

const routes = [
  {
    component: App,
    routes: [
      { path: '/', exact: true, component: PreHome },
      { path: '/events', exact: true, component: Home },
      { path: '/eventdetails/:eventId', component: EventDescription },
      { path: '/bookevent/:eventId', component: BookEvent },
      { path: '/thankyou', component: ThankYouPage },
      { path: '/about', component: About },
      { path: '/vision', component: Vision },
      { path: '/refund', component: Refund },
      { path: '/terms', component: Terms },
      { path: '/privacy', component: Privacy },
      { component: NotFound }
    ]
  }
];

export default routes;
