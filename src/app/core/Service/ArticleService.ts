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

        data.date = new Date().toISOString().split('T')[0];

        if (data.id) {

            const index = ArticleData.findIndex((item:ArticleItem) => item.id === data.id);

            if (index !== -1) {

              ArticleData[index] = data;

            } else {

              throw new Error('not found article.');

            }

          } else {

            const maxId = ArticleData.length > 0
              ? Math.max(...ArticleData.map((item:ArticleItem) => item.id))
              : 0;
      
            data.id = maxId + 1;
            ArticleData.push(data);

          }
       

        LocalStorageService.setItem('ArticleData', ArticleData)

        return {
            status:200,
            message:"success"
        }

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
            }, 
            {
                name:"tag 3",
                value:3
            }, 
            {
                name:"tag 4",
                value:4
            }
        ]
        
    }

}