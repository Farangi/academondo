import { Technique } from './technique';
import { FieldOfInterest } from './fieldOfInterest';
import { PubmedArticle } from './pubmed'; 

export class Lab {
  public _id?: string

  constructor(
    public name: string,
    public address: string,
    public zip: number,
    public country?: string,
    public email?: string,
    public groupLeader?: string,
    public about?: string,
    public publications?: {name: string, id:number}[],
    public techniques?: Technique[],
    public fieldOfInterests?: FieldOfInterest[]
  ) { }
}