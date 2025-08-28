import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArticleComponent } from './article.component';
import { ArticleService } from '../core/Service/ArticleService';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../core/Service/AlertService';
import { of, throwError } from 'rxjs';
import { signal } from '@angular/core';
import { provideZonelessChangeDetection } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ArticleComponent', () => {
  let component: ArticleComponent;
  let fixture: ComponentFixture<ArticleComponent>;
  let mockArticleService: jasmine.SpyObj<ArticleService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockActivatedRoute: any;

  beforeEach(async () => {
    // Mock services
    mockArticleService = jasmine.createSpyObj('ArticleService', ['getAllArticles', 'deleteArticle']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockActivatedRoute = {
      queryParams: of({ page: '1' }),
      snapshot: { queryParams: { page: '1' } }
    };

    await TestBed.configureTestingModule({
      imports: [ArticleComponent, NoopAnimationsModule],
      providers: [
        provideZonelessChangeDetection(),
        { provide: ArticleService, useValue: mockArticleService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: AlertService, useValue: jasmine.createSpyObj('AlertService', ['showSuccess']) }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ArticleComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.currentPage()).toBe(0);
    expect(component.loading()).toBe(true);
    expect(component.data()).toEqual([]);
  });

  it('should call getArticleList on page change', () => {
    mockArticleService.getAllArticles.and.returnValue(of({
      status: 200,
      data: { list: [], tag: [], total: 0 }
    }));

    const event = { pageIndex: 2 };
    component.onPageChange(event);

    expect(component.currentPage()).toBe(2);
    expect(mockRouter.navigate).toHaveBeenCalled();
  });

  // 核心功能測試

  it('should load articles on initialization', () => {
    // 模擬 API 回應 (使用正確的 ArticleItem 介面)
    const mockResponse = {
      status: 200,
      data: {
        list: [
          { id: 1, caption: 'Article 1', date: '2025-01-01', tag: [1], published: true },
          { id: 2, caption: 'Article 2', date: '2025-01-02', tag: [2], published: false }
        ],
        tag: [{ value: 1, name: 'Tech' }, { value: 2, name: 'News' }],
        total: 2
      },
      message: 'Success'
    };

    // 使用不延遲的 observable
    mockArticleService.getAllArticles.and.returnValue(of(mockResponse));

    // 觸發 ngOnInit
    component.ngOnInit();

    // 驗證結果
    expect(mockArticleService.getAllArticles).toHaveBeenCalledWith({ page: 0 }, '');
    expect(component.data()).toEqual(mockResponse.data.list);
    expect(component.tagData()).toEqual(mockResponse.data.tag);
    expect(component.totalItems()).toBe(2);
    expect(component.loading()).toBe(false);
  });

  it('should handle search functionality correctly', () => {
    const mockResponse = {
      status: 200,
      data: { list: [{ id: 1, caption: 'Search Result', date: '2025-01-01', tag: [], published: true }], tag: [], total: 1 },
      message: 'Success'
    };

    mockArticleService.getAllArticles.and.returnValue(of(mockResponse));

    // 執行搜尋
    component.searchKeyword('test keyword');

    // 驗證結果
    expect(component.keyword()).toBe('test keyword');
    expect(component.currentPage()).toBe(0); // 搜尋時重置到第一頁
    expect(mockRouter.navigate).toHaveBeenCalled(); // URL 更新
    expect(mockArticleService.getAllArticles).toHaveBeenCalledWith({ page: 0 }, 'test keyword');
  });

  it('should delete selected articles successfully', () => {
    const mockDeleteResponse = { status: 200, data: null, message: 'Articles deleted successfully' };
    const mockListResponse = { status: 200, data: { list: [], tag: [], total: 0 }, message: 'Success' };
    
    mockArticleService.deleteArticle.and.returnValue(of(mockDeleteResponse));
    mockArticleService.getAllArticles.and.returnValue(of(mockListResponse));

    // 設置選中的文章
    component.selectedIds.set([1, 2, 3]);
    
    // 模擬 window.confirm 回傳 true
    spyOn(window, 'confirm').and.returnValue(true);

    // 執行刪除
    component.deleteSelected();

    // 驗證結果
    expect(window.confirm).toHaveBeenCalledWith('Confirm Delete Selected?');
    expect(mockArticleService.deleteArticle).toHaveBeenCalledWith([1, 2, 3]);
    expect(mockArticleService.getAllArticles).toHaveBeenCalled(); // 刪除後重新載入列表
  });

  it('should not delete when user cancels confirmation', () => {
    component.selectedIds.set([1, 2]);
    
    // 模擬 window.confirm 回傳 false
    spyOn(window, 'confirm').and.returnValue(false);

    component.deleteSelected();

    // 驗證沒有呼叫刪除 API
    expect(mockArticleService.deleteArticle).not.toHaveBeenCalled();
  });

  it('should handle pagination correctly', () => {
    const mockResponse = { status: 200, data: { list: [], tag: [], total: 50 }, message: 'Success' };
    mockArticleService.getAllArticles.and.returnValue(of(mockResponse));

    // 測試翻頁到第 3 頁
    const pageEvent = { pageIndex: 2, pageSize: 10, length: 50 };
    component.onPageChange(pageEvent);

    expect(component.currentPage()).toBe(2);
    expect(mockRouter.navigate).toHaveBeenCalledWith([], {
      relativeTo: mockActivatedRoute,
      queryParams: { page: 2 },
      queryParamsHandling: 'merge'
    });
    expect(mockArticleService.getAllArticles).toHaveBeenCalledWith({ page: 2 }, '');
  });

  it('should handle API errors gracefully', () => {
    const errorResponse = new Error('Network error');
    mockArticleService.getAllArticles.and.returnValue(throwError(() => errorResponse));
    
    spyOn(console, 'error');

    component.getArticleList();

    expect(console.error).toHaveBeenCalledWith('Loading failed:', errorResponse);
    expect(component.loading()).toBe(false); // 確保載入狀態被重置
  });

  it('should get correct tag content by tag IDs', () => {
    // 設置標籤資料
    component.tagData.set([
      { value: 1, name: 'Technology' },
      { value: 2, name: 'News' },
      { value: 3, name: 'Sports' }
    ]);

    const result = component.getTagContent([1, 3]);
    
    expect(result).toEqual(['Technology', 'Sports']);
  });

  it('should handle selection changes correctly', () => {
    const selectedIds = [1, 2, 3];
    
    component.onSelectionChange(selectedIds);
    
    expect(component.selectedIds()).toEqual(selectedIds);
    expect(component.deleteButton()).toBe(true); // computed 值應該更新
  });

  it('should reset selection when no items selected', () => {
    component.selectedIds.set([1, 2]);
    expect(component.deleteButton()).toBe(true);
    
    component.onSelectionChange([]);
    
    expect(component.selectedIds()).toEqual([]);
    expect(component.deleteButton()).toBe(false);
  });
});