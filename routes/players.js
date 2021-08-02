const express = require('express')
const router = express.Router()

const {
    getAllPlayers,
    addPlayer,
    deletePlayer,
    deleteNPlayers
}= require('../controllers/players')

router.route('/').get(getAllPlayers).post(addPlayer).delete(deleteNPlayers)
router.route('/:id').delete(deletePlayer)


module.exports = router