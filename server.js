import express from 'express'
const app = express();

app.get('/', (req, res) => {
    // send some text back as a response
    res.send('Express is running!');
});
app.get('/greeting', (req, res) => {
    res.send('Hello World');
})
// start Express on port 8080
app.listen(8080, () => {
    console.log('Server Started on http://localhost:8080');
    console.log('Press CTRL + C to stop server');
});