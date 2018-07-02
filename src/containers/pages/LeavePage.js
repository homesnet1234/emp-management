import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import {
  fetchLeaveRequest,
  updateLeaveRequest
} from '../../actions/leave';
import { openModal } from '../../actions/modal';
import * as modalNames from '../../constants/modalNames';
import Leave from '../../components/Leave';
import Loader from '../../components/Loader';

const LeavePage = ({ isFetching, leaves, onAddClick, onCancelClick, userId, year, month, fetchLeave }) => (
  <div>
    {isFetching ? <Loader /> : <Leave userId={userId} leaves={leaves} onAddClick={onAddClick} onCancelClick={onCancelClick} fetchLeave={fetchLeave} year={year} month={month} />}
  </div>
);

LeavePage.defaultProps = {
  isFetching: true
};

LeavePage.propTypes = {
  isFetching: PropTypes.bool,
  leaves: PropTypes.array.isRequired,
  onAddClick: PropTypes.func.isRequired,
  onCancelClick: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
  fetchLeave: PropTypes.func.isRequired,
  year: PropTypes.string.isRequired,
  month: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  isFetching: state.leave.isFetching,
  leaves: state.leave.lists,
  userId: state.auth.id,
  year: state.leave.year,
  month: state.leave.month
});

const mapDispatchToProps = dispatch => ({
  fetchLeave: (userId, year, month) => dispatch(fetchLeaveRequest(userId, year, month)),
  onAddClick: () => dispatch(openModal(modalNames.CREATE_LEAVE_REQUEST)),
  onCancelClick: (userId, leave) => dispatch(openModal(modalNames.CONFIRM, {
    header: 'Cancel confirmation',
    description: 'Are you sure to cancel this leave request ?',
    onConfirm: () => dispatch(updateLeaveRequest(userId, { ...leave, status: 'Cancel' }))
  }))
});

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      const { fetchLeave, userId, year, month } = this.props;
      fetchLeave(userId, year, month);
    }
  })
);

export default enhance(LeavePage);
