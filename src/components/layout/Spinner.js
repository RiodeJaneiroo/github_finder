import React, { Fragment } from 'react';
import spinner from './spinner.gif';

const Spinner = () => (
   <Fragment>
      <img
         src={spinner}
         alt='loading...'
         style={{ width: '120px', margin: 'auto', display: 'block' }}
      />
   </Fragment>
);

export default Spinner;
