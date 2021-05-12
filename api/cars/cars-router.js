const router = require('express').Router()
const Cars = require('./cars-model')
const { checkCarId,
    checkCarPayload,
    checkVinNumberUnique,
    checkVinNumberValid
} = require('./cars-middleware')

router.get('/', (req, res, next) => {
    Cars.getAll()
        .then(cars => {
            res.status(200).json(cars)
        })
        .catch(next)
})

router.get('/:id', checkCarId, (req, res, next) => {
    Cars.getById(req.params.id)
        .then(car => {
            res.status(200).json(car)
        })
        .catch(next)
})

router.post('/', checkCarPayload, checkVinNumberUnique, checkVinNumberValid, (req, res, next) => {
    Cars.create(req.body)
        .then(car => {
            res.status(200).json(car)
        })
        .catch(next)
})

module.exports = router;