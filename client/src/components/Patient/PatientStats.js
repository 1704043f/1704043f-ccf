import React , { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Redirect, withRouter } from 'react-router-dom';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const styles = theme => ({
    statsContainer : {
        width: 'auto',
    }
});
class PatientStats extends Component {
    state= {
        episodeNumber : 0,
        showingEpisode : {},
    }
    componentDidMount(){
        console.log("state in did mount : ", this.state);
        console.log("props in did mount : ", this.props);
        setTimeout(() => {
            if (this.props.patientData.episodes) {
                this.setState({
                    episodeNumber: this.props.patientData.episodes[this.props.patientData.episodes.length - 1].episode_number,
                    showingEpisode: this.props.patientData.episodes[this.props.patientData.episodes.length - 1],
                }, () => {
                    console.log("after state in did mount : ", this.state);
                });
            }
        }, 300);

    };
    handleChange =(event) =>{
        console.log("Event : ", event.target.value);
        let val = event.target.value;
        this.setState({
            episodeNumber : val,
            showingEpisode: this.props.patientData.episodes[val-1]
        })
    }
    initializeData=(data) => {

    }
    renderStats =(data, questions) =>{
        console.log("data in render stats : ", data);
        console.log(questions);
        let arrRows = [];
        let heading = [];
        let questionHeading = [];
        let answers = [];
        parseObj(questions, data);
        function parseObj(questions, data){
            _.map(questions, function( val) {

                _.mapValues(val, function (value, key) {
                    if (key.toString() === 'question') {
                        questionHeading.push(value);
                    }
                    if (key.toString() === 'answers') {
                        answers.push(value);
                    }
                });
            });
            //console.log ( "answers : " , answers);
            _.mapKeys(data, function (value, key) {
                if(key.toString() === 'record_number'){
                    heading.push(key);
                }

            });
            let id = 0;

            _.map(data, function (datum) {
                let objData = { question: [] };
                objData.record_number = datum.record_number;
                //if there is data object, proceed to pull question_answers
                if (datum.data.length >0) {
                    //console.log(datum.data);
                    _.map(datum.data, function (item) {
                        //console.log(item);
                        _.map(item.question_answers, function (answer, index) {
                            //console.log(answer)
                            if (answer === true) {
                                //console.log("Found answer,", answers[item.question_number][index]);
                                objData.question[item.question_number] = answers[item.question_number][index];
                            }
                        })
                    })
                }
                //console.log(objData);
                arrRows.push(objData);
            })
        }


        return(
            <div>
                <Table className={this.props.classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Record Number</TableCell>
                            {questionHeading ? questionHeading.map(item => {
                                //console.log(item);
                                return(
                                    <React.Fragment>
                                        <TableCell numeric>{item}</TableCell>
                                    </React.Fragment>
                                )
                            }) : null
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {arrRows.map(row => {
                            return (
                                <TableRow key={row.id}>
                                    <TableCell component="th" scope="row">
                                        {row.record_number}
                                    </TableCell>
                                    {!_.isEmpty(row.question) ?
                                        row.question.map(item => {
                                            console.log(item);
                                            return(
                                                <TableCell numeric>{item ? item : " "}</TableCell>
                                            )
                                        })

                                    :
                                    <React.Fragment>
                                    {questions.map( question => {
                                        return(
                                            <TableCell numeric></TableCell>
                                        )
                                    })}
                                    </React.Fragment>
                                }
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>

        )};
    render(){
        const { classes, patientData } = this.props
        const { currentEpisode, latestEpisode, episodes } = this.props.patientData;
        //console.log(currentEpisode);
        return(

            <React.Fragment>

                        <React.Fragment>
                            {this.state.showingEpisode && !_.isEmpty(this.state.showingEpisode.records) ?
                                <React.Fragment>
                                    <h1>Diary Records </h1>
                                    <select onChange={this.handleChange} value={this.state.episodeNumber}>
                                        {episodes ?
                                            episodes.map((item, index) => {
                                                return(
                                                    <option key={index+1} value={index+1} selected={this.state.episodeNumber === index+1 }>{index+1}</option>
                                                )

                                            })
                                            :
                                            null}

                                    </select>
                                    <div>
                                        <h2>From {moment(latestEpisode.start_date).format("ddd MM-DD-YYYY")} to {moment(latestEpisode.end_date).format("ddd MM-DD-YYYY")}</h2>
                                    </div>
                                    {this.renderStats(this.state.showingEpisode.records, this.state.showingEpisode.questions)}
                                </React.Fragment>:
                            null}
                        </React.Fragment>
            </React.Fragment>
        )
    }
}
function mapStatsToProps(state){
    return (state);
}

PatientStats = withStyles(styles)(PatientStats);
PatientStats = connect(mapStatsToProps)(PatientStats);

export default PatientStats;