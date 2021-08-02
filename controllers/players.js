const asyncHandler = require('express-async-handler')
const {createAPIError} = require("../middleware/objects/api-error");
const {model:Player} = require('../models/Player')
const {model:Match} = require('../models/Match')

const getAllPlayers = asyncHandler(
    async (req, res, next) => {
        const players = await Player.find({})
        res.status(200).json({players})
    }
)

const makeAllPlayersWait = asyncHandler(
    async (req, res, next) => {
        await Player.updateMany({}, {waiting:true})
    }
)

const addPlayer = asyncHandler(
    async (req, res, next) => {
        const player = await Player.create(req.body)

        // Check if there are 6 players waiting to be matched,
        // sort them in ascending order of skill_level so that
        // they are later matched based on similar skill levels
        var sixWaitingPlayers = await Player
            .find({waiting:true})
            .sort({skill_level:"asc"})

        if (sixWaitingPlayers.length === 6) {
            // These players will be matched with partners, set waiting=false for all of them
            await sixWaitingPlayers.forEach((element)=> {
                element.waiting=false
            })
            console.log(sixWaitingPlayers)
            const match1 = await Match.create({player_one:sixWaitingPlayers[0],
                player_two:sixWaitingPlayers[1]})
            const match2 = await Match.create({player_one:sixWaitingPlayers[2],
                player_two:sixWaitingPlayers[3]})
            const match3 = await Match.create({player_one:sixWaitingPlayers[4],
                player_two:sixWaitingPlayers[5]})

            return res.status(201).json({ matching:true, match_1: match1, match_2: match2, match_3: match3 })
        }
        res.status(201).json({ num_waiting_players: sixWaitingPlayers.length, matching:false, player:player })
    }
)

const deletePlayer = asyncHandler(
    async (req, res, next) => {
        const {id:playerID} = req.params
        const player = await Player.findOneAndDelete({_id:playerID})
        if (!player) {
            return next(createAPIError(`No player with id : ${playerID}`, 404))
        }
        res.status(200).json({player})
    }
)

const deleteNPlayers = asyncHandler(
    async (req, res, next) => {
        const {n:numPlayers} = req.query
        if (!numPlayers) {
            res.status(200).json({success:false, error:"'n' query unspecified."})
        }
        for (let i=0; i<numPlayers; i++) {
            const player = await Player.findOneAndDelete({})
        }
        res.status(200).json({players_deleted:numPlayers})
    }
)

module.exports = {getAllPlayers, addPlayer, deletePlayer, deleteNPlayers}