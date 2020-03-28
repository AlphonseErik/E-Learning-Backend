const autoBind = require('auto-bind');
import BaseController from '../../common/base/controller.base';
import { Validator } from 'class-validator';

export default class BaseController {
	constructor(name) {
		this.name = name;
		this.validator = new Validator();
		autoBind(this);
	}
}