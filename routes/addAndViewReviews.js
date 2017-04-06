/* Reviews For company */
var addReview = module.exports = {
router.post('/categories/category/company/review/:id', function(req, res, next) {

    var newReview = new Review({

    reviewBody :req.body.reviewbody,
    author : req.body.author,
    company_id : req.params.id,
    upvotes : req.body.upvotes
  });

    Review.createReview(newReview,function(err, review) {

        if(err){ return next(err); }
        res.json(review);
        console.log(review);
     
    });
    req.flash('success_msg', 'Review added successfully');
});
/* END Reviews For company */

/* Show Reviews For Companies */
router.get('/categories/category/company/:id/review',function(req, res, next) {
  //search id begeeb result we ygeeb object wab3ato lel review tani
   // ab3at haga lel view
   var comp = req.params.id;
   
   Review.find({company_id:comp},function(err, reviews){
     if(err)
     {
       res.json(err);
     }else if (!reviews) {
        res.json("No Reviews!");
     }else {
      res.json("Reviews");
     }
   });



});
};
/* END Show Reviews For Companies */
