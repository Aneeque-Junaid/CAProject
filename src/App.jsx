import React from 'react'
import PostToJournal from './Components/PostToJournal/PostToJournal';
import JournalTable from './Components/JournalTable/JournalTable';
import CreateAccount from './Components/CreateAccount/CreateAccount';
import Sidebar from './Components/Sidebar/Sidebar';


const App = () => {
  return ( 
    <>
      <div>
        <Sidebar/>
        <PostToJournal/>
        <JournalTable/>
        <CreateAccount/>
      </div>
    </>
  )
}

export default App;