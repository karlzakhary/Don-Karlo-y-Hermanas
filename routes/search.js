var searhMethod = module.exports = {
router.get('/search/byAll', function(req,res) {
        var SearchItem=req.query.SearchItem;
 

        var Company = mongoose.model('Company');

        Company.find({$or:[{CompanyName: SearchItem},{businessAddress: SearchItem},{Category:SearchItem}]},function(err,result){
          if(err){
            res.json(err);
          }
          else{
            res.json(result);
          }
        });

});
};
