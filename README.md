ChromaScout - Web Palette Scraper
ChromaScout is a web application designed to scrape the CSS files of a website and extract all the color values used, providing you with a color palette for that website. With ChromaScout, users can easily discover and explore the color scheme of any website, making it a valuable tool for designers, developers, and anyone interested in color aesthetics.

Table of Contents
Features
Installation
Usage
APIs used
Contributing
License
Features
Extract color palette from any website
Multiple proxy APIs used to fetch the CSS files
Regular expressions used to extract color values from CSS files
Easy to use interface
Installation
To install the application, clone the repository to your local machine and install the required dependencies using npm:

bash
Copy code
git clone https://github.com/<username>/<repository-name>.git
cd <repository-name>
npm install
Usage
To use ChromaScout, enter the URL of the website you want to scrape in the input field on the home page. The application will fetch the CSS files using multiple proxy APIs and extract the color values used in the stylesheets. The extracted colors will then be displayed as a color palette below.

APIs used
ChromaScout uses multiple proxy APIs to fetch the CSS files from the inputted website. The APIs used include:

cors-anywhere
allorigins
Contributing
Contributions are always welcome! If you have any suggestions, bug reports, or feature requests, please open an issue or a pull request on the repository.

License
ChromaScout is licensed under the MIT License.