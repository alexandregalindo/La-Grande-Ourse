
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const express = require('express');
const cors = require('cors');
const app = express();


const session = require('express-session');



app.use(express.json()); // substituído bodyParser.json()
app.use(express.urlencoded({ extended: true }));
//app.use(cors());
app.use(express.static('public'));

app.use(cors({
    origin: ["http://lagrandeourse.institutgrassetinfo.com:4080"],
    credentials: true
}));
app.use(cookieParser());
app.use(bodyParser.json())
app.use(session({
    secret: 'Sc4aL89xD',
    saveUninitialized: false,
    resave: false,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24 // Duração da sessão
    }
}));
const checkOrigin = (req, res, next) => {
    const allowedOrigins = ["http://lagrandeourse.institutgrassetinfo.com:4080"];
    const origin = req.get("Origin");

    if (allowedOrigins.includes(origin)) {
        res.setHeader("Access-Control-Allow-Origin", origin);
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
        res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
        res.header("Access-Control-Allow-Credentials", "true");
        next();
    } else {
        res.status(403).json({ error: "Forbidden" });
    }
};


// Importe suas rotas aqui

const departmentRoutes = require('./routes/departmentRoutes');
const dailyEntryRoutes = require('./routes/dailyEntryRoutes');
const dailyTotalsRoutes = require('./routes/dailyTotalsRoutes');
const periodeRoutes = require('./routes/periodeRoutes');
const totalDansLaPeriodeRoutes = require('./routes/totalDansLaPeriodeRoutes');
const userRoutes = require('./routes/userRoutes');
const queryGraphique = require('./routes/queryGraphiqueRoutes')


// Use suas rotas com os prefixos corretos
app.use('/api/departments', checkOrigin, departmentRoutes);
app.use('/api/dailyEntry', checkOrigin, dailyEntryRoutes);
app.use('/api/dailytotals', checkOrigin, dailyTotalsRoutes);
app.use('/api/periodes', checkOrigin, periodeRoutes);
app.use('/api/totaldanslaperiode', checkOrigin, totalDansLaPeriodeRoutes);
app.use('/api/user', checkOrigin, userRoutes);
app.use('/api/data', checkOrigin, queryGraphique);



app.listen(4081, () => {
    console.log('Server is running on port 4081');
});
