var express = require('express');
var router = express.Router();
var controller = require('../controllers/users');

router.route('/')
  .get(controller.index)
  .post(controller.create);

router.route('/:id')
  .get(controller.show)
  .put(require('connect-ensure-login').ensureLoggedIn(), controller.update)
  .delete(require('connect-ensure-login').ensureLoggedIn(), controller.destroy);

module.exports = router;
