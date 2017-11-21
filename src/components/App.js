import React, { Component } from 'react';
import { Panel, Button } from 'react-bootstrap';
import { connect } from 'react-redux';

class ReadableApp extends Component {
  render() {
    const { categories, isFetching } = this.props;

    return (
      <div>
        <Panel header="This is the panel header">
          <p>lorem ipsum</p>
          <Button bsSize="small">My Button</Button>
        </Panel>
        {!isFetching && categories.map(c=>(
          <p key={c.path}>{c.name}</p>
        ))}

      </div>
    )
  }
};

function mapStateToProps({ categories }) {
  return {
    categories: categories.items,
    isFetching: categories.isFetching
  }
}

export default connect(mapStateToProps)(ReadableApp);