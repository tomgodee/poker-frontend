import React from 'react';

const Login = (props: any) => {
  console.log('props', props);
  return (
    <div>
      <h1>This is login page</h1>
    </div>
  );
};

export default React.memo(Login);
