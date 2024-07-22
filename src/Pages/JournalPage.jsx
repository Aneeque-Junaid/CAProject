import React from 'react';
import PostToJournal from "../Components/PostToJournal/PostToJournal"
import JournalTable from "../Components/JournalTable/JournalTable"

const JournalPage = () => {
  return (
    <div>
      <h2>Journal</h2>
      <PostToJournal />
      <hr />
      <JournalTable />
    </div>
  );
}

export default JournalPage;
