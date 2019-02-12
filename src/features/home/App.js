import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Header, Footer} from './';


/*
  This is the root component of your app. Here you define the overall layout
  and the container of the react router.
  You should adjust it according to the requirement of your app.
*/
export default class App extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  static defaultProps = {
    children: '',
  };

  render() {
    return (
      <React.Fragment>
        <CssBaseline>
          <Header/>
          <main>
            {this.props.children}
          </main>
          <Footer/>
        </CssBaseline>
      </React.Fragment>
    );
  }
}

// export default withStyles(styles)(App);

