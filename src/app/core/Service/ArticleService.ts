import { LocalStorageService } from "./LocalStorageService";
import { Observable, of, delay } from 'rxjs';

interface ArticleItem{
    id:number,
    caption:string,
    date:string
    tag:number[] 
}

interface TagItem{
    name:string,
    value:number
}

interface ResponseListData {
    status:number,
    data:{
        list:ArticleItem[],
        tag:TagItem[]
    }
}

export class ArticleService {

    getAllArticles(): Observable<ResponseListData> {
        return of({
            status:200,
            data:{
                list:LocalStorageService.getItem('ArticleData').reverse() || [],
                tag:this.getArticleTag()
            }
        }).pipe(
            delay(500) 
        );
    }

    getArticleById(id: number): ArticleItem | undefined {

        const articles: ArticleItem[] = LocalStorageService.getItem('ArticleData') || [];
        
        return articles.find(item => item.id === id);

    }

    saveArticle (data:ArticleItem){

        const ArticleData = LocalStorageService.getItem('ArticleData');

        if(ArticleData.length < 0){

            data.id = 1;

        }else{

            
            const lastId = ArticleData[ArticleData.length - 1]?.id || 0

            data.id = lastId ? lastId + 1  : 1 ;

        }

        ArticleData.push(data);

        LocalStorageService.setItem('ArticleData', ArticleData)

        return {
            status:200,
            message:"success"
        }

    }

    updateArticle (data:any) {

    }

    getArticleTag () {

        return [
            {
                name:"tag 1",
                value:1
            },
            {
                name:"tag 2",
                value:2
            }, {
                name:"tag 3",
                value:3
            }, {
                name:"tag 4",
                value:4
            }
        ]
        
    }

}