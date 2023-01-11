export interface IValidator {
    validation: <T extends object>(payload: T) => Promise<boolean>;
}

export interface IValidate {
    validate: <T extends object>(payload: T) => Promise<{ status: number; message: string; }>;
}