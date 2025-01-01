const cookieParser = require('cookie-parser');



// Middleware for parsing cookies with a secret key for signed cookies
// app.use(cookieParser("secretcode"));

// // Route to set a signed cookie
// app.get("/getSignedCookie", (req, res) => {
//     res.cookie("made-in", "India", { signed: true });
//     res.send("Signed cookie has been set.");
// });

// app.get("/verify", (req, res) => {
//     console.log(req.signedCookies);
//     res.send("Verified signed cookie.");
// });
// // Route to set regular cookies
// app.get("/getCookie", (req, res) => {
//     res.cookie("greet", "namaste");
//     res.cookie("madeIn", "India");
//     res.send("Sent you some cookies");
// });

// // Define cookies
// app.get("/greet", (req, res) => {
//     let { name = "anonymous" } = req.cookies;
//     res.send(`Hello ${name}`);
// });

// // Root route to display cookies
// app.get('/', (req, res) => {
//     console.dir(req.cookies);
//     res.send('Hello root!');
// });

// // Users
// app.use('/users', users);

// // Posts
// app.use('/posts', posts);
listings
alert-heading