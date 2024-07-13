// src/App.js
import React from 'react';
import './App.css';
import UserList from './components/UserList';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Advanced Search</h1>
            </header>
            <main>
                <UserList />
            </main>
        </div>
    );
}

export default App;
