import React from 'react';
import _ from 'lodash';

export default props =>
  <tr>
    {
      _.map(props.headers, header =>
        <td>{props.item[header.name]}</td>,
      )
    }
  </tr>;
