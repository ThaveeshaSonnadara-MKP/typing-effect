import { FieldSetStatusType } from '@wix/design-system';

import { checkRange } from './tools';

export interface ValidationResult {
    status?: FieldSetStatusType;
    message?: string;
}

export function validateNumberOfLoops(value: number): ValidationResult {
    return checkRange(value, 0, 10)
        ? {}
        : { status: "warning" as FieldSetStatusType, message: "Enter a number between 0 and 10" };
}

export function validateTypingSpeed(value: number): ValidationResult {
    return checkRange(value, 10, 1000)
        ? {}
        : { status: "warning" as FieldSetStatusType, message: "Enter a number between 10 and 1000" };
}

export function validateDeleteSpeed(value: number): ValidationResult {
    return checkRange(value, 10, 1000)
        ? {}
        : { status: "warning" as FieldSetStatusType, message: "Enter a number between 10 and 1000" };
}

export function validateAnimationDelay(value: number): ValidationResult {
    return checkRange(value, 0, 5000)
        ? {}
        : { status: "warning" as FieldSetStatusType, message: "Enter a number between 0 and 5000" };
}

export function validateFontSize(value: number): ValidationResult {
    return checkRange(value, 1, 72)
        ? {}
        : { status: "warning" as FieldSetStatusType, message: "Enter a number between 1 and 72" };
}

export function validateTextGap(value: number): ValidationResult {
    return checkRange(value, 1, 50)
        ? {}
        : { status: "warning" as FieldSetStatusType, message: "Enter a number between 1 and 50" };
}
