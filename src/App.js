import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InputHandler from './component/InputHandler';
import Palettes from './component/Palettes';
import './index.css'
function App() {
  return (
    <Router>
      <>
        <div className='container header-container'>
          <div className='row'>
            <div className='col-12 text-center'>
              <h1 className='display-1'>ChromaScout</h1>
            </div>
            <div className='col-12 text-center'>
              <h2 className='display-6'>The web pallete scraper</h2>
            </div>
          </div>
        </div>
        <div className='container col-10 col-lg-6 main-container p-4 rounded-5'>
          <div className='row'>
            <div className=''>
              <Routes>
                <Route path="/" element={<InputHandler />} />
                <Route path="/palettes/:url" element={<Palettes />} />
              </Routes>
            </div>
          </div>
          <div className='row'>
            <div className='col'>
              <h3>How does it work?</h3>
              <p>
              ChromaScout is a user-friendly web-based application created to extract all color 
              values used on a website by scraping its CSS files, allowing you to obtain a comprehensive
               color palette. Simply enter the website URL that you want to extract colors from, and the 
               application will obtain the CSS files from the website using various proxy APIs. Then, it
                will analyze the CSS files using regular expressions to extract all color values used in 
                the stylesheets.
              </p>
              <p>With ChromaScout, you can easily discover and explore the color scheme of any website,
                 making it a useful tool for designers, developers, and anyone interested in color aesthetics. 
                 With a few clicks, ChromaScout enables you to extract color palettes from any website and 
                 incorporate them into your design projects.
              </p>
            </div>
          </div>
        </div>
      </>
    </Router>
  );
}

export default App;