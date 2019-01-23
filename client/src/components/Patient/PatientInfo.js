import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import { Grid, Divider } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
const styles = theme => ({
    statsContainer: {
        width: 'auto',
    },
    oddContainer : {
        backgroundColor : 'lightgray',
        padding : '20px 20px',
    },
    evenContainer: {
        backgroundColor: 'floralwhite',
        padding: '20px 20px',
    },
});
class PatientStats extends Component {

    componentDidMount() {
    };
    renderField =(label, value, style) => {
        return (
            <React.Fragment>
                <Grid item sm={6} md={6} lg={6} xl={6} className={style}>
                    <label>{label}</label>
                </Grid>
                <Grid item sm={6} md={6} lg={6} xl={6} className={style}>
                    <label>{value}</label>
                </Grid>
                <Grid item sm={12} md={12} lg={12} xl={12}>
                    <Divider />
                </Grid>
            </React.Fragment>
        )
    }
    renderPatientPersonalInfo = (user) => {

        return(
            user.details ?
            <Grid container justify='center' alignItems='center' direction='row'>
                {this.renderField("Name", `${user.details.lastname} ${user.details.firstname}`, this.props.classes.oddContainer)}
                    {this.renderField("Date of Birth", `${moment(user.details.dob).format("MMM DD YYYY")}`, this.props.classes.evenContainer)}
                {this.renderField("Email Address", `${user.details.email}`, this.props.classes.oddContainer)}
                    {this.renderField("Phone", `${user.details.phone}`, this.props.classes.evenContainer)}
                {this.renderField("Primary Physician", `${user.details.primary_provider_name}`, this.props.classes.oddContainer)}
                    {this.renderField("Physician Group Name", `${user.details.provider_group_name}`, this.props.classes.evenContainer)}
                {this.renderField("status", `${user.details.status}`, this.props.classes.oddContainer)}
            </Grid>
            :
            null
        )
    }

    renderDiary = (diary, classes) => {
        return(
            <React.Fragment>
                <Grid container justify='center' alignItems='center' direction='row'>
                    {this.renderField("Diary number", `${diary.episode_number} `, this.props.classes.oddContainer)}
                    {this.renderField("Number of questions", `${diary.num_questions} `, this.props.classes.evenContainer)}
                    {this.renderField("Number of records per day", `${diary.expected_num_records / diary.num_days} `, this.props.classes.oddContainer)}
                    {this.renderField("Interval (mins)", `${diary.interval_mins} `, this.props.classes.evenContainer)}
                    {this.renderField("Number of questions", `${diary.num_questions} `, this.props.classes.oddContainer)}
                    {this.renderField("Number of days", `${diary.num_days} `, this.props.classes.evenContainer)}
                    {this.renderField("Starts On", `${moment(diary.start_date, "YYYY-MM-DDTHH:mm").format("DD MMM YYYY")} ${moment(diary.start_time, "HH:mm").format("hh:mmA")}`, this.props.classes.oddContainer)}
                    {this.renderField("Ends At", `${moment(diary.end_date, "YYYY-MM-DDTHH:mm").format("DD MMM YYYY")} ${moment(diary.end_time, "HH:mm").format("hh:mmA")}`, this.props.classes.evenContainer)}

                </Grid>
            </React.Fragment>
        )
    }

    render() {
        const { classes, user, currentEpisode, latestEpisode } = this.props

        return (

            <React.Fragment>
                <h1>Personal Information</h1>
                {this.renderPatientPersonalInfo(user)}
                { currentEpisode && !_.isEmpty(currentEpisode) ?
                    <div className={classes.statsContainer}>
                        <h1>Current Diary Information</h1>
                        {this.renderDiary(currentEpisode, classes)}
                    </div>
                :
                    <React.Fragment>
                        {latestEpisode && !_.isEmpty(latestEpisode)
                            ?
                            <div className={classes.statsContainer}>
                                <h1>Diary Information</h1>
                                {this.renderDiary(latestEpisode, classes)}
                            </div>
                            :
                            null
                         }

                    </React.Fragment>
                }
            </React.Fragment>
        )
    }
}
function mapStatsToProps(state) {
    console.log("state in info : ", state);
    return {
        currentEpisode: state.patientData.currentEpisode,
        latestEpisode: state.patientData.latestEpisode,
        patientData: state.patientData,
        user: state.user
    }
}

PatientStats = withStyles(styles)(PatientStats);
PatientStats = connect(mapStatsToProps)(PatientStats);

export default PatientStats;