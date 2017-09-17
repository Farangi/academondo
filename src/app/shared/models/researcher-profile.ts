import { Technique } from './technique';
import { FieldOfInterest } from './fieldOfInterest';
import { PubmedArticle } from './pubmed';

export class ResearcherProfile {

    public name: string;
    public country?: string;
    public about?: string;
    public publications?: { name: string, id: number }[];
    public techniques?: Technique[];
    public fieldOfInterests?: FieldOfInterest[];
    private userId;
    constructor() { }
}