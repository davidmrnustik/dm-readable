import React, { Component } from 'react';
import { Panel, Button } from 'react-bootstrap'

class ReadableApp extends Component {
  render() {
    return (
      <div>
        <Panel header="This is the panel header">
          <p>lorem ipsum</p>
          <Button bsSize="small">My Button</Button>
        </Panel>

      </div>
    )
  }
};

export default ReadableApp;