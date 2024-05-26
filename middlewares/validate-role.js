
function validateRole(role) {
    return function (req, res, next) {
        //if there is user and user.rol is same as role required allow access
        if (req.user && req.user.rol === role) {  
            console.log('Role authorized:', role);
            next();
        } else {
            res.status(403).json({ message: 'Forbidden' });
        }
    };
}
  
module.exports = { validateRole };