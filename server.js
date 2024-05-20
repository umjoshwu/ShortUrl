const express = require('express') //require library
const ShortUrl = require('./models/shortUrl') // ./ is all local files
//connect to database; pass in URL 
const mongoose = require('mongoose')
const app = express() // put in var app

mongoose.connect('mongodb://localhost/urlShortener', {})
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))


//route for index; takes functions w request and response, return index file.
app.get('/', async (req, res) => {
    //make urls show up;
    const shortUrl = await ShortUrl.find()
    res.render('index', {shortUrl: shortUrl})
})

//async action; wait until finsihed in background;
app.post('/shortUrl', async (req, res) => {
    //create new post; create by passing in full value.
    await ShortUrl.create({full: req.body.full})
    //create url; then redirect to homepage
    res.redirect('/')
})

//route; very bottom of other routes
app.get('/:shortUrl', async(req, res) =>{
    //whenever short property = short URL; awaitng this func. findOne, passing in search queuery.
    //saved to var shortUrl
    const shortUrl = await ShortUrl.findOne({short: req.params.shortUrl})
    if (shortUrl == null){
        return res.sendStatus(404)
    }
    else{
        shortUrl.clicks++
        shortUrl.save()
        //save url with clicks
        res.redirect(shortUrl.full)
    }
})

app.listen(process.env.PORT || 5001); //default to port 5000
