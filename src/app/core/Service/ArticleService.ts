import { LocalStorageService } from "./LocalStorageService";

interface ArticleItem{
    caption:string,
    content:string
    tag:number[] 
}

export class ArticleService {

    static getAllArticles ():ArticleItem[] {

        return LocalStorageService.getItem('ArticleData');
    
    }

}