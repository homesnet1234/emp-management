import * as actionTypes from '../constants/actionTypes';

export const fetchErpApproveRequest = form => ({
  type: actionTypes.ERPAPPROVE_FETCH_REQUEST,
  payload: {
    form
  }
});

export const fetchErpApproveSuccess = erpapprove => ({
  type: actionTypes.ERPAPPROVE_FETCH_SUCCESS,
  payload: {
    erpapprove
  }
});

export const fetchErpApproveFailure = messege => ({
  type: actionTypes.ERPAPPROVE_FETCH_FAILURE,
  payload: {
    messege
  }
});

export const approveErpRequest = (approveId, comment) => ({
  type: actionTypes.ERPAPPROVE_APPROVE_REQUEST,
  payload: {
    approveId,
    comment
  }
});

// export const approveErpSuccess = ()

export const rejectErpRequest = (approveId, comment) => ({
  type: actionTypes.ERPAPPROVE_REJECT_REQUEST,
  payload: {
    approveId,
    comment
  }
});

export const commentChange = comment => ({
  type: actionTypes.ERPAPPROVE_COMMENT_CHANGE,
  payload: {
    comment
  }
});

export const deleteComment = () => ({
  type: actionTypes.ERPAPPROVE_COMMENT_DELETE
});

export const modalApproveOpen = () => ({
  type: actionTypes.ERPAPPROVE_MODAL_OPEN
});

export const modalApproveClose = () => ({
  type: actionTypes.ERPAPPROVE_MODAL_CLOSE
});


// export const updateErpRequest = (userId, leave) => ({
//   type: actionTypes.ERP_UPDATE_REQUEST,
//   payload: {
//     userId,
//     leave
//   }
// });

// export const updateErpSuccess = leaves => ({
//   type: actionTypes.ERP_UPDATE_SUCCESS,
//   payload: {
//     leaves
//   }
// });

// export const updateErpFailure = message => ({
//   type: actionTypes.ERP_UPDATE_FAILURE,
//   payload: {
//     message
//   }
// });
