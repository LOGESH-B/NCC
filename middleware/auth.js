



//module.exports.isAuthor = async (req, res, next) => {
    

    // const admin="61e9a02c0a2ffa3f420cf4bf"

    // if(!(admin==req.user._id))
    // {
    //     return res.redirect("/") 
    // }
    
//     next();
// }


module.exports.isLoggedIn=async (req, res, next) => {
    if (!req.isAuthenticated()){
        req.flash('error','You are Not Authorised')
       return  res.redirect('/')
      } 
    next();
}
