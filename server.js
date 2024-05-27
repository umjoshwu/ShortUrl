const express = require('express') //require library
const ShortUrl = require('./models/shortUrl') // ./ is all local files
//connect to database; pass in URL 
const mongoose = require('mongoose')
const app = express() // put in var app

const validator = require('validator') //validator lib 


mongoose.connect('mongodb://localhost/urlShortener', {})
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))


//route for index; takes functions w request and response, return index file.
app.get('/', async (req, res) => {
    //make urls show up;
    const shortUrl = await ShortUrl.find()
    res.render('index', { shortUrl: shortUrl })
})

//async action; wait until finsihed in background;
app.post('/shortUrl', async (req, res) => {
    const given_url = req.body.full
    //before creation, verify this is a real link.

    if (validator.isURL(given_url)) {
        await ShortUrl.create({ full: given_url })
    }

    //create url; then redirect to homepage
    res.redirect('/')



    // if (!validator.isURL(given_url)) {
    //     res.render('index', { shortUrl: shortUrl })
    //     // res.render('error', { errorMessage: 'Something went wrong!' });
    // }
    // else {
    //     //create new post; create by passing in full value.
    //     await ShortUrl.create({ full: given_url })
    // }


    // //create url; then redirect to homepage
    // res.redirect('/')
})

//route; very bottom of other routes
app.get('/:shortUrl', async (req, res) => {
    //whenever short property = short URL; awaitng this func. findOne, passing in search queuery.
    //saved to var shortUrl
    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl })


    if (shortUrl == null) {
        return res.sendStatus(404)
    }


    else {
        shortUrl.clicks++
        shortUrl.save()
        //save url with clicks
        res.redirect(shortUrl.full)
    }
})

app.listen(process.env.PORT || 5001); //default to port 5001


/*


//async action; wait until finsihed in background;
app.post('/shortUrl', async (req, res) => {
    const given_url = req.body.full
    //before creation, verify this is a real link.
    if (!validator.isURL(given_url)) {
        return res.status(400).send('Invalid URL')
    }

    //create new post; create by passing in full value.
    await ShortUrl.create({full: given_url})
    //create url; then redirect to homepage
    res.redirect('/')
})

*/
