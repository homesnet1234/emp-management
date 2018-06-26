import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Table, Grid, Progress, Button, Modal } from 'semantic-ui-react';
import moment from 'moment';
import PageHeader from './PageHeader';

class Timesheet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      holidaycolor: 'rgb(221, 225, 230)',
      ButtonRedcolor: '#FF0000',
      textWorkcolor: '#2185CD',
      textHolidaycolor: '#999999',
      iconRedcolor: 'red',
      iconBluecolor: 'blue',
      date: moment(),
      lastholiday: { date: '', name: '' },
      holidays: [
        { date: '2018-06-14', name: 'Compensatory day' },
        { date: '2018-06-22', name: 'test day' },
        { date: '2018-06-29', name: 'test 2 day' }
      ]
    };
    this.anotherMonthCell = this.anotherMonthCell.bind(this);
    this.holidayCell = this.holidayCell.bind(this);
    this.workdayCell = this.workdayCell.bind(this);
    this.drawCell = this.drawCell.bind(this);
    this.addHolidayName = this.addHolidayName.bind(this);
    this.isHoliday = this.isHoliday.bind(this);
    this.buttonOfHoliday = this.buttonOfHoliday.bind(this);
  }

  drawCell(date, hour) {
    if (date.format('M') !== this.state.date.format('M')) {
      return (this.anotherMonthCell(date.format('D')));
    }
    else if (this.isHoliday(date)) {
      return (this.holidayCell(date.format('D'), hour));
    }
    else if (date.format('d') === '0' || date.format('d') === '6') {
      return (this.holidayCell(date.format('D'), hour));
    }
    return (this.workdayCell(date.format('D'), hour));
  }

  isHoliday(date) {
    for (let i = 0; i < this.state.holidays.length; i += 1) {
      if (moment(date).format('YYYY-MM-DD') === this.state.holidays[i].date) {
        this.state.lastholiday = this.state.holidays[i];
        return true;
      }
    }
    return false;
  }
  editButtonWorkday(hour) {
    let color = '';
    let iconcolor = '';
    if (hour !== 8) { color = this.state.ButtonRedcolor; iconcolor = this.state.iconRedcolor; }
    else if (hour === 0) {
      return (
        <Grid.Row textAlign="center">
          <Button animated="fade" style={{ borderStyle: 'solid', borderColor: color, backgroundColor: 'white', borderWidth: '1px' }} >
            <Button.Content visible><font color={color} >Add new</font></Button.Content>
            <Button.Content hidden > <Icon color={iconcolor} name="pencil alternate" /> </Button.Content>
          </Button>
        </Grid.Row>

      );
    }
    else { color = this.state.textWorkcolor; iconcolor = this.state.iconBluecolor; }
    return (
      <Grid.Row textAlign="center">
        <Button animated="fade" style={{ borderStyle: 'solid', borderColor: color, backgroundColor: 'white', borderWidth: '1px' }} >
          <Button.Content visible><font color={color} >{hour} Hour</font></Button.Content>
          <Button.Content hidden > <Icon color={iconcolor} name="pencil alternate" /> </Button.Content>
        </Button>
      </Grid.Row>
    );
  }
  anotherMonthCell(day) {
    return (
      <Table.Cell style={{ backgroundColor: this.state.holidaycolor }} >
        <Grid.Column>
          <Grid.Row textAlign="right" >
            <font color={this.state.textHolidaycolor} size="3" ><b>{day}</b></font>
          </Grid.Row>
          <Grid.Row style={{ height: '7.5em' }} />
        </Grid.Column>
      </Table.Cell>
    );
  }
  holidayCell(day, hour) {
    return (
      <Table.Cell style={{ backgroundColor: this.state.holidaycolor, maxWidth: '10em' }} >
        <Grid.Column>
          <Grid.Row textAlign="right" >
            <font size="3" ><b>{day}</b></font>
          </Grid.Row>
          {this.addHolidayName(day)}
          {this.buttonOfHoliday(hour)}
        </Grid.Column>
      </Table.Cell>
    );
  }
  buttonOfHoliday(hour) {
    if (hour !== 0) {
      return (
        <Grid.Row textAlign="center">
          <Button animated="fade" style={{ borderStyle: 'solid', borderColor: this.state.textWorkcolor, backgroundColor: 'white', borderWidth: '1px' }} >
            <Button.Content visible><font color={this.state.textWorkcolor}>{hour} Hour</font></Button.Content>
            <Button.Content hidden > <Icon color="blue" name="pencil alternate" /> </Button.Content>
          </Button>
        </Grid.Row>
      );
    }
    return (
      <Grid.Row style={{ height: '2.5em' }} />
    );
  }
  addHolidayName(day) {
    if (day === moment(this.state.lastholiday.date).format('D')) {
      return (
        <Grid.Row style={{ height: '5em' }}>
          <font color={this.state.textHolidaycolor}>- {this.state.lastholiday.name}</font>
        </Grid.Row>
      );
    }
    return (<Grid.Row style={{ height: '5em' }} />);
  }
  workdayCell(day, hour) {
    return (
      <Table.Cell >
        <Grid.Column>
          <Grid.Row textAlign="right" >
            <font size="3" ><b>{day}</b></font>
          </Grid.Row>
          <Grid.Row style={{ height: '5em' }} />
          {this.editButtonWorkday(hour)}
          {console.log(hour)}
        </Grid.Column>
      </Table.Cell>
    );
  }

  render() {
    const progressBar = percentWork => <div> <Progress percent={percentWork} active color="blue" progress /> </div>;

    return (
      <div>
        <PageHeader text="Timesheet" icon="calendar alternate" />
        {progressBar(20)}
        <Table celled structured fixed>
          <Table.Header>
            <Table.Row textAlign="center">
              <Table.HeaderCell colSpan="7"><font size="3">{this.state.date.format('MMMM')}</font> {this.state.date.format('YYYY')}</Table.HeaderCell>
            </Table.Row>
            <Table.Row textAlign="center">
              {this.state.days.map(day => <Table.HeaderCell>{day}</Table.HeaderCell>)}
            </Table.Row>
          </Table.Header>
          <Table.Body >
            { this.props.timesheets.map((timesheet, i) => (
                i % 7 === 0 &&
                <Table.Row style={{ height: '10em' }} >
                  {this.drawCell(moment(this.props.timesheets[i].date), this.props.timesheets[i].totalHours)}
                  {this.drawCell(moment(this.props.timesheets[i + 1].date), this.props.timesheets[i + 1].totalhours)}
                  {this.drawCell(moment(this.props.timesheets[i + 2].date), this.props.timesheets[i + 2].totalhours)}
                  {this.drawCell(moment(this.props.timesheets[i + 3].date), this.props.timesheets[i + 3].totalhours)}
                  {this.drawCell(moment(this.props.timesheets[i + 4].date), this.props.timesheets[i + 4].totalhours)}
                  {this.drawCell(moment(this.props.timesheets[i + 5].date), this.props.timesheets[i + 5].totalhours)}
                  {this.drawCell(moment(this.props.timesheets[i + 6].date), this.props.timesheets[i + 6].totalhours)}
                </Table.Row>
              ))
            }
          </Table.Body>
        </Table>
        <Modal trigger={<Button>New Task</Button>} />
      </div>
    );
  }
}

Timesheet.propTypes = {
  timesheets: PropTypes.array.isRequired
};

export default Timesheet;
