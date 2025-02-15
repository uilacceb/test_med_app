const express = require('express');
const cors = require('cors');
const http = require('http');
const connectToMongo = require('./db');
const app = express();


app.set('view engine', 'ejs')
app.use(express.static('public'))

const PORT = process.env.PORT || 8181;


// Middleware
app.use(express.json());

// const allowedOrigins = [
//     'https://qu6qu6g-3000.theiadockernext-0-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai',
//     // add other origins if needed
// ];

// app.use(cors({
//     origin: function (origin, callback) {
//         if (!origin || allowedOrigins.indexOf(origin) !== -1) {
//             callback(null, true);
//         } else {
//             callback(new Error('Not allowed by CORS'));
//         }
//     },
//     credentials: true,
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization']
// }));

app.use(cors());


// Connect to MongoDB
connectToMongo();

// Routes
app.use('/api/auth', require('./routes/auth'));

app.get('/', (req, res) => {
    res.send('Hello World!');
});



// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
