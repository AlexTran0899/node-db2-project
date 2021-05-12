const Cars = require('./cars-model')
const yup = require('yup')
const vinValidator = require('vin-validator')

const messageSchema = yup.object({
  vin: yup.string()
    .trim()
    .required('vin is missing'),
  make: yup.string()
    .trim()
    .required('make is missing'),
  model: yup.string()
    .trim()
    .required('model is missing'),
  mileage: yup.number()
    .required('mileage is missing'),
  title: yup.string(),
  transmission: yup.string(),
})

exports.checkCarId = async (req, res, next) => {
  try {
    const car = await Cars.getById(req.params.id)
    if (!car) {
      next({ status: 404, message: `car with the id of ${req.params.id} not found` })
    } else {
      req.car = car
      next()
    }

  } catch (err) {
    next(err)
  }
}

exports.checkCarPayload = async (req, res, next) => {
  try {
    const validate = await messageSchema.validate(req.body, { stripUnknown: true })
    req.body = validate
    next()
  } catch (err) {
    next({ status: 400, message: err.message })
  }
}

exports.checkVinNumberValid = (req, res, next) => {
  if (vinValidator.validate(req.body.vin)) {
    next()
  } else {
    next({ status: 400, message: `vin ${req.body.vin} is invalid` })
  }
}

exports.checkVinNumberUnique = (req, res, next) => {
  Cars.getByVin(req.body.vin)
    .then(data => {
      if (data) {
        next({ status: 400, message: `vin ${req.body.vin} already exists` })
      } else {
        next()
      }
    })
    .catch(next)
}