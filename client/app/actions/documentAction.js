/* eslint require-jsdoc: "off" */

import axios from 'axios';

const hostname = window.location.origin;
const baseUrl = `${hostname}api/search/`;
const config = {
  headers: {
    authorization: window.localStorage.getItem('token'),
  }
};

export const DOCUMENT_CREATE_SUCCESS = 'DOCUMENT_CREATE_SUCCESS';
export const DOCUMENT_FETCH_SUCCESS = 'DOCUMENT_FETCH_SUCCESS';
export const DOCUMENT_FETCH_REJECTED = 'DOCUMENT_FETCH_REJECTED';
export const SEARCH_DOCUMENT_SUCCESS = 'SEARCH_DOCUMENT_SUCCESS';
export const SEARCH_DOCUMENT_REJECTED = 'SEARCH_DOCUMENT_REJECTED';
export const DELETE_DOCUMENT_SUCCESS = 'DELETE_DOCUMENT_SUCCESS';
export const DELETE_DOCUMENT_REJECTED = 'DELETE_DOCUMENT_REJECTED';
export const UPDATE_DOCUMENT_SUCCESS = 'UPDATE_DOCUMENT_SUCCESS';
export const UPDATE_DOCUMENT_REJECTED = 'UPDATE_DOCUMENT_REJECTED';


const docCreatedSuccess = document =>
({ type: DOCUMENT_CREATE_SUCCESS, document });

const createDocAction = (title, content, access, userId) =>
dispatch => axios.post('/api/documents', {
  title, content, access, userId }, {
    headers: {
      authorization: window.localStorage.getItem('token')
    }
  }).then((response) => {
    if (response.status === 201) {
      const data = response.data;
      dispatch(docCreatedSuccess(data));
    }
  }).catch((err) => {
    throw new Error(err);
  });

export function updateDocumentSuccess(updateDoc) {
  return { type: UPDATE_DOCUMENT_SUCCESS, payload: updateDoc };
}
export function updateDocumentRejected(err) {
  return { type: UPDATE_DOCUMENT_REJECTED, payload: err };
}

export function updateDocumentAction(id, title, content) {
  return dispatch => axios.put(`${hostname}/api/documents/${id}`, { title, content }, config)
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        dispatch(updateDocumentSuccess());
      }
    }).catch((err) => {
      dispatch(updateDocumentRejected(err.data));
    });
}


function getDocsSuccess(documents) {
  return { type: DOCUMENT_FETCH_SUCCESS, payload: documents };
}

function getDocsRejected(err) {
  return { type: DOCUMENT_FETCH_REJECTED, payload: err };
}

export function getAllDocs() {
  return dispatch => axios.get('/api/documents', config)
      .then((response) => {
        if (response.status === 200) {
          dispatch(getDocsSuccess(response.data));
        }
      })
      .catch((err) => {
        dispatch(getDocsRejected(err.data));
      });
}

function searchBoxSuccess(searchBox) {
  return { type: SEARCH_DOCUMENT_SUCCESS, payload: searchBox };
}

function searchBoxRejected(err) {
  return { type: SEARCH_DOCUMENT_REJECTED, payload: err };
}

export function searchBoxAction(searchBox) {
  const url = `${hostname}/api/documents/?q=${searchBox}`;
  return dispatch => axios.get(url, {
    headers: {
      authorization: window.localStorage.getItem('token'),
    }
  })
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        dispatch(searchBoxSuccess(response.data));
      }
    }).catch((err) => {
      dispatch(searchBoxRejected(err.data));
    });
}


export const docDeletedSuccess = deleteDoc => ({ type: DELETE_DOCUMENT_SUCCESS, deleteDoc });
export const docDeletedRejected = err => ({ type: DELETE_DOCUMENT_REJECTED, payload: err });

export function deleteDocAction(id) {
  return (dispatch) => {
    axios.delete(`/api/documents/${id}`, {
      headers: {
        authorization: window.localStorage.getItem('token'),
      }
    }).catch((err) => {
      dispatch(docDeletedRejected(err.data));
    });
  };
}

export {
  createDocAction,
  docCreatedSuccess,
  searchBoxRejected,
  searchBoxSuccess };

