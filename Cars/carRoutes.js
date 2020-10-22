const express = require('express');
const router = express.Router();
const Car = require('./models/Car')

router.get('/cars/get-cars', (req, res) => {
    Car.find()
    .then((foundCar) => {
        return res.render('/*ejs goes here */', {carList: foundCar});
    }).catch((err) => res.json({err}));
});

router.post('/cars/add-car', (req, res) => {
    Car.findOne({car: req.body.car})
    .then((foundCar) => {
        if (foundCar) {
            return res.send('Car Already Exists');
        } else {
            if (!req.body.car) {
            return res.send('Put in the proper credentials');
        }
        const newCar = new Car({
            name: req.body.name,
            type: req.body.type,
            year: req.body.year
        });
        newCar
        .save()
        .then(() => {
            return res.status(200).json({confirmation: 'Success', message: `You've Created A New Car`});
            })
            .catch((err) => {
                return res.status(400).json({ message: 'Sorry Car Not Created', err });
            });
        }
    }).catch((err) => {
        return res.status(500).json({ message: 'Server Error', err });
    });
});

module.exports = router;