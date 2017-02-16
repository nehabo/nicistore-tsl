import React from 'react';
import _ from 'lodash';

export default props =>
  <thead>
    <tr>
      {
        _.map(props.headers, header =>
          <th>{header.label}</th>
        )
      }
    </tr>
  </thead>;
