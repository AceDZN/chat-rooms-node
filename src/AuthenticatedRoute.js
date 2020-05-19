import React from 'react';
import { withRouter } from 'react-router'
import { connect } from 'react-redux'

import { Route, Redirect } from 'react-router-dom';

const AuthenticatedRoute = ({component: Component, ...rest}) => {
  console.log(rest,"rest");
    return rest.userId
        ? <Route render={ props => <Component {...props} {...rest} />} />
        : <Redirect to="/" />;
};

const mapStateToProps = ({ userReducer }) => {
    return {
      userName: userReducer.userName,
      userId: userReducer.userId,
    }
  }
  export default connect(
    mapStateToProps
  )(withRouter(AuthenticatedRoute))

