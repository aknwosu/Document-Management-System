// import initialState from '../store/initialState';

import {
  DOCUMENT_CREATE_SUCCESS,
  DOCUMENT_FETCH_SUCCESS,
  DOCUMENT_FETCH_REJECTED,
  SEARCH_DOCUMENT_SUCCESS,
  SEARCH_DOCUMENT_REJECTED

} from '../actions/documentAction';

const initialState = {
  document: {},
  documents: [],
  error: {},
  docCreated_Success: false,
  searchBox_Success: false
};

export default function documentReducer(state = initialState, action) {
  switch (action.type) {
  case DOCUMENT_CREATE_SUCCESS:
    return Object.assign(
      {},
      state,
      { document: action.document, docCreated_Success: true }
    );
  case DOCUMENT_FETCH_SUCCESS:
    return Object.assign(
      {},
      state,
      { documents: action.payload.documents.rows },
    );
  case DOCUMENT_FETCH_REJECTED:
    return Object.assign(
      {},
      state,
      { error: action.payload },
    );
  case SEARCH_DOCUMENT_SUCCESS:
    return Object.assign(
      {},
      state,
      { searchBox: action.searchBox, searchBox_Success: true }
    );
  case SEARCH_DOCUMENT_REJECTED:
    return Object.assign(
      {},
      state,
      { error: action.payload }
    );
  default:
    return state;
  }
}

