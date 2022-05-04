import React, { Fragment } from 'react';
import Title from '../common/Title';
import '../common/Title.css';

function Page({ title, children }) {
  return (
    <Fragment>
      <Title className="title" title={title}></Title>
      <section>{children}</section>
    </Fragment>
  );
}

export default Page;
