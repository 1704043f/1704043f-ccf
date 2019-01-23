import React, { Component } from "react";
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from "react-router-dom";
import { bindActionCreators } from 'redux';
import Dashboard from './PatientDashboard';
import propTypes from 'prop-types';
import PatientReport from './PatientReport';
import PhysicianInfo from './PhysicianInfo';
import AfterSurvey from './AfterSurvey';
import HistorySurvey from './HistorySurvey';
import PatientStats from './PatientStats';
import NotFound from '../NotFound';
import { fetchPatientData } from '../../actions/PatientAction';


class PatientConsoleRoutes extends Component {
    componentWillMount() {
        this.props.fetchPatientData();
    }
    render(){
        return(
            <div className="App">

                <Switch>
                    <Route exact path="/patient" component={Dashboard} />
                    <Route exact path='/patient/dashboard' component={Dashboard} />
                    <Route exact path='/patient/history/:episode/:entry' component = {Dashboard} />
                    <Route  path='/patient/complete' component={AfterSurvey} />
                    <Route  path='/patient/physician' component={PhysicianInfo} />
                    <Route  path='/patient/history' component={HistorySurvey} />
                    <Route path='/patient/stats' component={PatientStats} />
                    <Route exact path='/patient/report' component={PatientReport} />

                    <Route path="/notfound" component={NotFound} />
                    <Route component={NotFound} />
              </Switch>

            </div>
        );
    }

}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchPatientData
    }, dispatch);
}
PatientConsoleRoutes.propTypes = {
    history: propTypes.shape({
        push: propTypes.func.isRequired
        }).isRequired,
}

PatientConsoleRoutes = withRouter(PatientConsoleRoutes);
export default connect(null, mapDispatchToProps)(PatientConsoleRoutes)