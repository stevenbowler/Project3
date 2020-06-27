import { connect } from 'react-redux';
import React from 'react';
import { Badge } from 'reactstrap';

class Notification extends React.Component {

    render() {

        return (
            <Badge color="danger" pill><span>{this.props.favoritesCount}</span></Badge>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        favoritesCount: state.favoritesCount
    }
}
export default connect(mapStateToProps)(Notification);