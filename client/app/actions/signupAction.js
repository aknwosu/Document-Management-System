// import axios from 'axios';


// const Signup = (user) => {
//   return { type: 'USER_CREATED', user };
// }

// const signupEvent = (userParams) => {
//   return function (dispatch) {
//     return axios.post('/users', {
//       userParams
//     }).then((response) => {
//       if (response.status === 201) {
//         dispatch(Signup(response.data));
//       }
//       console.log(response, 'signupAction');
//     }).catch((err) => {
//       throw new Error(err);
//     });
//   };
// };

// export { signupEvent };
// export default Signup;
