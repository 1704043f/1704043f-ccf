import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';

class ProviderRemoveSuccessDialog extends React.Component {
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
                <p>Care group {this.props.name} has been successfully removed</p>
                <p>Click 'Done' to return to the care group menu</p>
            </DialogContent>

            <DialogActions>
                <Button color="primary" autoFocus onClick={event => this.handleClose()}>
                Done
                </Button>
            </DialogActions>

        </Dialog>
      </div>
    );
  }
}

ProviderRemoveSuccessDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
};

export default withMobileDialog()(ProviderRemoveSuccessDialog);