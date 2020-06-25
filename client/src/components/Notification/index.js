import { connect } from 'react-redux';
import React from 'react';
import {
    notification
}from '../../redux/actionCreator';
import { render } from '../../../../routes/api/users';

class Notification extends React.Component {
 /**
    * Onclick request to logout
    * @function notification
    */
   notification = () => this.props.dispatch(notification());

render() {
    return(
        <Badge color="danger" pill><span>{this.props.count}</span></Badge>
    )
}
}
const mapStateToProps = (state) => {
    return {
        count: state.count
    }
}
export default connect(mapStateToProps)(Notification);