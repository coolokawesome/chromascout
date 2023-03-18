# ChromaScout - Web Palette Scraper
ChromaScout is a web application designed to scrape the CSS files of a website and extract all the color values used, providing you with a color palette for that website. Input the URL of the website you want to scrape, and the application will fetch the CSS using multiple proxy API's to extract the files from that website. The CSS files are then analyzed using regular expressions to extract the color values used in the stylesheets. The extracted colors are then displayed as a color palette below.

## Table of Contents 🔭
1. [Features](#Features)
2. [Installation](#Installation)
3. [Usage](#Usage)
4. [APIs used](#Api)
5. [Contributing](#Contributing)
6. [License](#License)

### Features 💡 <a id="Features"></a>
- Extract color palette from any website
- Multiple proxy APIs used to fetch the CSS files
- Regular expressions used to extract color values from CSS files
- Easy to use interface

### Installation 🖥 <a id="Installation"></a>
To install the application, clone the repository to your local machine and install the required dependencies using npm:

`git clone https://github.com/coolokawesome/chromascout.git
cd chromascout
npm install`

### Usage 🔮 <a id="Usage"></a>
To use ChromaScout, enter the URL of the website you want to scrape in the input field on the home page. The application will fetch the CSS files using multiple proxy APIs and extract the color values used in the stylesheets. The extracted colors will then be displayed as a color palette below.

### APIs used ⚡️ <a id="Api"></a>
ChromaScout uses multiple proxy APIs to fetch the CSS files from the inputted website. The APIs used include:

cors-anywhere
allorigins

### Contributing 🙌 <a id="Contributing"></a>
Contributions are always welcome! If you have any suggestions, bug reports, or feature requests, please open an issue or a pull request on the repository.

### License 💼 <a id="License"></a>
ChromaScout is licensed under the MIT License.
