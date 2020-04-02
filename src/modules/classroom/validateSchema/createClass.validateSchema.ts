import { ValidationSchema, Min, IsNotEmpty } from 'class-validator';


export const CreateClassValidatorSchema: ValidationSchema = {
    name: "CreateClassValidatorSchema",
    properties: {
        className: [
            {
                type: 'isDefined',
                message: 'CLASSNAME_IS_INVALID'
            },
            {
                type: 'isNotEmpty',
                constraints: [IsNotEmpty],
                message: 'CLASSNAME_IS_EMPTY',
            },
            {
                type: 'minLength',
                constraints: [4],
                message: 'CLASSNAME_MIN_IS_4'
            },
            {
                type: 'maxLength',
                constraints: [25],
                message: 'CLASSNAME_MIN_IS_25'
            }
        ]
    }
}