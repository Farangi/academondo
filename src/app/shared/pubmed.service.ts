import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/publishLast';

import { ESearchResponse, PubMedArticleResponse, PubmedArticle } from '../shared/models/pubmed';


declare function xml2json(xml: any, tab: any);

@Injectable()
export class PubmedService {

  public getArticleIdsFromTerm(term: string, retmax: number = 100, retstart: number = 0, sort: string = 'relevance') {

    let prefix = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&retmode=json&sort=relevance&'
    let postfix = `sort=${sort}&retstart${retstart}&retmax=${retmax}&term=${term}`;

    let url = prefix + postfix;
    // console.log('get ids from search term, url: ', url);
    let idStream: Observable<any> = this.http.get(url)
      .map((response) => {
        const responseAsJson: ESearchResponse = response.json();
        return responseAsJson.esearchresult.idlist
      })
      .catch(() => Observable.throw('Unable to fetch article ids!!'))
      .publishLast()
      .refCount()

    return idStream;
  }

  public getArticlesFromIds(ids: string[]) {
    let prefix = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&retmode=xml&'
    let postfix = `id=${ids}`;
    let url = prefix + postfix;

    // console.log('get articles from ids, url: ', url);
    let articleStream = this.http.get(url)
      .map((response: any) => {
        debugger;
        const responseAsJson: PubMedArticleResponse = JSON.parse(xml2json(response.text(), ''));
        return responseAsJson.PubmedArticleSet.PubmedArticle
      })
      .catch(() => Observable.throw('Unable to fetch articles!!'))
      .publishLast()
      .refCount()

    return articleStream;
  }

  public  getArticleUrl(article: PubmedArticle) {
    return 'https://www.ncbi.nlm.nih.gov/pubmed/' + article.MedlineCitation.PMID['#text'];
  }

  public arrayObjectHack(val) { // pubmed.AuthorList returns {} instead of array if only one Author
  if (!val) return [];
    let result = Array.from(val);
    if (result.length == 0) {
      result.push(val);
    }
    return result;
  }

  constructor(private http: Http) { }
}
