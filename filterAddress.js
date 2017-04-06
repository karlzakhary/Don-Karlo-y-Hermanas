var searchAddress = module.exports = {
router.get('/search/byAddress', function(req,res){

     var SearchItem2=req.query.SearchItem;


        var Company = mongoose.model('Company');

        Company.find({businessAddress: SearchItem2},function(err,result){
          if(err){
            res.json(err);
          }
          else{
            res.json(result);
          }
        });

});
};
