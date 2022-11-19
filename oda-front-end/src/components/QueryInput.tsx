import React from 'react';

const QueryInput = () => {
  return (
    <div className="mt-16">
      <div>
        <input type="text" placeholder="Enter your query here" />
      </div>
      <button>Run</button>
    </div>
  );
};

export default QueryInput;
