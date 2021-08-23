import { IdentifierSpec, Params } from "./types";

function buildParams(spec: IdentifierSpec, values: string[]) {
  const params: Params = {};
  let offset = 0;
  for (let j = 0; j < spec.parameters.length; j++) {
    const param = spec.parameters[j];
    if (typeof param === "string") {
      params[param] = values[offset];
      offset++;
      continue;
    }
    const item = buildParams(param, values.slice(offset));
    params[param.name] = (item.params as unknown) as Record<string, string>;
    offset += item.offset;
  }
  return { offset, params };
}

export function getParams<T>(id: string, spec: IdentifierSpec): T {
  const regex = new RegExp(`^${spec.regex}$`);
  const result = regex.exec(id);
  if (result == null) {
    throw new Error(`Invalid ${spec.name}(${spec.regex}): ${id}`);
  }
  return (buildParams(spec, result.slice(1)).params as unknown) as T;
}

export function joinParams(params: Params, spec: IdentifierSpec): string {
  const id = spec.parameters
    .map(param => {
      if (typeof param === "string") {
        return params[param];
      }
      const value = params[param.name];
      if (typeof value === "string") {
        return value;
      }
      return joinParams(value as Params, param);
    })
    .join(spec.delimiter);
  return id;
}

export function isValidId(id: string, spec: IdentifierSpec): boolean {
  const regex = new RegExp(`^${spec.regex}$`);
  return regex.test(id);
}
