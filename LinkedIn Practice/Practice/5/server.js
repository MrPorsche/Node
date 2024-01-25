var express = require('express');
var  bodyParser = require('body-parser');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose');

app.use(express.static(__dirname));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

var dbUrl = 'mongodb+srv://mrporsch3:Mr.Por$ch3@lnkdn1ndjs1cht.ew8wpe2.mongodb.net/node-chit?retryWrites=true&w=majority';

var Message = mongoose.model('Message', {
    name: String,
    message: String
})

app.get('/messages', (req, res) => {
    Message.find({})
    .then(messages => {
        res.send(messages);
    })
    .catch((err) => {
        console.error('Error fetching message:', err);
        res.sendStatus(500);
    });
})

app.get('/messages/:user', (req, res) => {
    var user = req.params.user
    Message.find({name: user})
    .then(messages => {
        res.send(messages);
    })
    .catch((err) => {
        console.error('Error fetching message:', err);
        res.sendStatus(500);
    });
})

app.post('/messages', async (req, res) => {
    try {
        var message = new Message(req.body);
        var savedMessage = await message.save()
        console.log('saved')
        var censored = await Message.findOne({message: 'badword'})
        if(censored) {
            await Message.deleteOne({_id: censored._id},
                // console.log('censored message removed!')
            );
        } else {
            io.emit('message', req.body);
        }
        res.sendStatus(200)
    } catch (error) {
        res.sendStatus(500);
        console.error('Error saving message:', error);
    } finally {
        console.log('message post called')
    }
    
    
});



io.on('connect', (socket) => {
    console.log('New user connected!')
})

mongoose
    .connect(dbUrl)
    .then((seccess) => console.log('Successfully connected to MongoDB Atlas Database!'))
    .catch((err) => console.log('Connection failed to MongoDB Database!'));

let server = http.listen(3000, () => {
    console.log('server is listening on port',server.address().port)
});