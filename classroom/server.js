const express = require('express');
const app = express();
const users = require('./routes/user.js');
const posts = require('./routes/post.js');
const session = require('express-session');
const flash = require('connect-flash');
const path = require('path');

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Session middleware options
const sessionOptions = {
    secret: "mysupersecreating",
    resave: false,
    saveUninitialized: true,
};

app.use(session(sessionOptions));
app.use(flash());

app.use((req, res, next) => {
    res.locals.successMsg = req.flash("success");
    res.locals.errorMsg = req.flash("ERROR");
    next();
});

// Register route
app.get("/register", (req, res) => {
    let { name = "anonymous" } = req.query;
    req.session.name = name;

    if (name === "anonymous"){
        req.flash("ERROR", "user not registered");
    }else{
        req.flash("success", "User register suscessful"); // To display a success message
    }
    res.redirect("/hello");
});

// Hello route
app.get("/hello", (req, res) => {

    res.render("page.ejs", { name: req.session.name}); // Correctly access the session variable
});

// Uncomment this section if you want request count tracking
// app.get('/reqcount', (req, res) => {
//     if (req.session.count) {
//         req.session.count++;
//     } else {
//         req.session.count = 1;
//     }
//     res.send(`You have sent a request ${req.session.count} times`);
// });

// Uncomment this for a test route
// app.get('/test', (req, res) => {
//     res.send("Test successful");
// });

// Use the routes
app.use('/users', users);
app.use('/posts', posts);

const port = 3000;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
