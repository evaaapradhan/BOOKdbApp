var express = require('express');
const { push } = require('../resources/books');
var router = express.Router();
var books = require('../resources/books');

router.get('/add', function (req, res, next) {
    res.render('addBooks', {
        title: 'Add book',
    });
});

router.post('/save',function(req,res) {
   console.log('save function,,,,,',req.body)
   books.push({...req.body, id: `00${books.length + 1}`})
   res.redirect('/');
});

router.get('/remove/:index', function (req, res) {
    books.splice(req.params.index, 1);
    res.redirect('/');
});

router.get('/edit/:_id', function (req, res) {
    const book = books.find((book) => book._id === req.params._id);
    res.render('editBooks', {
        title: 'Edit book',
        book
    });
});

router.post('/edit/:_id', function(req,res){
    books.splice(books.findIndex(book => book._id === req.params._id), 1, {...req.body, _id: req.params._id}); 
    //{} .splice ma {} chai replace garna use gareko, splice add/remove garna use huncha hai
    //books.splice(req.params._id, 1, {...req.body, _id: req.params._id});  
    //you can do also do // let updatebook = books.findIndex(book => book._id === req.params._id 
    res.redirect('/');
});

//    if separate object banayera garney ho vaney 
// var currentbBoks suppose garera gara ho
//   var currentBookindex = -1;
// books.some(function(books, i) {
//     if (book._id == req.params._id) {
//         currentBookindex = i;
//         return true;
//     }

module.exports = router