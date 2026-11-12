const verifyRole = (req , res , next)=>{
    
    // lahna bch nverifiw role eli jey m request kn mahoch manager mayetaadech
    if(req.user.role !== 'manager'){
        return res.status(403).send('maandkch acces')
    }

    next()
}

module.exports = {verifyRole}