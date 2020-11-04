var express = require('express');
var router = express.Router();
var books = require('../resources/books'); 
let Books = require('../models/books');

router.get('/add', function (req, res, next) {
    res.render('addBooks', {
        title: 'Add book',
    });
});

router.post('/save', function(req, res, next) {
   //console.log('save function,,,,,',req.body)
   const book = new Books(req.body);
   let promise = book.save();
   promise.then(() => {
       console.log('Book added')
       res.redirect('/');
   })
   //books.push({...req.body, id: `00${books.length + 1}`})
});

router.get('/remove/:_id', function (req, res) {
    Books.remove({ _id: req.params._id }, function() {
        res.redirect('/');
    })
    //console.log(req.params.id); 
      // books.splice(req.params.index, 1);
    //res.redirect('/');
});

router.get('/edit/:_id', function (req, res) {
    Books.findOne({_id: req.params._id}, function(err, book){
        res.render('editBooks',{title: 'Edit book', book: book});
    })
    
    // const book = books.find((book) => book._id === req.params._id);
    // res.render('editBooks', {
    //     title: 'Edit book',
    //     book
    // });
});

//findOneandUpdate

router.post('/saveEdit/:_id', function(req,res){
    Books.findOneAndUpdate({ _id: req.params._id }, { $set: req.body }, function(err, book) {
        console.log(book);
        res.redirect('/');
    })
    // books.splice(books.findIndex(book => book._id === req.params._id), 1, {...req.body, _id: req.params._id}); 
    //{} .splice ma {} chai replace garna use gareko, splice add/remove garna use huncha hai
    //books.splice(req.params._id, 1, {...req.body, _id: req.params._id});  
    //you can do also do // let updatebook = books.findIndex(book => book._id === req.params._id 
    
});

//    if separate object banayera garney ho vaney 
// var currentbBoks suppose garera gara ho
//   var currentBookindex = -1;
// books.some(function(books, i) {
//     if (book._id == req.params._id) {
//         currentBookindex = i;
//         return true;
//     }

module.exports = router;