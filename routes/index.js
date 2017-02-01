const express = require('express');
const router = express.Router();
const path = require( 'path' );
const { db, getAllBooks, getBook, addBook, updateBook, removeBooks } = require('../database/dbBookStore')


router.get( '/', ( req, res, next ) => {
  getAllBooks()
    .then( books => {
    res.render( 'index', { books, title: 'Bookstore App using React' } )
  })
})

router.get( '/:id', ( req, res, next ) => {
  getBook( req.params.id )
  .then( book => {
    res.json( book )
  })
})

router.post( '/', ( req, res, next ) => {
  const book = req.body
  console.log(book)
  addBook(book)
    .then(() => res.redirect('/'))
})

router.post( '/delete/:id', ( req, res, next ) => {
  const id = req.params.id
  removeBooks( id )
    .then( () => res.redirect( '/' ) )
})

router.post( '/edit/:id', ( req, res, next ) => {
  const id  = req.params.id
  const book  = req.body
  updateBook( id, book )
  .then( () => {
    res.redirect( '/' )
  })
})


module.exports = router;
