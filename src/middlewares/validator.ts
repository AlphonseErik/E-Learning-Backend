import { validate, ValidationSchema, registerSchema, ValidationError } from 'class-validator';
import _ from 'lodash';

const validatorOptions = {
    skipMissingProperties: true,
};

const formatResponeErrors = (errorsClassValidator: ValidationError[]) => {
    let errors = errorsClassValidator.map((item) => {
        return {
            field: item.property,
            messages: _.values(item.constraints),
        }
    });
    return {
        message: 'Validation errors in your request',
        errors: errors,
        status: 400,
    }
}

export const validator = (schema: ValidationSchema) => {
    return async (req: any, res: any, next: Function) => {
        registerSchema(schema);
        const errors = await validate(schema.name, req.body, validatorOptions);
        if (errors.length > 0) {
            return res.status(400).json(formatResponeErrors(errors));
        }
        next();
    }
}

export const validatorBody = (schema: ValidationSchema) => {
    return async (req: any, res: any, next: Function) => {
        registerSchema(schema);
        const errors = await validate(schema.name, req.body, validatorOptions);
        if (errors.length > 0) {
            return res.status(400).json(formatResponeErrors(errors));
        }
        next();
    }
}

export const validatorParam = (schema: ValidationSchema) => {
    return async (req: any, res: any, next: Function) => {
        registerSchema(schema);
        const errors = await validate(schema.name, req.params, validatorOptions);
        if (errors.length > 0) {
            return res.status(400).json(formatResponeErrors(errors));
        }
        next();
    }
}

export const validatorQuery = (schema: ValidationSchema) => {
    return async (req: any, res: any, next: Function) => {
        registerSchema(schema);
        const errors = await validate(schema.name, req.query, validatorOptions);
        if (errors.length > 0) {
            return res.status(400).json(formatResponeErrors(errors));
        }
        next();
    }
}