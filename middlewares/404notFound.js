function Error404(req, res, next){
    res.status(404).render('404error');
}

module.exports = Error404;