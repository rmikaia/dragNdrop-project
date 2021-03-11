export type ValidatorProps = {
  required: boolean;
  maxLength: number;
};

export type Validators = {
  [T: string]: Partial<ValidatorProps>;
};
