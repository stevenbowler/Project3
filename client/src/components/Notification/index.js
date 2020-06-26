import { connect } from 'react-redux';
import React from 'react';
import {
    notification
}from '../../redux/actionCreator';
import { Badge } from 'reactstrap';

class Notification extends React.Component {
    // export function notification(props) {

 /**
    * Onclick request to logout
    * @function notification
    */
   notification = () => this.props.dispatch(notification());

   render(){
       if(this.props.count>0){
    return(
        <Badge color="danger" pill><span>{this.props.count}</span></Badge>
    )
}
   else{
       return null
   }
}
}
const mapStateToProps = (state) => {
    return {
        count: state.count
    }
}
export default connect(mapStateToProps)(Notification);