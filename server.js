const app = require('./app');
const PORT = process.env.PORT || 7890;


app.listen(PORT, (req, res) => {
    console.log(`Server is running at port ${PORT}`);
});