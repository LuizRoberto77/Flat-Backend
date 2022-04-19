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

// Persons Crud
app.get('/persons', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id ' + connection.threadId)
        connection.query('SELECT * from person', (err, rows) => {
            connection.release() // return the connection to pool

            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }

            // if(err) throw err
            console.log('The data from person table are: \n', rows)
        })
    })
})

app.get('/persons/docs/:document', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        connection.query('SELECT name,contact,note FROM person WHERE document = ?', [req.params.document], (err, rows) => {
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

app.get('/persons/name/:name', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        connection.query(`SELECT name,contact,note FROM person WHERE name like  N'%${req.params.name}%'`, [req.params.name], (err, rows) => {
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

app.delete('/persons/docs/:document', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        connection.query('DELETE FROM person WHERE document = ?', [req.params.document], (err, rows) => {
            connection.release() // return the connection to pool
            if (!err) {
                res.send(`person with the record document ${[req.params.document]} has been removed.`)
            } else {
                console.log(err)
            }
            
            console.log('The data from beer table are: \n', rows)
        })
    })
});

app.post('/persons', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        
        const params = req.body
        connection.query('INSERT INTO person SET ?', params, (err, rows) => {
        connection.release() // return the connection to pool
        if (!err) {
            res.send(`person with the record ID  has been added.`)
        } else {
            console.log(err)
        }
        
        console.log('The data from persons table are:11 \n', rows)

        })
    })
});

app.put('/persons/docs/', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)

        const { name, document, contact, note } = req.body

        connection.query('UPDATE person SET name = ?, contact = ?, note = ? WHERE document = ?', [name, contact, note, document] , (err, rows) => {
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