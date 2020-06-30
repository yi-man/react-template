export enum DomType {
  LAYOUT = 'className',
  BIZ = 'props',
}

export const isLayout = (type?: string): type is DomType.LAYOUT => type === DomType.LAYOUT;

export const isBiz = (type?: string): type is DomType.BIZ => type === DomType.BIZ;