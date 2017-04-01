import axios from 'axios';
import jwt from 'jsonwebtoken';

export const DOCUMENT_CREATE_SUCCESS = 'DOCUMENT_CREATE_SUCCESS';
export const DOCUMENT_FETCH_SUCCESS = 'DOCUMENT_FETCH_SUCCESS';
export const DOCUMENT_FETCH_REJECTED = 'DOCUMENT_FETCH_REJECTED';


const docCreatedSuccess = (document) => {
  console.log('succesful Doc Created');
  return { type: DOCUMENT_CREATE_SUCCESS, document };
}

const createDocAction = (title, content, access, userId) => {
  console.log(jwt.decode(localStorage.getItem('token')).userId);
  console.log(title, content);
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
      console.log(err);
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
        console.log(`err: ${err}`);
        dispatch(getDocsRejected(err.data));
      })
  }
}


export { createDocAction, docCreatedSuccess };

// export { createDocAction };


