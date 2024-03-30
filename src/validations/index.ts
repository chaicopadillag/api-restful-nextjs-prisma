import * as yup from 'yup';

export const todoSchemaCrete = yup.object({
    description: yup.string().required().min(3, 'Minimo 3 caracteres'),
    complete: yup.boolean().optional().default(false),
});

export const todoSchemaUpdate = yup.object({
    description: yup.string().optional().min(3, 'Minimo 3 caracteres'),
    complete: yup.boolean().optional(),
});