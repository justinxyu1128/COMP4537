const express = require('express');
const path = require('path');
const app = express();

const comp4537Router = express.Router();
const labsRouter = express.Router();

app.get('/', (req, res) => {
    res.redirect('/COMP4537');
})

comp4537Router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'COMP4537', 'index.html'));
})

labsRouter.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'COMP4537', 'labs', 'index.html'));
})

labsRouter.get('/1', (req, res) => {
    res.sendFile(path.join(__dirname, 'COMP4537', 'labs', '1', 'index.html'));
});


app.use('/COMP4537', comp4537Router);
app.use(express.static(path.join(__dirname, 'COMP4537', 'labs', '1')));
comp4537Router.use('/labs', labsRouter);

let port = 10000;
app.listen(port, function () {
    console.log("Server listening on port " + port);
});