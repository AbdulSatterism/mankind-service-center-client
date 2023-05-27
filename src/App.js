import React from 'react';
import { RouterProvider } from 'react-router-dom';
import routes from './Router/Routes';

const App = () => {
  return (
    <div data-theme='cupcake' className='max-w-screen-xl mx-auto'>
      <RouterProvider router={routes}>

      </RouterProvider>
    </div>
  );
};

export default App;