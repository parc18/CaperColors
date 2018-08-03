import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import cookie from 'js-cookie';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { push } from 'react-router-redux';
import { renderRoutes } from 'react-router-config';
import { provideHooks } from 'redial';
import Alert from 'react-bootstrap/lib/Alert';
import Helmet from 'react-helmet';
import { isHomeLoaded as isHomeFilled, getEventsBycityId as fillHome } from 'redux/modules/home';
import { isLoaded as isAuthLoaded, load as loadAuth, logout } from 'redux/modules/auth';
import { Notifs } from 'components';
import config from 'config';
import city from '../../helpers/cities';
@provideHooks({
  fetch: async ({ store: { dispatch, getState } }) => {
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
    notifs: state.notifs
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
    currentCity: city[cookie.get('city')] || 'All Cities',
    listOpen: false
  };
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }
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
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
  handleClickOutside = () => {
    this.setState({
      listOpen: false
    });
  }
  handleScroll = () => {
    this.setState({
      listOpen: false
    });
  }
  handleLogout = event => {
    event.preventDefault();
    this.props.logout();
  };
  changeCity = (id, citySelected) => {
    cookie.set('city', id, 30);
    this.setState({ currentCity: citySelected });
    this.setState({
      listOpen: false
    });
    this.context.store.dispatch(fillHome(id)).catch(() => null);
  };
  toggleList() {
    this.setState(prevState => ({
      listOpen: !prevState.listOpen
    }));
  }
  render() {
    const { notifs, route } = this.props;
    const styles = require('./App.scss');
    return (
      <div className={styles.app}>
        <Helmet {...config.app.head} />
        <header className={styles.head}>
          <div className={styles.imgLogo}> <img src="http://res.cloudinary.com/parc-india/image/upload/c_scale,w_29/v1528536871/mjbfldjaluptlybuzetr.png" alt="khelacademy logo" /> </div>
          <div className={styles.oval} />
          <div className={styles.dDWrapper} onBlur={this.handleClickOutside}>
            <div className={styles.dDHeader}>
              <div className="dd-header-title" onClick={() => this.toggleList()} role="presentation">{this.state.currentCity}
                {this.state.listOpen
                  ? <i className={`${styles.arrow} fa }`}>&#xf106;</i>
                  : <i className={`${styles.arrow} fa }`}>&#xf107;</i>
                }
              </div>
            </div>
            {this.state.listOpen &&
              <ul className={styles.dDList}>
                <li className="dd-list-item" onClick={() => this.changeCity(0, 'All Cities')} role="presentation"> All Cities</li>
                <li className="dd-list-item" onClick={() => this.changeCity(1, 'New Delhi')} role="presentation"> New Delhi</li>
                <li className="dd-list-item" onClick={() => this.changeCity(2, 'Haryana (Gurgaon)')} role="presentation">Haryana (Gurgaon)</li>
                <li className="dd-list-item" onClick={() => this.changeCity(3, 'Uttar Pradesh (Ghaziabad)')} role="presentation">Uttar Pradesh (Ghaziabad)</li>
                <li className="dd-list-item" onClick={() => this.changeCity(5, 'Bangalore')} role="presentation">Bangalore</li>
                <li className="dd-list-item" onClick={() => this.changeCity(4, 'Uttar Pradesh (Noida)')} role="presentation">Uttar Pradesh (Noida)</li>
                <li className="dd-list-item" onClick={() => this.changeCity(6, 'Uttar Pradesh (Greater Noida)')} role="presentation">Uttar Pradesh (Greater Noida)</li>
              </ul>
            }
          </div>
          <div className={styles.menuIcon}> <i className={`${styles.faCaperMenu} ${styles.faCapermenuBar} ${styles.caperMenu}`} /> </div>
        </header>

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
