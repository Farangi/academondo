import { Technique } from './technique';
import { FieldOfInterest } from './fieldOfInterest';
import { PubmedArticle } from './pubmed';

export class ResearcherProfile {

    public firstName: string;
    public lastName: string;
    public title: string;
    public country?: string;
    public about?: string;
    public publications?: { name: string, id: number }[];
    public techniques?: Technique[];
    public fieldOfInterests?: FieldOfInterest[];
    private userId;
    constructor() { }
}