
module.exports = function(app){
app.post('/upload',  (req, res) =>{
    console.log(req.file);
    console.log('subido :D');
});
}