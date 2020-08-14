import React, { useState, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import About from './components/pages/About';

import axios from 'axios';
import './App.css';

const App = () => {
   const [users, setUsers] = useState([]);
   const [user, setUser] = useState({});
   const [repos, setRepos] = useState([]);
   const [loading, setLoading] = useState(false);
   const [alert, setAlert] = useState(null);

   // Search GitHub users
   const searchUsers = async (text) => {
      setLoading(true);
      const res = await axios.get(
         `https://api.github.com/search/users?q=${text}`,
         {
            headers: {
               Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
            },
         }
      );

      setUsers(res.data.items);
      setLoading(false);
   };

   // Get single Github user
   const getUser = async (username) => {
      setLoading(true);
      const res = await axios.get(`https://api.github.com/users/${username}`, {
         headers: {
            Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
         },
      });
      setUser(res.data);
      setLoading(false);
   };
   // Get users repos
   const getUserRepos = async (username) => {
      setLoading(true);
      const res = await axios.get(
         `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc`,
         {
            headers: {
               Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
            },
         }
      );
      setRepos(res.data);
      setLoading(false);
   };

   // Clear users from state
   const clearUsers = () => {
      setUsers([]);
      setLoading(false);
   };

   // Set Alert
   const showAlert = (msg, type) => {
      setAlert({ msg, type });
      setTimeout(() => setAlert(null), 5000);
   };

   return (
      <Router>
         <div className='App'>
            <Navbar />
            <div className='container'>
               <Alert alert={alert} />
               <Switch>
                  <Route
                     exact
                     path='/'
                     render={(props) => (
                        <Fragment>
                           <Search
                              searchUsers={searchUsers}
                              clearUsers={clearUsers}
                              showClear={users.length > 0 ? true : false}
                              setAlert={showAlert}
                           />
                           <Users users={users} loading={loading} />
                        </Fragment>
                     )}
                  />
                  <Route path='/about' component={About} />
                  <Route
                     exact
                     path='/user/:login'
                     render={(props) => (
                        <User
                           {...props}
                           getUser={getUser}
                           getUserRepos={getUserRepos}
                           user={user}
                           repos={repos}
                           loading={loading}
                        />
                     )}
                  />
               </Switch>
            </div>
         </div>
      </Router>
   );
};

export default App;
