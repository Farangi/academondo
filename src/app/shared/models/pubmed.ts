export interface PubMedArticleResponse {
  PubmedArticleSet: {
    PubmedArticle: PubmedArticle[]
  }
}

export interface PubmedArticle {
  MedlineCitation: {
    Article: Article,
    PMID: any,
    KeywordList: any
  },
  PubmedData: PubmedData
}

export interface PubmedData {
  ArticleIdList: ArticleIdList,
  History: History,
  PublicationStatus: String
}

export interface ArticleIdList {
  ArticleId: any,
}

export interface History {
  PubMedPubDate: any
}

export interface Article {
  Abstract: any,
  ArticleTitle: string,
    AuthorList: { Author: Author[] },
  Language: string
}

export interface Author {
  ForeName: string,
  LastName: string
}

export interface ESearchResponse {
  header: any,
  esearchresult: {
    count: string,
    retmax: string,
    retstart: string,
    idlist: string[],
    translationset: any,
    translationstack: any,
    querytranslation: any
  }
}