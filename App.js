import React, {Component} from 'react';
import AppRouter from './src/approuter/AppRouter';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return <AppRouter />;
  }
}

export default App;
