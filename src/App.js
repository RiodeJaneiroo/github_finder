import React, { Component } from 'react';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';

import axios from 'axios';
import './App.css';

class App extends Component {
   state = {
      users: [],
      loading: false,
   };

   // Search GitHub users
   searchUsers = async (text) => {
      this.setState({ loading: true });
      const res = await axios.get(
         `https://api.github.com/search/users?q=${text}`,
         {
            headers: {
               Authorization: `RiodeJaneiroo ${process.env.REACT_APP_GITHUB_TOKEN}`,
            },
         }
      );

      this.setState({ users: res.data.items, loading: false });
   };
   // Clear users from state
   clearUsers = () => this.setState({ users: [], loading: false });

   render() {
      const { loading, users } = this.state;
      return (
         <div className='App'>
            <Navbar />
            <div className='container'>
               <Search
                  searchUsers={this.searchUsers}
                  clearUsers={this.clearUsers}
                  showClear={users.length > 0 ? true : false}
               />
               <Users users={users} loading={loading} />
            </div>
         </div>
      );
   }
}

export default App;
