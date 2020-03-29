import { ValidationSchema, Min, IsNotEmpty } from 'class-validator';


export const SignInValidatorSchema: ValidationSchema = {
    name: 'SignInValidatorSchema',
    properties: {
        username: [
            {
                type: 'isDefined',
                message: 'USERNAME_EMPTY'
            },
            {
                type: 'isNotEmpty',
                constraints: [IsNotEmpty],
                message: 'AMOUNT_IS_INVALID',
            },
            {
                type: 'minLength',
                constraints: [5],
                message: 'USERNAME_MIN_IS_6'
            },
            {
                type: 'maxLength',
                constraints: [25],
                message: 'USERNAME_MIN_IS_25'
            },
        ],
        password: [
            {
                type: 'isDefined',
                message: 'PASSWORD_EMPTY'
            },
            {
                type: 'isNotEmpty',
                constraints: [IsNotEmpty],
                message: 'AMOUNT_IS_INVALID',
            },
            {
                type: 'minLength',
                constraints: [6],
                message: 'PASSWORD_MIN_IS_6'
            },
            {
                type: 'maxLength',
                constraints: [25],
                message: 'PASSWORD_MIN_IS_25'
            },
        ]
    }
}