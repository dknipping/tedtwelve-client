//3rd party libs

import React, {Component} from "react";
import {render} from "react-dom";
import domready from "domready";
import reqwest from "reqwest";


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      users: []
    };
  }

  componentDidMount() {
    reqwest({
        url: `${window.de.daad.monitoring.BASE_URL}/users`
      , method: 'get'
      , success: function (json) {
          this.setState({users: json.users});
        }
      });
  }

  render() {

    const users = this.state.users;
    const userTags = users.map((u, i) => {
      return (<div key={i}> {u.name} </div>);
    });
    return (
      <div>
        Users:
        {userTags}
      </div>
    );
  }

}


domready(() => {
    render(
        <App />,
        document.getElementById("app")
    );
});
