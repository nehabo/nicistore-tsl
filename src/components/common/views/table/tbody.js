import React from 'react';
import _ from 'lodash';
import Row from './row';

export default props =>
  <tbody>
    {
      _.map(props.data, item =>
        <Row key={item.index} item={item} {...props} />,
      )
    }
  </tbody>;
