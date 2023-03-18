import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

function InputHandler() {
  const [url, setUrl] = useState('');
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(['url']);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValidUrl(url)) {
      let urlWithoutProtocol = url.replace(/^(https?:\/\/)/, '');
      setCookie('url', url, { path: '/' });
      navigate(`/palettes/${urlWithoutProtocol}`);
    } else {
      alert("Invalid URL! double-check your URL contains the https:// prefix");
    }
  }

  const isValidUrl = (url) => {
    let pattern = /^(https?:\/\/)?(www\.)?([\da-z\.-]+)\.([a-z\.]{2,6})(?:\/[\w\.-]*)*(\?[^\s]*)?$/;
    return pattern.test(url);
  }

  return (
    <>
    <form onSubmit={handleSubmit} className='input-group mb-3 form-lg input-group-lg'>
      <input className='col-10 input form-control'
        type='text' 
        placeholder="paste the home page's URL here:"
        value={url} 
        onChange={(e) => setUrl(e.target.value)}
      />
      <button type='submit' className='btn btn-outline-success '>Go</button>
    </form>
    <div class="alert alert-info" role="alert">
    please note the alpha version only supports <b>home pages</b>, and may not work on sites that blocks web scraping. Please be patient as load times may take a bit!
</div>
    </>
  )
}

export default InputHandler;