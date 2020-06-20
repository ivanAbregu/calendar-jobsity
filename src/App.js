import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import Tboard from './containers/board/Tboard';
import NewForm from './containers/cell/components/NewForm';

function App() {
  return (
    <div className="App">
        <Tboard/>
        <NewForm/>

    </div>
  );
}
export default App;
