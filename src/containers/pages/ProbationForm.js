import React from 'react';
import './css/ProbationForm.css';
import ScoreTableManager from './components/ScoreTableManager';
import EmployeeInfo from './components/EmployeeInfoComponent';
import SignatureComponent from './components/SignatureComponent';
import EvaluationResultComponent from './components/EvaluationResultComponent';
import SupervisorCommentComponent from './components/SupervisorCommentComponent';
import logoBack from './pic/logo2.png'
import logo from './pic/logo.png'

const questions = ['ความรู้ในงานและการพัฒนาตัวเอง (Knowledge and Improvement)',
    'คุณภาพงาน (Quality of Work)',
    'ปริมาณงาน (Quantity of Work)',
    'การทำงานร่วมกับผู้อื่น (Co-operation with Colleagues)',
    'การปฏิบัติตาม Playtorium Culture',
    'ความสามารถทางด้านภาษาอังกฤษ (TOEIC)',
    'ประกาศนียบัตรตามสายงาน (Certificate)'];

class ProbationForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.profile.general.firstName + ' ' + this.props.profile.general.lastName,
            department: this.props.profile.work.departmentName,
            position: this.props.profile.work.positionName,
            employeeID: this.props.profile.work.userId,
            level: this.props.profile.work.levelId,
            startDate: this.props.profile.work.startDate,
            supervisor: '_supervisor',
            expectedScore: null,
            score: null,
            endProbationDate: this.props.profile.work.probationDate,
            passPro: true,
            confirmed: true,
            continued: false,
            basedSalary: null,
            mobile: null,
            transporationAllowance: null,
            otherAllowance: null,
            supervisorComment: '',
            terminationDate: null,
            continuedDate: null
        };

        this.employeeStateHandler = this.employeeStateHandler.bind(this);
        this.scoreTableStateHandler = this.scoreTableStateHandler.bind(this);
        this.supervisorCommentHandler = this.supervisorCommentHandler.bind(this);
        this.evaluationResultHandler = this.evaluationResultHandler.bind(this);
    }

    employeeStateHandler(newEndProbationDate) {
        this.setState({ endProbationDate: newEndProbationDate });
    }

    scoreTableStateHandler(newScore, newExpectedScore) {
        this.setState({
            score: newScore,
            expectedScore: newExpectedScore
        });
    }

    supervisorCommentHandler(newComment) {
        this.state = { ...this.state, supervisorComment: newComment };
        this.props.test(this.state);
    }

    evaluationResultHandler(newPassPro, newConfirmed, newContinued, newEndProbationDate,
        newTerminationDate, newContinuedDate, newBasedSalary, newMoblie,
        newTransporationAllowance, newOtherAllowance) {
        this.setState({
            passPro: newPassPro,
            confirmed: newConfirmed,
            continued: newContinued,
            endProbationDate: newEndProbationDate,
            terminationDate: newTerminationDate,
            continuedDate: newContinuedDate,
            basedSalary: newBasedSalary,
            mobile: newMoblie,
            transporationAllowance: newTransporationAllowance,
            otherAllowance: newOtherAllowance
        });
    }

    componentWillMount() {
        if (this.props.profile.eva != null) {
            this.setState({
                expectedScore: this.props.profile.eva.expectedScore,
                score: this.props.profile.eva.score,
                passPro: this.props.profile.eva.passPro,
                confirmed: this.props.profile.eva.confirmedByEmployment,
                continued: this.props.profile.eva.continued,
                basedSalary: this.props.profile.eva.basedSalary,
                mobile: this.props.profile.eva.mobile,
                transporationAllowance: this.props.profile.eva.transporationAllowance,
                otherAllowance: this.props.profile.eva.otherAllowance,
                supervisorComment: this.props.profile.eva.supComment
            })
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (nextState.score != this.state.score ||
            nextState.passPro != this.state.passPro ||
            nextState.confirmed != this.state.confirmed ||
            nextState.continued != this.state.continued ||
            nextState.basedSalary != this.state.basedSalary ||
            nextState.mobile != this.state.mobile ||
            nextState.transporationAllowance != this.state.transporationAllowance ||
            nextState.otherAllowance != this.state.otherAllowance ||
            nextState.endProbationDate != this.state.endProbationDate ||
            nextState.expectedScore != this.state.expectedScore ||
            nextState.terminationDate != this.state.terminationDate ||
            nextState.continuedDate != this.state.continuedDate
        )
    }

    componentDidUpdate() {
        this.props.test(this.state);
    }

    render() {
        return (
            <div className='main-container'>
                <img className="logo_back" src={logoBack} />
                <div className='profile'>
                    <img className="logo" src={logo} />
                    <h1>Employee Probation Form</h1>
                </div>
                <EmployeeInfo {...this.state} showEndProDate='true' onChange={this.employeeStateHandler} mode={this.props.mode} />

                <div>
                    <ScoreTableManager {...this.state} questions={questions} numOfQuestion={5} weight={[20, 20, 20, 20, 20]} score={this.state.score} onChange={this.scoreTableStateHandler} mode={this.props.mode}/>
                </div>
                <EvaluationResultComponent {...this.state} onChange={this.evaluationResultHandler} mode={this.props.mode}/>
                <SupervisorCommentComponent {...this.state} onChange={this.supervisorCommentHandler} mode={this.props.mode} />
                <SignatureComponent {...this.state} />
            </div>
        );
    }
}
export default ProbationForm;
