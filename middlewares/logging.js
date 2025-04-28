function logging(req, res, next){

    res.on('finish', ()=>{
        let date = new Date;
        let day = String(date.getDate()).padStart(2,'0');
        let month = String(date.getMonth()+1).padStart(2, '0');
        let year = date.getFullYear();
        let hours = String(date.getHours()).padStart(2, '0');
        let minutes = String(date.getMinutes()).padStart(2, '0');
        let seconds = String(date.getSeconds()).padStart(2, '0');
        
        let method = req.method.toString();
        let path = req.originalUrl;
        let status = res.statusCode;
    
        console.log(`[${day}/${month}/${year} ${hours}:${minutes}:${seconds}] *${method} ${path}* ${status}`);
    });
    
    next();
}

module.exports = logging;