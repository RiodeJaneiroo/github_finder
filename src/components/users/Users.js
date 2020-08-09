import React, { Component } from 'react';
import UserItem from './UserItem';

export class Users extends Component {
   state = {
      users: [
         {
            id: 1,
            login: 'octocat',
            avatar_url:
               'https://avatars1.githubusercontent.com/u/17165079?s=460&u=80f8eca9322ce7bda796c0cc281528edba8822ef&v=4',
            url: 'https://api.github.com/users/octocat',
            html_url: 'https://github.com/octocat',
         },
         {
            id: 2,
            login: 'octocat',
            avatar_url:
               'https://avatars1.githubusercontent.com/u/17165079?s=460&u=80f8eca9322ce7bda796c0cc281528edba8822ef&v=4',
            url: 'https://api.github.com/users/octocat',
            html_url: 'https://github.com/octocat',
         },
         {
            id: 3,
            login: 'octocat',
            avatar_url:
               'https://avatars1.githubusercontent.com/u/17165079?s=460&u=80f8eca9322ce7bda796c0cc281528edba8822ef&v=4',
            url: 'https://api.github.com/users/octocat',
            html_url: 'https://github.com/octocat',
         },
      ],
   };
   render() {
      return (
         <div className='grid-3'>
            {this.state.users.map((user) => (
               <UserItem key={user.id} user={user} />
            ))}
         </div>
      );
   }
}

export default Users;
