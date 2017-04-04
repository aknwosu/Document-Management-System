import axios from 'axios';
import jwt from 'jsonwebtoken';

const hostname = window.location.origin;
const baseUrl = hostname + "/search/"


export const DOCUMENT_CREATE_SUCCESS = 'DOCUMENT_CREATE_SUCCESS';
export const DOCUMENT_FETCH_SUCCESS = 'DOCUMENT_FETCH_SUCCESS';
export const DOCUMENT_FETCH_REJECTED = 'DOCUMENT_FETCH_REJECTED';
export const SEARCH_DOCUMENT_SUCCESS = 'SEARCH_DOCUMENT_SUCCESS';
export const SEARCH_DOCUMENT_REJECTED = 'SEARCH_DOCUMENT_REJECTED';
export const DELETE_DOCUMENT_SUCCESS = 'DELETE_DOCUMENT_SUCCESS';
export const DELETE_DOCUMENT_REJECTED = 'DELETE_DOCUMENT_REJECTED';


const docCreatedSuccess = (document) => {
  console.log('succesful Doc Created');
  return { type: DOCUMENT_CREATE_SUCCESS, document };
}

const createDocAction = (title, content, access, userId) => {
  return (dispatch) => {
    return axios.post('/documents', {
      title,
      content,
      access,
      userId
    }, {
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
  };
};


function getDocsSuccess(documents) {
  return { type: DOCUMENT_FETCH_SUCCESS, payload: documents };
}

function getDocsRejected(err) {
  return { type: DOCUMENT_FETCH_REJECTED, payload: err };
}

export function getAllDocs() {
  const config = {
    headers: {
      authorization: window.localStorage.getItem('token'),
    }
  };
  return (dispatch) => {
    return axios.get('/documents', config)
      .then((response) => {
        if (response.status === 200) {
          dispatch(getDocsSuccess(response.data));
        }
      })
      .catch((err) => {
        dispatch(getDocsRejected(err.data));
      });
  };
}

function searchBoxSuccess(searchBox) {
  return { type: SEARCH_DOCUMENT_SUCCESS, payload: searchBox };
}

function searchBoxRejected(err) {
  return { type: SEARCH_DOCUMENT_REJECTED, payload: err };
}

export function searchBoxAction(searchBox) {
  const url = `${baseUrl}documents/?q=${searchBox}`;
  console.log(`URL: ${url}`);
  return (dispatch) => {
    return axios.get(url, {
      headers: {
        authorization: window.localStorage.getItem('token'),
      }
    })
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        console.log(response.data);
        dispatch(searchBoxSuccess(response.data));
      }
    }).catch((err) => {
      dispatch(searchBoxRejected(err.data));
    });
  };
}

export const docDeletedSuccess = (deleteDoc) => {
  console.log('succesful Doc Created');
  return { type: DELETE_DOCUMENT_SUCCESS, deleteDoc };
}
export const docDeletedRejected = (err) => {
  return { type: DELETE_DOCUMENT_REJECTED, payload: err };
}

export function deleteDocAction(id) {
  return (dispatch) => {
    axios.delete(`/documents/${id}`, {
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


