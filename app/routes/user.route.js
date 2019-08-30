const express = require('express');
const router = express.Router();


const userModel = require('../models/user.model');



/** GET  USERS 
 *  Pagination
 *      items-count : 10,
 *      variable: pages
 * 
*/

router.get('/', (req, res)=>{

    let page =  parseInt(req.query['pages']) || 1;
    
    res.status(200).json({
        test: true
    });

});


/** GET SPECIFIQUE USERS */
router.get('/:userid', (req, res)=>{



});



/** CREAT A NEW USER */
router.post('/', (req, res)=>{



});


/** UPDATE  USER */
router.patch('/', (req, res)=>{



});


/** DELETE  USER */
router.delete('/:userid', (req, res)=>{



});

module.exports = router;