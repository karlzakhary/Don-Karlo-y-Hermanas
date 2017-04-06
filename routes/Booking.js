var bookingMethod = module.exports ={
router.post('/categories/category/company/:companyID/service/:serviceID/booking',  function (req,res){
  var booking = new Booking() ;
  var serviceId = req.params.serviceID ;
  var companyID = req.params.companyID ;
  
  
      Service.findById(serviceId).exec(function (err, service){
        if (err) {
          res.json(err);
        }
        else if (!service){
          json({message:"No service found"});
        }
        else {
          booking.facility.push(service);
          //booking.bookedBy = req.payload.username ;
          booking.bookingDate = req.body.date ;
          booking.slot = req.body.slot ;
         // booking.free = False ;
          //service.booking.push;
        booking.save(function(err,updatedBooking){
          if(err){
            res.json(err);
          }
          else{
          res.json(updatedBooking);
          }
        });
      }

      }) ;
});
};
