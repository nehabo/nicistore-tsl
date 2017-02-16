import React from 'react';
import _ from 'lodash';
import Button from '../input/button';

class Options extends React.Component {
  render() {
    return (
      <div>
        {
          _.map(this.props.options, item =>
            <Button
              wrapperClass="compact"
              className="optionButtons"
              onClick={() => this.props.onSelect(item)}
              key={item.id}
            >
              {item.name}
            </Button>)
        }
      </div>
    );
  }
}

export default Options;
