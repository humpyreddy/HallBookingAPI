const rooms = require('./rooms.js').rooms
const booking = require('./rooms.js').booking

const express = require('express')
const app  = express()
const bodyParser = require('body-parser')


let list = ()=>{
    roomsList = []

    for(let i=0;i<rooms.length;i++){
        newobj = {}

        for(let j=0;j<booking.length;j++){
            if(rooms[i].id === booking[j].room_id)
            {  
                newobj.roomName = rooms[i].name
                newobj.bookedStatus = 'booked';
                newobj.customerName = booking[j].customerName;
                newobj.date = booking[j].date
                newobj.start_time = booking[j].start_time;
                newobj.end_time = booking[j].end_time;
                roomsList.push(newobj)

            }
 
        }
    
    }
    return roomsList;
}

// console.log(list())

app
    .use(bodyParser.json())
    .get('/getRooms',(req,res)=>{
        res.status(200).json({
            data : rooms
        })
    })
    .post('/createRooms',(req,res)=>{

        req.body.data.forEach(room=> {
            rooms.push(room);
        });

        res.status(200).json({status:"room/rooms created"});
        
    })
   
    .post('/bookRoom',(req,res)=>{
        req.body.data.forEach(item=>{
            booking.push(item)
        })
        res.status(200).json({status:"Room Booked"});

    })
    //List of all rooms
    .get('/rooms',(req,res)=>{

        let rlist = list(); 
        res.status(200).json({
            data : rlist
        })

    })
    //List of all the customers
    .get('/customers',(req,res)=>{
        res.status(200).json({
            bookingData: booking
         })
    })

    .listen(6000)
