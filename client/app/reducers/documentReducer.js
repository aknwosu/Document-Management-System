// import initialState from '../store/initialState';

import {
  DOCUMENT_CREATE_SUCCESS,
  DOCUMENT_FETCH_SUCCESS,
  DOCUMENT_FETCH_REJECTED,
  SEARCH_DOCUMENT_SUCCESS,
  SEARCH_DOCUMENT_REJECTED,
  DELETE_DOCUMENT_SUCCESS,
  DELETE_DOCUMENT_REJECTED,
  UPDATE_DOCUMENT_SUCCESS,
  UPDATE_DOCUMENT_REJECTED

} from '../actions/documentAction';

const initialState = {
  document: {},
  documents: [],
  searchBox: [],
  error: {},
  docCreated_Success: false,
  searchBox_Success: false,
  docDeletedSuccess: false,
  updateDocumentSuccess: false,
  updateDocumentRejected: false
};

export default function documentReducer(state = initialState, action) {
  switch (action.type) {
  case DOCUMENT_CREATE_SUCCESS:
  console.log(action.document);
    return Object.assign(
      {},
      state,
      { document: action.document, docCreated_Success: true }
    );
  case UPDATE_DOCUMENT_SUCCESS:
    return Object.assign(
      {},
      state,
      { updateDoc: action.payload, updateDocumentSuccess: true }
    );
  case UPDATE_DOCUMENT_REJECTED:
    return Object.assign(
      {},
      state,
      { error: action.payload, updateDocumentRejected: true }
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
      { searchBox: action.payload.documents.rows }
    );
  case SEARCH_DOCUMENT_REJECTED:
    return Object.assign(
      {},
      state,
      { error: action.payload }
    );
  case DELETE_DOCUMENT_SUCCESS:
    return Object.assign({}, state, { deleteDoc: action.deleteDoc, docDeletedSuccess: true })
  default:
    return state;
  }
}

