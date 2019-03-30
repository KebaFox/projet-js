//Mes modules

require('babel-register')
const {checkAndChange} = require('./assets/functions')
const mysql = require('promise-mysql')
const bodyParser = require('body-parser')
const express = require('express')
const morgan = require('morgan')('dev')
const config = require('./assets/config')
const mongo = require('mongodb')
const twig = require('twig')
const axios = require('axios')
const sendgrid = require('sendgrid')
mysql.createConnection({
    host: config.db.host,
    database: config.db.database,
    user: config.db.user,
    password: config.db.password
}).then((db) => {

    console.log('Connected.')
// variables globales
    const app = express()
    const fetch = axios.create({
        baseURL: 'http://localhost:8090/api/v2'
    })

    let MembersRouter = express.Router()
    let Members = require('./assets/classes/members-class')(db, config)
// middlewares
    app.use(morgan)
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

// sendmail
router.get('/', function (req, res) {
    sendgrid.send({
    to: req.body.email,
    from: 'titinhocfa.5@gmail.com',
    subject: 'message de confirmation',
    text: 'Félicitations votre requete a bien été enregistrée, nous vous attendons donc dans nos différents restaus. Bon appetit !!',

    }, function(err, json) {
        if (err) {return res.send('Message envoyé');}
        res.send('Bravoo');
    })
})
module.exports = router;
// app.get('/', function(req, res, next) {
//     res.render('index.ejs');
// });
// var transporter = nodemailer.createTransport(
//     service : 'gmail',
//     auth : {
//         user: 'titinhocfa.5@gmail.com',
//         pass: 'desco007'
//     });
    
// var mailOptions = {
//     to: req.body.email,
//     from: 'titinhocfa.5@gmail.com',
//     subject: 'message de confirmation',
//     text: 'Félicitations votre requete a bien été enregistrée, nous vous attendons donc dans nos différents restaus. Bon appetit !!',
//     html: '<b>A bientot Mr' + req.body.nom + '</b>'
// };
// transporter.sendMail(mailOptions, function(error, info){
//     if(error){
//        return console.log(error);
//     }
//     console.log('Message sent: ' + info.response);
// });

// transporter.close();

// app.post('/email', function(req, res, next) {
//     /* Notre code pour nodemailer */
// });

app.use(function(req, res) {
    res.sendStatus(404);
});

// routes
    app.get('/', (req, res) => {
        res.render('events-details.twig', {
            nom : req.params.nom
        })
    })

    app.get('/members', (req, res) => {
        axios.get('http://localhost:8090/api/v2/members')
            .then((response) => {
                if (response.data.status == 'success') {
                    res.render('members.twig', {
                        members : response.data.result
                    })
                }
                else {
                    renderError(res, response.data.message)
                }
            })
            .catch((err) => {
                res.render('error.twig', {
                    errorMsg: err.message
                    
                } )
            })
    })


    app.use(config.rootAPI+'members', MembersRouter)

    app.listen(config.port, () => console.log('Started on port '+config.port))

})

// fonctions

function renderError(res, errMsg) {
    res.render('error.twig', {
        errorMsg: errMsg
    })
}