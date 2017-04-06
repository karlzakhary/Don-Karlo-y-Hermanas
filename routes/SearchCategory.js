var searchCategory = module.exports = {
router.get('/search/byCategory', function(req,res){

             var SearchItem=req.query.SearchItem;
 

        var Company = mongoose.model('Company');

        Company.find({Category: SearchItem} ,function(err,result){
          if(err){
            res.json(err);
          }
          else{
            res.json(result);
          }
        });

});
};
