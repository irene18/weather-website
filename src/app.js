const path = require('path'); //core module
const express = require('express'); //npm module
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define pathss for Express config
const publicDirectoryPath = path.join(__dirname, '../public'); //generated path to pulic folder to use html files from there
const viewsPath = path.join(__dirname, '../templates/views'); //__dirname - folder of current file
const partialPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs'); //Express.js view engine for handlebars.js (dynamic pages)
app.set('views', viewsPath); //express will not find hbs files if they are not in views folder, so we provide custom views location
hbs.registerPartials(partialPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath)); //will show index.html contents on home page and other files on referencing paths


app.get('', (req, res) => { //use index.hbs view for home page
    res.render('index', { //pass view and object with value that view can acces
        title: 'Weather',
        name: 'Iryna'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Iryna'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Iryna',
        helpText: 'This is some helpful text'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Address must be provided!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
    
            res.send({ //can send any data - html, json
                forecast: forecastData,
                location,
                address: req.query.address
            });
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) { //if search key not passed in query
        return res.send({
            error: 'You must provide a search term'
        })
    }
    //req.query contains url query keys and values
    req.query
    res.send({
        products: []
    });
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404',
        name: 'Iryna',
        errorMessage: 'Help article not found'
    });
})

app.get('*', (req, res) => {
    res.render('error', {
        title: '404',
        name: 'Iryna',
        errorMessage: 'Page not found'
    });
})

app.listen(port, () => { //starts up a server, passing a port and callback
    console.log(`Server is started on port ${port}`);
}); 