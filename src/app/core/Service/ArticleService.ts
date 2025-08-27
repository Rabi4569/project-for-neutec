import { LocalStorageService } from "./LocalStorageService";
import { ApiService } from "./ApiService";
import { Observable } from 'rxjs';

interface ArticleItem{
    id:number,
    caption:string,
    date:string,
    tag:number[],
    published:boolean
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
        total:number
    }
}

export class ArticleService {


    getAllArticles(query:{page:number}, keyword:string=""): Observable<ResponseListData> {

        const allData = LocalStorageService.getItem('ArticleData') || []

        let reversedData = [...allData].reverse()

        if(keyword){
            reversedData = reversedData.filter(item => item.title.includes(keyword))
        }
        
        const pageSize = 20
        const startIndex = query.page * pageSize
        const endIndex = startIndex + pageSize
        
        const paginatedData = reversedData.slice(startIndex, endIndex)

        return ApiService.useApi({
            list: paginatedData,
            tag: this.getArticleTag(),
            total: reversedData.length
        }) 
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

        return ApiService.useApi(null, "Save Success!")

    }

    deleteArticle(id:number[]){

        const articles: ArticleItem[] = LocalStorageService.getItem('ArticleData') || [];
        
        const saveArticles = articles.filter(item => !id.includes(item.id) )

        LocalStorageService.setItem('ArticleData', saveArticles);

        return ApiService.useApi(null, "Delete Success!")

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