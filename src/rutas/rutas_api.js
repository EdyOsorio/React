const express = require('express');
const router = express.Router();
const datos = [];

router.get('/', (req, res) => {
    res.json(datos)
});

router.post('/', (req, res) => {
    const crypto= req.body;
    console.log('cc', crypto);
    console.log('antes',datos);
    if(datos.length > 0){
        if(datos.find(element => element.nombre === crypto.nombre)){
            console.log('ya existe la crypto')
            console.log('despues ya existe',datos);
            res.json({status:205})
        }else{
            datos.push(crypto)
            res.json({status:200})
        }
    }else {
        datos.push(crypto)
        console.log('despues',datos);
        res.json({status:200})
    }
});

module.exports = router;