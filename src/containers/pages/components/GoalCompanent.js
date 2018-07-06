import React from 'react';
import './css/GoalComponent.css'

class GoalComponent extends React.Component {

    render() {
        return (
            <div>
                <table className='goal-table'>
                    <tr>
                        <th colSpan='2' className='underline'>
                            <span className='blue-text'>{this.props.header}</span>
                        </th>
                    </tr>
                    <tr>
                        <td>Description: What is the goal?</td>
                        <td><textarea></textarea></td>
                    </tr>
                    <tr>
                        <td>First Step Plan: What is the first step towards achieving this goal?</td>
                        <td><textarea></textarea></td>
                    </tr>
                    <tr>
                        <td>Evaluation: How will we know if the goal is achieved? What will happen or change?</td>
                        <td><textarea></textarea></td>
                    </tr>
                    <tr>
                        <td>Support: What training or experience, or other support, could help?</td>
                        <td><textarea></textarea></td>
                    </tr>
                    <tr>
                        <td>Timing: When will the goal be achieved?</td>
                        <td><textarea></textarea></td>
                    </tr>
                </table>
            </div>
        );
    }
}

export default GoalComponent;