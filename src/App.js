import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
// import 'font-awesome/css/font-awesome.min.css';
import { createGlobalStyle } from 'styled-components';

import Routing from './components/routing';
import Footer from './components/footer';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheckSquare, faLaptopCode } from '@fortawesome/free-solid-svg-icons'

library.add(fab, faCheckSquare, faLaptopCode)




const GlobalStyle = createGlobalStyle`
  body{
    scroll-behavior: smooth;
   font-family: "raleway";
   background: #222222;
}
`;


function App() {
  return (
    <div>
      <GlobalStyle/>
      <Routing/>
      <Footer/>
    </div>
  );
}

export default App;
