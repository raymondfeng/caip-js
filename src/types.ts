export interface ParameterSpec {
  name: string;
  regex: string;
}

export interface IdentifierSpec extends ParameterSpec {
  delimiter: string;
  parameters: (string | IdentifierSpec)[];
}

export type Params = Record<string, string | Record<string, string>>;
