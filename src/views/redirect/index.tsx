/** @format */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addRoles } from '@stores/app/app.actions';
import styles from './redirect.module.less';
import { LoadingOutlined } from '@ant-design/icons';
import { setInfo } from '../../permission';

type IRedirectProps = {
  history: any;
  setRole: (rules) => unknown;
};

type IRedirectState = {
  loading: boolean;
};

class RedirectView extends Component<IRedirectProps, IRedirectState> {
  private subRoles;
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }
  async componentDidMount() {
    setInfo().then(() => {
      this.props.history.push('/dashboard/index');
    });
  }
  render() {
    return (
      <div className={styles['redirect-wrap']}>
        <div className={styles['redirect-content']}>
          <LoadingOutlined />
          <br />
          <div className={styles['redirect-loading-text']}>Loading</div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    setRole: (roles: string[]) => {
      dispatch(addRoles(roles));
    },
  };
};

const mapStateToProps = () => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(RedirectView);
