import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import {
   SEARCH_USERS,
   SET_LOADING,
   CLEAR_USER,
   GET_USER,
   GET_REPOS,
} from '../types';

let githubToken = process.env.REACT_APP_GITHUB_TOKEN;

const GithubState = (props) => {
   const initialState = {
      users: [],
      user: {},
      repos: [],
      loading: false,
   };
   const [state, dispatch] = useReducer(GithubReducer, initialState);

   // Search users
   const searchUsers = async (text) => {
      setLoading();
      const res = await axios.get(
         `https://api.github.com/search/users?q=${text}`,
         {
            headers: {
               Authorization: `token ${githubToken}`,
            },
         }
      );

      dispatch({ type: SEARCH_USERS, payload: res.data.items });
   };

   // Get User
   const getUser = async (username) => {
      setLoading();
      const res = await axios.get(`https://api.github.com/users/${username}`, {
         headers: {
            Authorization: `token ${githubToken}`,
         },
      });
      dispatch({ type: GET_USER, payload: res.data });
   };
   // Get Repos
   const getUserRepos = async (username) => {
      setLoading();
      const res = await axios.get(
         `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc`,
         {
            headers: {
               Authorization: `token ${githubToken}`,
            },
         }
      );
      dispatch({ type: GET_REPOS, payload: res.data });
   };

   // Clear Users
   const clearUsers = () => dispatch({ type: CLEAR_USER });

   // Set loading
   const setLoading = () => dispatch({ type: SET_LOADING });

   return (
      <GithubContext.Provider
         value={{
            users: state.users,
            user: state.user,
            repos: state.repos,
            loading: state.loading,
            searchUsers,
            clearUsers,
            getUser,
            getUserRepos,
         }}
      >
         {props.children}
      </GithubContext.Provider>
   );
};

export default GithubState;
