import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import cheerio from 'cheerio';
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function Palettes() {
  const [cookies] = useCookies(['url']);
  const [colorPalette, setColorPalette] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCssStyles() {
      const apiKey = '19415c193a8139c4edda3c1ea5438769';
      const scraperApiUrl = `https://api.scraperapi.com?api_key=${apiKey}&url=`;
    
      let errorCount = 0;
      let foundValidCss = false; // flag variable
    
      const proxyFetch = async (url) => {
        try {
          const response = await axios.get(`${scraperApiUrl}${url}`);
          return response.data;
        } catch (error) {
          console.error(`Error using proxy: ${scraperApiUrl}`, error);
          errorCount++;
          return null;
        }
      };
    
      const html = await proxyFetch(cookies.url);
      if (html) {
        const $ = cheerio.load(html);
        const cssLinks = $('link[rel="stylesheet"]');
        const colors = [];
        cssLinks.each(async function () {
          const cssLink = $(this).attr('href');
          const css = await proxyFetch(cssLink);
          if (css) {
            const colorRules = css.match(/color\s*:\s*#[0-9A-Fa-f]+/g) || [];
            colorRules.forEach((rule) => {
              const color = rule.match(/#[0-9A-Fa-f]+/)[0];
              if (!colors.includes(color)) {
                colors.push(color);
              }
            });
            setColorPalette(colors);
            setIsLoading(false);
            foundValidCss = true; // set flag to true
            return false; // exit the each loop
          }
        });
      }
      if (errorCount === 1) {
        console.error('Scraper API request failed');
      }
    }

    fetchCssStyles();
  }, [cookies.url]);
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("grey");


  
  return (
    <div className='row d-flex justify-content-center bg-light'>
      <div className='col-12'>
      <button className="col-2 btn btn-outline-secondary" onClick={() => navigate(-1)}>Back</button> 

      <h4 className="text-center">Palette for {cookies.url}</h4>
      </div>
      
  
      {isLoading ? (
        <>
        <ClipLoader
        className='m-5'
          color={color}
          loading={loading}
          size={75}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
        </>
      ) : colorPalette.length === 0 ? (
        <div class="alert alert-danger" role="alert">

  This website may not be able to be scraped due to CORS restrictions. Please wait a little longer while we try again, or enter a different URL.
        </div>
      ) : ( <div className='mt-3 mb-3 row d-flex justify-content-center'> {
        colorPalette.map((color, index) => (
          <div
            key={index}
            style={{ backgroundColor: color, height: '70px', color: color }}
            className="col-2 rounded-4 m-1 color"
            data-color={color}
          >
            {color}
          </div>
        ))
         } </div>
      )
      
      }
    </div>
  );
}

export default Palettes;