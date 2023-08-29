import React from 'react';
import Dropdown from './DropDown';// Make sure to adjust the path based on your folder structure

const options = [
  { value: 'group1 - option1', label: 'Group 1 - Option 1' },
  { value: 'group1 - option2', label: 'Group 1 - Option 2' },
  { value: 'group2 - option1', label: 'Group 2 - Option 1' },
  { value: 'group2 - option2', label: 'Group 2 - Option 2' },
  // ... Add more options here
];

function App() {
  return (
    <div className="App">
      <h1>Dropdown Component Demo</h1>
      <Dropdown options={options} />
    </div>
  );
}

export default App;
