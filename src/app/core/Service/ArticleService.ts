import { LocalStorageService } from "./LocalStorageService";

interface ArticleItem{
    id:number,
    caption:string,
    date:string
    tag:number[] 
}


export class ArticleService {

    static getAllArticles ():ArticleItem[] | [] {

        return [
            {id: 1, caption: 'Hydrogen', tag: [1], date: 'H'},
        ]

        return LocalStorageService.getItem('ArticleData');
    
    }

    static getArticleTag () {

        return {
            1:'分類1',
            2:'分類2',
            3:'分類3',
            4:'分類4'
        }
        
    }

}