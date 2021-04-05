import { GraphQLScalarType, Kind } from "graphql";

function convertStringToDate(dateString: string) {
  try {
      return new Date(dateString);
  }
  catch (_a) {
      throw new Error("Provided date string is invalid and cannot be parsed");
  }
}

export const GraphQLISODate = new GraphQLScalarType({
  name: "Date",
  description: "ISO calendar date",
  serialize(value) {
    let dateValue = value;
    if (!(value instanceof Date)) {
        dateValue = new Date(value);
    }
    return dateValue.toISOString().substring(0, 10);
  },
  parseValue(value: string) {
      if (typeof value !== "string") {
          throw new Error(`Unable to parse value '${value}' as GraphQLISODate scalar supports only string values`);
      }
      return convertStringToDate(value);
  },
  parseLiteral(ast) {
      if (ast.kind !== Kind.STRING) {
          throw new Error(`Unable to parse literal value of kind '${ast.kind}' as GraphQLISODate scalar supports only '${Kind.STRING}' ones`);
      }
      return convertStringToDate(ast.value);
  },
});