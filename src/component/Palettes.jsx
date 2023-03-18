import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import cheerio from 'cheerio';
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from "react-router-dom";

function Palettes() {
  const [cookies] = useCookies(['url']);
  const [colorPalette, setColorPalette] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCssStyles() {
      const proxies = [
        'https://cors-anywhere.herokuapp.com/',
        'https://thingproxy.freeboard.io/fetch/',
        'https://corsproxy.github.io/cgi-bin/',
      ];
    
      let errorCount = 0;
      let foundValidCss = false; // flag variable
    
      const proxyFetch = async (url, proxy) => {
        try {
          const response = await fetch(`${proxy}${url}`, {
            headers: {
              'X-Requested-With': 'XMLHttpRequest',
            },
          });
          return await response.text();
        } catch (error) {
          console.error(`Error using proxy: ${proxy}`, error);
          errorCount++;
          return null;
        }
      };
    
      const html = await proxyFetch(cookies.url, proxies[0]);
      if (html) {
        const $ = cheerio.load(html);
        const cssLinks = $('link[rel="stylesheet"]');
        const colors = [];
        for (const proxy of proxies) {
          // skip if valid CSS file has already been found
          if (foundValidCss) {
            break;
          }
          cssLinks.each(async function () {
            const cssLink = $(this).attr('href');
            const css = await proxyFetch(cssLink, proxy);
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
      }
      if (errorCount === proxies.length) {
        console.error('All proxy attempts failed');
      }
    }

    fetchCssStyles();
  }, [cookies.url]);
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("grey");

  function handleGoBack() {
    navigate(-1);
  }

  return (
    <div className='row d-flex justify-content-center bg-light'>
      <div className='col-12'>
      <button className="col-2 btn btn-outline-secondary" onClick={handleGoBack}>Back</button> 

      <h4 className="text-center">Palette for {cookies.url}</h4>
      </div>
      
  
      {isLoading ? (
        <ClipLoader
        className='m-5'
          color={color}
          loading={loading}
          size={75}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : colorPalette.length === 0 ? (
        <div class="alert alert-danger" role="alert">

  This website cannot be scraped due to data restrictions. Please try again with a different URL.
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