const mysql = require('mysql');
const express = require('express');

var app = module.exports = express();

//MySQL
const pool = mysql.createPool({
    connectionLimit :10,
    host            :'localhost',
    user            :'root',
    password        :'',
    database        :'db_flat'
})

// guest crud
app.get('/guest', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id ' + connection.threadId)
        connection.query('SELECT p.name,g.checkin,g.checkout from guest as g INNER JOIN person as p ON p.idperson = g.idperson', (err, rows) => {
            connection.release() // return the connection to pool

            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }

            // if(err) throw err
            console.log('The data from guest table are: \n', rows)
        })
    })
})

app.get('/guest/name/:name', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        connection.query(`SELECT p.name,g.checkin,g.checkout from guest as g INNER JOIN person as p ON p.idperson = g.idperson WHERE name like  N'%${req.params.name}%'`, [req.params.name], (err, rows) => {
            connection.release() // return the connection to pool
            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }
            
            console.log('The data from persons table are: \n', rows)
        })
    })
});

app.put('/guest/name', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)

        const { name, checkin, checkout} = req.body

        connection.query(`UPDATE guest as g INNER JOIN person as p ON p.idperson = g.idperson SET g.checkin  = ? , g.checkout  = ? WHERE p.name like N'${name}%'`, [checkin, checkout,name] , (err, rows) => {
            connection.release() // return the connection to pool

            if(!err) {
                res.send(`person with the name: ${name} has been updated.`)
            } else {
                console.log(err)
            }

        })

        console.log(req.body)
    })
})