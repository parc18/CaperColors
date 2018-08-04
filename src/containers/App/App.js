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
import { isHomeLoaded as isHomeFilled, getEventsBycityId as fillHome } from 'redux/modules/home';
import { isLoaded as isAuthLoaded, load as loadAuth, logout } from 'redux/modules/auth';
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
    logout: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired
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
    const { route } = this.props;
    const styles = require('./App.scss');
    return (
      <div className={styles.app}>
        <Helmet {...config.app.head} />
        <header className={styles.head}>
          <IndexLinkContainer to="/">
            <div className={styles.imgLogo}>
              {' '}
              <img src="http://res.cloudinary.com/parc-india/image/upload/c_scale,w_29/v1528536871/mjbfldjaluptlybuzetr.png" alt="khelacademy logo" />{' '}
            </div>
          </IndexLinkContainer>
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
                <li className="dd-list-item" onClick={() => this.changeCity(0, 'All Cities')} role="presentation">
                  {' '}
                  All Cities
                </li>
                <li className="dd-list-item" onClick={() => this.changeCity(1, 'New Delhi')} role="presentation">
                  {' '}
                  New Delhi
                </li>
                <li className="dd-list-item" onClick={() => this.changeCity(2, 'Haryana (Gurgaon)')} role="presentation">
                  Haryana (Gurgaon)
                </li>
                <li className="dd-list-item" onClick={() => this.changeCity(3, 'Uttar Pradesh (Ghaziabad)')} role="presentation">
                  Uttar Pradesh (Ghaziabad)
                </li>
                <li className="dd-list-item" onClick={() => this.changeCity(5, 'Bangalore')} role="presentation">
                  Bangalore
                </li>
                <li className="dd-list-item" onClick={() => this.changeCity(4, 'Uttar Pradesh (Noida)')} role="presentation">
                  Uttar Pradesh (Noida)
                </li>
                <li className="dd-list-item" onClick={() => this.changeCity(6, 'Uttar Pradesh (Greater Noida)')} role="presentation">
                  Uttar Pradesh (Greater Noida)
                </li>
              </ul>
            )}
          </div>
        </header>
        <div className={styles.menuIcon} onClick={() => this.toggleMenu()} role="presentation">
          {' '}
          {!this.state.menuOpen ? <i className={`${styles.faCaperMenu} ${styles.faCapermenuBar} ${styles.caperMenu}`} /> : <i className={`${styles.cross} fa }`}>&times;</i>}
          {' '}
        </div>
        <div className={styles.appContent}>
          {renderRoutes(route.routes)}
        </div>
        {this.state.menuOpen &&
          <div className={styles.overlay}>
            <div className={styles.NotlowerOveray}>
              <div className={styles.overlayContent}>
                <div className={styles.oval2} />
                <div className={styles.organiser}> Organizers  &nbsp; &nbsp; &nbsp; &#8594;</div>
              </div>
              <div className={styles.overlayContent2}>
                <div className={styles.oval2} />
                <div className={styles.Sponsers}> Sponsers  &nbsp; &nbsp; &nbsp; &#8594;</div>
              </div>
              <IndexLinkContainer to="/about" onClick={() => this.toggleMenu()}>
                <div className={styles.menuHeaderItems}> <div className={styles.ovalLast} /> About Us</div>
              </IndexLinkContainer>
              <IndexLinkContainer to="/vision" onClick={() => this.toggleMenu()}>
                <div className={styles.menuHeaderItems}> <div className={styles.ovalLast} />Our Vision</div>
              </IndexLinkContainer>
              <IndexLinkContainer to="/refund" onClick={() => this.toggleMenu()}>
                <div className={styles.menuHeaderItems}> <div className={styles.ovalLast} />Cancellations and Refund Policy</div>
              </IndexLinkContainer>
              <IndexLinkContainer to="/privacy" onClick={() => this.toggleMenu()}>
                <div className={styles.menuHeaderItems}> <div className={styles.ovalLast} />Privacy Policy</div>
              </IndexLinkContainer>
              <IndexLinkContainer to="/terms" onClick={() => this.toggleMenu()}>
                <div className={styles.menuHeaderItems}> <div className={styles.ovalLast} />Terms of Service</div>
              </IndexLinkContainer>
            </div>
          </div>
        }
      </div>
    );
  }
}
