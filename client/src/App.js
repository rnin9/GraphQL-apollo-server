import './App.css';
import React, { useState } from 'react';
import { ApolloProvider } from '@apollo/client'
import { ApolloClient, InMemoryCache } from '@apollo/client'

import Roles from './components/roles'
import Teams from './components/teams'
import People from './components/people'


function App() {
  const client = new ApolloClient({
    uri: `http://localhost:4000`,
    cache: new InMemoryCache()
    //한번 받은 데이터를 필요이상으로 관리하지 않아도 되게끔 cache 사용
  })
  const [menu, setMenu] = useState('Teams')

  let mainComp = {
    Roles: (<Roles />),
    Teams: (<Teams />),
    People: (<People />),
  }

  function NavMenus() {
    return [
      'Roles', 'Teams', 'People'
    ].map((_menu, key) => {
      return (
        <li key={key} className={menu === _menu ? 'on' : ''}
          onClick={() => { setMenu(_menu); }}>{_menu}</li>
      );
    });
  }

  return (
    <div className="App">
      <ApolloProvider client={client}>
        <header className="App-header">
          <h1>Company Management</h1>
          <nav>
            <ul>
              {NavMenus()}
            </ul>
          </nav>
        </header>
        <main>
          {mainComp[menu]}
        </main>
      </ApolloProvider >
    </div>
  );
}

export default App;
