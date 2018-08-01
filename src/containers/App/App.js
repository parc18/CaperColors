import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import cookie from 'js-cookie';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { push } from 'react-router-redux';
import { renderRoutes } from 'react-router-config';
import { provideHooks } from 'redial';
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';
import Navbar from 'react-bootstrap/lib/Navbar';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import Alert from 'react-bootstrap/lib/Alert';
import Helmet from 'react-helmet';
import { isHomeLoaded as isHomeFilled, getEventsBycityId as fillHome } from 'redux/modules/home';
import { isLoaded as isAuthLoaded, load as loadAuth, logout } from 'redux/modules/auth';
import { Notifs } from 'components';
import config from 'config';
import city from '../../helpers/cities';

@provideHooks({
  fetch: async ({ store: { dispatch, getState, providers } }) => {
    console.log(providers);
    if (!isAuthLoaded(getState())) {
      await dispatch(loadAuth()).catch(() => null);
    }
    if (!isHomeFilled(getState())) {
      if (cookie.get('city')) {
        await dispatch(fillHome(cookie.get('city'))).catch(() => null);
      } else {
        cookie.set('city', -1, 30);
        await dispatch(fillHome(-1)).catch(() => null);
      }
    }
  }
})
@connect(
  state => ({
    notifs: state.notifs,
    user: state.auth.user
  }),
  { logout, pushState: push }
)
@withRouter
export default class App extends Component {
  static propTypes = {
    route: PropTypes.objectOf(PropTypes.any).isRequired,
    location: PropTypes.objectOf(PropTypes.any).isRequired,
    user: PropTypes.shape({
      email: PropTypes.string
    }),
    notifs: PropTypes.shape({
      global: PropTypes.array
    }).isRequired,
    logout: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired
  };

  static defaultProps = {
    user: null
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };
  state = {
    currentCity: city[cookie.get('city')] || 'All Cities'
  };
  componentWillReceiveProps(nextProps) {
    if (!this.props.user && nextProps.user) {
      // login
      const redirect = this.props.location.query && this.props.location.query.redirect;
      this.props.pushState(redirect || '/login-success');
    } else if (this.props.user && !nextProps.user) {
      // logout
      this.props.pushState('/');
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  handleLogout = event => {
    event.preventDefault();
    this.props.logout();
  };
  changeCity = (id, citySelected) => {
    cookie.set('city', id, 30);
    this.setState({ currentCity: citySelected });
    this.context.store.dispatch(fillHome(id)).catch(() => null);
  };
  render() {
    const { user, notifs, route } = this.props;
    const styles = require('./App.scss');
    return (
      <div className={styles.app}>
        <Helmet {...config.app.head} />
        <Navbar fixedTop>
          <Navbar.Header className={styles.Allheader}>
            <ButtonToolbar className={styles.cityDropDown}>
              <DropdownButton title={this.state.currentCity} pullRight id="bg-nested-dropdown">
                <MenuItem eventKey="0" onClick={() => this.changeCity(0, 'All Cities')}>
                  All Cities
                </MenuItem>
                <MenuItem eventKey="1" onClick={() => this.changeCity(1, 'Delhi')}>
                  Delhi
                </MenuItem>
                <MenuItem eventKey="2" onClick={() => this.changeCity(2, 'Pune')}>
                  Pune
                </MenuItem>
                <MenuItem eventKey="3" onClick={() => this.changeCity(3, 'Bangalore')}>
                  Bangalore
                </MenuItem>
                <MenuItem eventKey="3" onClick={() => this.changeCity(4, 'Mumbai')}>
                  Mumbai
                </MenuItem>
              </DropdownButton>
            </ButtonToolbar>
            <Navbar.Brand>
              <IndexLinkContainer to="/" activeStyle={{ color: '#33e0ff' }} className={styles.title}>
                <div className={styles.brand}>
                  <span>{config.app.title}</span>
                </div>
              </IndexLinkContainer>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>

          <Navbar.Collapse>
            <Nav navbar>
              {user && (
                <LinkContainer to="/chat-feathers">
                  <NavItem>Chat with Feathers</NavItem>
                </LinkContainer>
              )}
              <LinkContainer to="/about">
                <NavItem>About Us</NavItem>
              </LinkContainer>
              <LinkContainer to="/vision">
                <NavItem>Our Vision</NavItem>
              </LinkContainer>
              <LinkContainer to="/refund">
                <NavItem>CANCELLATION AND REFUND POLICY</NavItem>
              </LinkContainer>
              <LinkContainer to="/privacy">
                <NavItem>PRIVACY POLICY</NavItem>
              </LinkContainer>
              <LinkContainer to="/terms">
                <NavItem>TERMS OF SERVICE</NavItem>
              </LinkContainer>
            </Nav>
            {user && (
              <p className="navbar-text">
                Logged in as <strong>{user.email}</strong>.
              </p>
            )}
          </Navbar.Collapse>
        </Navbar>

        <div className={styles.appContent}>
          {notifs.global && (
            <div className="">
              <Notifs className={styles.notifs} namespace="global" NotifComponent={props => <Alert bsStyle={props.kind}>{props.message}</Alert>} />
            </div>
          )}

          {renderRoutes(route.routes)}
        </div>
      </div>
    );
  }
}
