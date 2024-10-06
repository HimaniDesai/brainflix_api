import express from 'express'
import cors from 'cors'
import videoRoutes from './routes/videoRoutes.js'
const app = express();

app.use(cors())
app.use(express.json())

//IMPORT ROUTES
app.use('/videos', videoRoutes);
// start Express on port 8080
app.listen(8080, () => {
    console.log('Server Started on http://localhost:8080');
    console.log('Press CTRL + C to stop server');
});