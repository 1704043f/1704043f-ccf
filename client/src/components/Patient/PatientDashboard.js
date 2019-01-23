import React, { Component } from 'react';
import { Link, Redirect,withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import propTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';
import QuestionForm from './QuestionForm';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },

    flex: {
        flexGrow: 1,
    },

    welcomeText: {
        marginRight: 20,
    },

    menuButton: {
        '&:hover': {
            backgroundColor: "#1a242b",
        },
        hover: {},
    },
    fullScreen :  {
        display: 'flex',
        minHeight : '1280px',
        justifyContent : 'center',
        height: "100%"
    },
    promptMessage : {
        marginTop : '30px',
    }
});

class PatientDashboard extends Component {
    state= {
        redirect : false
    }
    render () {
        const { handleSubmit, classes, pristine, submitting, patientData, auth} = this.props;
        const { redirect } = this.state;
        //console.log("patient data in patient dashboard : ", this.props.patientData);

        if (redirect) {
            const url = `/patient/complete`
            return <Redirect to={url} no_survey={true}/>;
        }
        return (
            auth.isAuthenticated === true ?
                <Typography component='div' className={classes.fullScreen} >
                    <div>
                        {(!_.isEmpty(patientData.closest) && patientData.closest.in_future === false) ?
                            <div>
                                <h2>You are filling in diary for : {moment(patientData.closest.scheduled_datetime).format("MM-DD-YYYY")} {moment(patientData.closest.time, "HHmm").format("hh:mma")}</h2>
                                <Divider />
                                <Typography component='div'>
                                    <QuestionForm  {...this.props} dataEntry={this.state.closestDateTime} arrQuestions={this.props.patientData.currentEpisode ? this.props.patientData.currentEpisode.questions : null} />
                                </Typography>
                                <Divider />
                            </div>

                            :
                            <div>
                                <Typography component='div' variant='headline' className={classes.promptMessage}>
                                    {(!_.isEmpty(patientData.closest) && patientData.closest.in_future) ?
                                        <div>
                                            Your next entry is at {moment(patientData.closest.scheduled_datetime).format("MM-DD-YYYY")} {moment(patientData.closest.time, "HHmm").format("hh:mma")}. <br />
                                            Check in later!
                                    </div>
                                        :
                                        <div>
                                        {patientData.currentEpisode ?
                                            <div>
                                                You do not have any diary due at this time. Please check back soon!
                                            </div>
                                            :
                                            <div>
                                                Please contact your physician to start a new diary!
                                            </div>

                                        }

                                        </div>
                                    }

                                </Typography>
                            </div>
                        }
                    </div>
                </Typography >
            :
                <Redirect to='/' />
        );
    }
}

function mapStateToProps(state){
    //console.log("state in patient dashboard : ", state);
    return {
        currentEpisode: state.patientData.currentEpisode,
        patientData : state.patientData,
        auth : state.auth
    }
}
PatientDashboard.propTypes = {
    classes : propTypes.object.isRequired,
    history: propTypes.shape({
        push: propTypes.func.isRequired
        }).isRequired,
}

PatientDashboard = connect(mapStateToProps)(PatientDashboard);
PatientDashboard = withRouter(PatientDashboard);
PatientDashboard = withStyles(styles)(PatientDashboard);

export default PatientDashboard;
