import React from 'react';
import Headers from './thead';
import Tbody from './tbody';

class Table extends React.Component {
  render() {
    return (
      <table className="table-responsive cart">
        <Headers
          headers={this.props.headers}
        />
        <Tbody
          headers={this.props.headers}
          data={this.props.data}
        />
      </table>
    );
  }
}

Table.propTypes = {
  headers: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  data: React.PropTypes.node.isRequired,
};

export default Table;
