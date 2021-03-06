import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';

class EnrollFormSuccessDialog extends React.Component {
  state = {
    open: true
  };

  handleClose = () => {
    this.setState({ open: false });
    
  };

  render() {
    const { fullScreen } = this.props;

    return (
      <div>

        <Dialog
          fullScreen={fullScreen}
          open={this.state.open}
          disableBackdropClick 
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >

            <DialogTitle id="responsive-dialog-title">Success!</DialogTitle>

            <DialogContent>
                <p>New provider Dr. {this.props.name} successfully enrolled with the following details:</p>
                <table>
                    <tbody>
                        <tr><td>Name: </td><td>{this.props.name}</td></tr>
                        <tr><td>Role: </td><td>{this.props.role}</td></tr>
                        <tr><td>Office: </td><td>{this.props.office}</td></tr>
                        <tr><td>CareGroup: </td><td>{this.props.group}</td></tr>
                        <tr><td> </td></tr>
                        <tr><td>Email: </td><td>{this.props.email}</td></tr>
                        <tr><td>Office phone: </td><td>{this.props.phone}</td></tr>
                    </tbody>
                </table>
                <p>Click 'Done' to return to dashboard, 'Create Diary' to create a new diary exercise for this patient</p>
            </DialogContent>

            <DialogActions>
                <Button color="primary" autoFocus component={Link} to='/admin/dashboard'>
                Done
                </Button>
            </DialogActions>

        </Dialog>
      </div>
    );
  }
}

EnrollFormSuccessDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
};

export default withMobileDialog()(EnrollFormSuccessDialog);