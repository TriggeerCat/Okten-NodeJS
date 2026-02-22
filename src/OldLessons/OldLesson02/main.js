const express = require('express');
const {userService} = require("./services/user.service");

const app = express();

app.use(express.json);
app.use(express.urlencoded);

const user1 = {
    name: "Artem",
    skills: "Breaking knees"
}

const user1point1 = {
    name: 'Artem',
    skills: 'Selling moskals by parts'
}

const user2 = {
    name: "Yura",
    favorite_series: "Breaking bad"
}

const user3 = {
    name: "Roman",
    criticising_java: true
}

// userService.createUser(user3).then(console.log);

// userService.getAllUsers().then(console.log);

// userService.getOneUserById(2).then(console.log);

// userService.updateUser(0, user1point1).then(console.log);

// userService.deleteUser(1).then(console.log);