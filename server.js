// set up ========================
require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const basicAuth = require('_helpers/basic-auth');
const errorHandler = require('_helpers/error-handler');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


const employees = [
    {
        "key": 1,
        "name": "ABC",
        "date_of_birth": "10/10/2010",
        "position_held": "Manager"
    },
    {
        "key": 2,
        "name": "John",
        "date_of_birth": "10/10/2010",
        "position_held": "Manager"
    },
    {
        "key": 3,
        "name": "Michael",
        "date_of_birth": "10/10/2010",
        "position_held": "Manager"
    },
    {
        "key": 4,
        "name": "Michael",
        "date_of_birth": "10/10/2010",
        "position_held": "Manager"
    },
    {
        "key": 5,
        "name": "Michael",
        "date_of_birth": "10/10/2010",
        "position_held": "Manager"
    },
    {
        "key": 6,
        "name": "Michael",
        "date_of_birth": "10/10/2010",
        "position_held": "Manager"
    }
];

// use basic HTTP auth to secure the api
app.use(basicAuth);

// api routes
app.use('/users', require('./users/users.controller'));

// global error handler
app.use(errorHandler);
//
//
// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,X-Auth-Token");
//     res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
//     next();
// });

// app.post('users/authenticate', function (req, res) {
//
//     console.log("authentication",req.body);
//     //console.log("employees", employees);
//     if (req.body.username === "test" && req.body.password === "abc") {
//         res.send({'user':'test','password': 'abc'});
//     } else {
//         res.status(401).send('Not a User');
//     }
// });


// app.use(basicAuth({
//     users: {'test': 'abc'}
// }));

app.get('/getEmployees', function (req, res) {
    console.log("employees", employees);
    res.send(employees);
});


app.get('/getEmployee', function (req, res) {
    console.log("req", req);
    let key = req.query.param;
    let employee = employees.find((emp) => {
        return emp.key == key;
    });
    res.send(employee);
});

// app.put('/authenticate', function (req, res) {
//     console.log("authenticate request", req.body);
//     let cred = req.body;
//     console.log("credentials", cred, cred.username, cred.password);
//     if (cred.username == "abc" && cred.password == "pass") {
//         res.send({});
//     } else {
//         res.status(401).send('Not a User');
//     }
// });

app.delete('/deleteEmployee', function (req, res) {
    console.log("delete employees", employees);
    var employee = employees.find((employee) => {
        return employee.key == req.query.key;
    });
    employees.splice(employees.indexOf(employee), 1);
    res.send(employees);
    //console.log("employee",employee);
    //console.log("id value",req.query);
})

app.put('/addEmployee', function (req, res) {
    console.log("add employees", req.body);

    let employee = req.body;
    console.log("employees", employees);
    employee["key"] = employees[employees.length - 1]["key"] + 1;
    employees.push(employee);

    console.log(employee, employee.name);
    res.send(employees);

});


// app.get('*', function (req, res) {
//     res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
// });

// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");