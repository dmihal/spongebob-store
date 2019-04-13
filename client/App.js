import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import Pages from './Pages';

const App = () => (
  <BrowserRouter>
    <Layout>
      <Pages />
    </Layout>
  </BrowserRouter>
);

export default App;
