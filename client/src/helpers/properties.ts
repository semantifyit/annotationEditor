// import { joinNS, Namespace } from "./helper";
export type Namespace = 'xsd' | 'rdf' | 'rdfs' | 'owl' | 'schema' | 'sh';

export const commonNamespaces = {
  xsd: 'http://www.w3.org/2001/XMLSchema#',
  rdf: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
  rdfs: 'http://www.w3.org/2000/01/rdf-schema#',
  owl: 'http://www.w3.org/2002/07/owl#',
  schema: 'http://schema.org/',
  sh: 'http://www.w3.org/ns/shacl#',
};

export const joinNS = (namespace: Namespace, nodeId: string): string =>
  commonNamespaces[namespace] + nodeId;

// XSD
export const xsdString = joinNS('xsd', 'string');
export const xsdDecimal = joinNS('xsd', 'decimal');
export const xsdInteger = joinNS('xsd', 'integer');
export const xsdBoolean = joinNS('xsd', 'boolean');
export const xsdDate = joinNS('xsd', 'date');
export const xsdTime = joinNS('xsd', 'time');

// RDF
export const rdfProperty = joinNS('rdf', 'Property');

// RDFS
export const rdfsLabel = joinNS('rdfs', 'label');
export const rdfsComment = joinNS('rdfs', 'comment');
export const rdfsClass = joinNS('rdfs', 'Class');
export const rdfsSubClassOf = joinNS('rdfs', 'subClassOf');

// SCHEMA
export const schemaBoolean = joinNS('schema', 'Boolean');
export const schemaDate = joinNS('schema', 'Date');
export const schemaTime = joinNS('schema', 'Time');
export const schemaDateTime = joinNS('schema', 'DateTime');
export const schemaFloat = joinNS('schema', 'Float');
export const schemaNumber = joinNS('schema', 'Number');
export const schemaInteger = joinNS('schema', 'Integer');
export const schemaURL = joinNS('schema', 'URL');
export const schemaDomainIncludes = joinNS('schema', 'domainIncludes');
export const schemaEnumeration = joinNS('schema', 'Enumeration');
export const schemaQuantity = joinNS('schema', 'Quantity');
export const schemaDataType = joinNS('schema', 'DataType');
export const schemaRangeIncludes = joinNS('schema', 'rangeIncludes');
export const schemaText = joinNS('schema', 'Text');
export const schemaAction = joinNS('schema', 'Action');
export const schemaWebAPI = joinNS('schema', 'WebAPI');
export const schemaPropertyValueSpecification = joinNS(
  'schema',
  'PropertyValueSpecification',
);

// SHACL
export const shDatatype = joinNS('sh', 'datatype');
export const shClass = joinNS('sh', 'class');
export const shNodeKind = joinNS('sh', 'nodeKind');
export const shNodeShape = joinNS('sh', 'NodeShape');
export const shIRI = joinNS('sh', 'IRI');
export const shPath = joinNS('sh', 'path');
export const shDefaultValue = joinNS('sh', 'defaultValue');
export const shIn = joinNS('sh', 'in');
export const shOr = joinNS('sh', 'or');
export const shMinInclusive = joinNS('sh', 'minInclusive');
export const shMaxInclusive = joinNS('sh', 'maxInclusive');
export const shPattern = joinNS('sh', 'pattern');
export const shNode = joinNS('sh', 'node');
export const shMinCount = joinNS('sh', 'minCount');
export const shMaxCount = joinNS('sh', 'maxCount');
export const shProperty = joinNS('sh', 'property');
export const shTarget = joinNS('sh', 'target');
export const shSelect = joinNS('sh', 'select');
export const shTargetClass = joinNS('sh', 'targetClass');