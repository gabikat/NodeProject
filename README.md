## API Project (Backend only): Node.js, Express.js, MongoDB, Postman
Work in progress. Limited error checking

### Implemented:
- POST (Add player) @ localhost:5000/api/players 
- GET (Get all players) @ localhost:5000/api/players 
- DELETE (Delete player) @ localhost:5000/api/players/:id
- DELETE (Delete n=10 arbitrary players) @ localhost:5000/api/players?n=10 

Players automatically are put into "waiting room", once 6 waiting players exist, they are matched into pairs based on their skill level.
