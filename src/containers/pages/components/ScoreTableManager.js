import React from 'react';
import './css/ScoreTableManager.css'

const DropDown = (props) => {
    let elements = [];
    for (let i = 1; i <= (props.numOfElements ? props.numOfElements : 5); i++)
        elements.push(<option value={i}>{i}</option>);

    return <select id={props.id} value={props.value} onChange={props.onChange}>{elements}</select>;
};

class ScoreTableManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: props.questions,
            expectedScore: props.expectedScore || [3, 3, 3, 3, 3, 3, 3],
            score: props.score || [3, 3, 3, 3, 3, 3, 3],
            weight: props.weight || [15, 10, 10, 15, 10, 20, 20],
            numOfQuestion: props.numOfQuestion || 7,
            numOfElements: props.numOfElements || 5,
            totalPoint: [0, 0, 0, 0, 0, 0, 0]
        }

        this.createTable = this.createTable.bind(this);
        this.updateExpectedScore = this.updateExpectedScore.bind(this);
        this.updateScore = this.updateScore.bind(this);
        this.arraySum = this.arraySum.bind(this);
        this.updateTotalPoint = this.updateTotalPoint.bind(this);
    }

    componentDidMount() {
        this.updateTotalPoint();
    }

    updateExpectedScore() {
        let values = [];
        for (let i = 0; i < this.state.numOfQuestion; i++) {
            let temp = document.getElementById(`expectScore${i}`);
            values.push(temp.value);
        }
        this.setState({ expectedScore: values });
    }

    updateScore() {
        let values = [];
        for (let i = 0; i < this.state.numOfQuestion; i++) {
            let temp = document.getElementById(`score${i}`);
            values.push(temp.value);
        }
        this.setState({ score: values }, this.updateTotalPoint);
    }

    updateTotalPoint() {
        let total = [];
        for (let i = 0; i < this.state.numOfQuestion; i++) {
            total.push((this.state.score[i] / this.state.numOfElements * this.state.weight[i]));
        }
        this.setState({ totalPoint: total });
    }

    arraySum(array) {
        let sum = 0;
        for (let i = 0; i < this.state.numOfQuestion; i++) {
            sum += parseInt(array[i]);
        }
        return sum;
    }

    createTable() {
        let table = [];
        for (let i = 0; i < this.state.numOfQuestion; i++) {
            table.push(<tr>
                <td>{i + 1}</td>
                <td>{this.state.questions[i]}</td>
                <td><DropDown id={`expectScore${i}`} value={this.state.expectedScore[i]} onChange={this.updateExpectedScore} numOfElements={this.state.numOfElements} /></td>
                <td><DropDown id={`score${i}`} value={this.state.score[i]} onChange={this.updateScore} numOfElements={this.state.numOfElements} /></td>
                <td>{this.state.weight[i]}%</td>
                <td>{(this.state.totalPoint ? this.state.totalPoint[i] : "N/A")}{(this.state.totalPoint ? "%" : "")}</td>
            </tr>);
        }
        return (
            <div className='eva-container'>
                <table>
                    <tr>
                        <th colSpan='6' className='underline'>
                            <span className='blue-text'>Performance Appraisal Portion</span>
                        </th>
                    </tr>
                    <tr>
                        <th>No.</th>
                        <th>Appraisal Criteria</th>
                        <th>Score</th>
                        <th>Total Average</th>
                        <th>Weight</th>
                        <th>Total Point</th>
                    </tr>
                    {table}
                    <tr>
                        <th colSpan='2'>Total Performance Score</th>
                        <th></th>
                        <th>{this.arraySum(this.state.score)}</th>
                        <th>{this.arraySum(this.state.weight)}%</th>
                        <th className='blue-text'>{this.arraySum(this.state.totalPoint)}%</th>
                    </tr>
                </table>
            </div>
        );
    }

    render() {
        return (
            <div>
                {this.createTable()}
            </div>
        );
    }
}

export default ScoreTableManager;