import * as React from 'react';
import Home from './containers/Home/Home';
import Login from './containers/Login/Login';

import './App.css';

import { connect } from 'react-redux';
import Profile from './containers/Profile/Profile';
import { getColor } from './utility/theme';
import Register from './containers/Register/Register';
import { TOGGLE_THEME } from './store/constants';
import { setTheme } from './store/actions/theme';

interface IProps {
  route: string;
  theme: string;
  setTheme: (theme: string) => {};
  toggleTheme: () => {}
}

const mapStateToProps = (state: any) => {

  return {
    route: state.route.route,
    theme: state.theme.theme
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    toggleTheme: () => dispatch({ type: TOGGLE_THEME }),
    setTheme: (theme: string) => {dispatch(setTheme(theme))}
  }
}

class App extends React.Component<IProps, {}> {

  constructor(props: IProps) {
    super(props);
    document.body.style.backgroundColor = getColor(this.props.theme, 'backgroundColor');
    document.body.style.color = getColor(this.props.theme, 'color');
  }

  public componentDidMount() {

    const theme = localStorage.getItem('theme');
    if (theme) {
      this.props.setTheme(theme);
    }
  }

  public componentDidUpdate() {
    document.body.style.backgroundColor = getColor(this.props.theme, 'backgroundColor');
    document.body.style.color = getColor(this.props.theme, 'color');
    localStorage.setItem('theme', this.props.theme);
  }

  public render() {

    let mainContent = <Login />;

    switch(this.props.route) {
      case ('REGISTER'):
          mainContent = 
          <div className = "auth-container">
            <div className = "header-button" style = {{ color: getColor(this.props.theme,'color')}} onClick = {this.props.toggleTheme}>Toggle theme</div>
            <Register />
          </div>
          break;
      case ('HOME'):
        mainContent =
        <Home />
        break;
      case ('PROFILE'):
        mainContent = 
        <Profile />;
        break;
      default:
        mainContent =           
        <div className = "auth-container">
          <div className = "header-button" style = {{ color: getColor(this.props.theme,'color')}} onClick = {this.props.toggleTheme}>Toggle theme</div>
          <Login />
        </div>;
    }

    return mainContent;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
