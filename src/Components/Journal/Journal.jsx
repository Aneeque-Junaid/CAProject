// Journal.jsx
import React from 'react';
import PostToJournal from "../PostToJournal/PostToJournal"
import JournalTable from "../JournalTable/JournalTable"

const Journal = () => {
  return (
    <div>
      <h2>Journal</h2>
      <PostToJournal />
      <JournalTable />
    </div>
  );
}

export default Journal;
