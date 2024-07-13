import express from 'express'
import connectDB from "./config/db.js"
import {validateSMS, validateCheckBlacklisted} from "./middlewares/validateRequest.js";
import smsController from "./controllers/smsController.js";

const app = express()
const PORT = 3000
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.post('/blacklist', validateSMS, smsController.receiveSMS);
app.get('/blacklist', smsController.getBlacklistedNumbers);
app.post('/blacklist/check', validateCheckBlacklisted, smsController.checkBlacklistedNumber);

connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});