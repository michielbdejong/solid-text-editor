import React from 'react';
import { LoggedOut, LoginButton, LoggedIn } from '@solid/react';
import Editor from './components/Editor';

const App: React.FC = () => {
  return <>
    <LoggedOut>
      <section className="section">
        <p className="content">This app requires you to log in. It requires <b>Control</b> access.</p>
        <LoginButton popup="popup.html" className="button is-large is-primary">Log in to start using</LoginButton>
      </section>
    </LoggedOut>
    <LoggedIn>
    <Editor></Editor>
    </LoggedIn>
  </>;
}

export default App;
