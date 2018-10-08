import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import cookie from 'js-cookie';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { IndexLinkContainer } from 'react-router-bootstrap';
import { push } from 'react-router-redux';
import { renderRoutes } from 'react-router-config';
import { provideHooks } from 'redial';
import Helmet from 'react-helmet';
import ReactGA from 'react-ga';
import { isHomeLoaded as isHomeFilled, getEventsBycityId as fillHome } from 'redux/modules/home';
import { isCityLoaded as isCityFilled, getCities as fillCities } from 'redux/modules/city';
import { isLoaded as isAuthLoaded, load as loadAuth, logout } from 'redux/modules/auth';
import config from 'config';
// import city from '../../helpers/cities';
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
    if (!isCityFilled(getState())) {
      await dispatch(fillCities()).catch(() => null);
    }
  }
})
@connect(
  state => ({
    notifs: state.notifs,
    home: state.home,
    city: state.city
  }),
  { logout, pushState: push }
)
@withRouter
export default class App extends Component {
  static propTypes = {
    route: PropTypes.objectOf(PropTypes.any).isRequired,
    location: PropTypes.objectOf(PropTypes.any).isRequired,
    logout: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired,
    city: PropTypes.objectOf(PropTypes.any).isRequired
  };
  static contextTypes = {
    store: PropTypes.object.isRequired
  };
  state = {
    currentCity: this.props.city[cookie.get('city')] || 'All Cities',
    listOpen: false,
    // pageType: this.props.home.pageType,
    city: this.props.city.data
  };
  componentDidMount() {
    ReactGA.initialize('UA-127069494-1');
    ReactGA.pageview(window.location.pathname + window.location.search);
    window.addEventListener('scroll', this.handleScroll);
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
      listOpen: false,
      menuOpen: false
    });
  };
  handleScroll = () => {
    this.setState({
      listOpen: false
    });
  };
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
  toggleMenu() {
    this.setState(prevState => ({
      menuOpen: !prevState.menuOpen
    }));
  }
  render() {
    const { route, location } = this.props;
    const styles = require('./App.scss');
    return (
      <div className={styles.app}>
        <Helmet {...config.app.head} />
        <header className={styles.head}>
          <IndexLinkContainer to="/">
            <div className={styles.imgLogo}>
              {' '}
              <img src="https://res.cloudinary.com/parc-india/image/upload/c_scale,w_29/v1528536871/mjbfldjaluptlybuzetr.png" alt="khelacademy logo" />{' '}
            </div>
          </IndexLinkContainer>
          {location.pathname === '/' && (
            <div className={styles.cityCont}>
              <div className={styles.oval} />
              <div className={styles.dDWrapper} onBlur={this.handleClickOutside}>
                <div className={styles.dDHeader}>
                  <div className="dd-header-title" onClick={() => this.toggleList()} role="presentation">
                    {this.state.currentCity}
                    {this.state.listOpen ? <i className={`${styles.arrow} fa }`}>&#xf106;</i> : <i className={`${styles.arrow} fa }`}>&#xf107;</i>}
                  </div>
                </div>
                {this.state.listOpen && (
                  <ul className={styles.dDList}>
                    <li className="dd-list-item" key={0} onClick={() => this.changeCity(0, 'All Cities')} role="presentation">
                      {' '}
                      All Cities
                    </li>

                    {Object.keys(this.state.city).map((index, item) => {
                      if (typeof item !== 'undefined') {
                        return (
                          <li className="dd-list-item" key={index} onClick={() => this.changeCity(this.state.city[index].cityId, this.state.city[index].cityName)} role="presentation">
                            {' '}
                            {this.state.city[index].cityName}
                          </li>
                        );
                      }
                      return null;
                    })}
                  </ul>
                )}
              </div>
            </div>
          )}
          {location.pathname !== '/' && <div className={styles.mainText}> Khelacademy </div>}
        </header>
        <div className={styles.menuIcon} onClick={() => this.toggleMenu()} role="presentation">
          {' '}
          {!this.state.menuOpen ? <i className={`${styles.faCaperMenu} ${styles.faCapermenuBar} ${styles.caperMenu}`} /> : <i className={`${styles.cross} fa }`}>&times;</i>}{' '}
        </div>
        <div className={styles.appContent}>{renderRoutes(route.routes)}</div>
        {this.state.menuOpen && (
          <div className={styles.overlay}>
            <div className={styles.NotlowerOveray}>
              <div className={styles.overlayContent} />
              <div className={styles.overlayContent2} />
              <IndexLinkContainer to="/about" onClick={() => this.toggleMenu()}>
                <div className={styles.menuHeaderItems}>
                  {' '}
                  <div className={styles.ovalLast} /> About Us
                </div>
              </IndexLinkContainer>
              <IndexLinkContainer to="/vision" onClick={() => this.toggleMenu()}>
                <div className={styles.menuHeaderItems}>
                  {' '}
                  <div className={styles.ovalLast} />
                  Our Vision
                </div>
              </IndexLinkContainer>
              <IndexLinkContainer to="/refund" onClick={() => this.toggleMenu()}>
                <div className={styles.menuHeaderItems}>
                  {' '}
                  <div className={styles.ovalLast} />
                  Cancellations and Refund Policy
                </div>
              </IndexLinkContainer>
              <IndexLinkContainer to="/privacy" onClick={() => this.toggleMenu()}>
                <div className={styles.menuHeaderItems}>
                  {' '}
                  <div className={styles.ovalLast} />
                  Privacy Policy
                </div>
              </IndexLinkContainer>
              <IndexLinkContainer to="/terms" onClick={() => this.toggleMenu()}>
                <div className={styles.menuHeaderItems}>
                  {' '}
                  <div className={styles.ovalLast} />
                  Terms of Service
                </div>
              </IndexLinkContainer>
            </div>
          </div>
        )}
      </div>
    );
  }
}
