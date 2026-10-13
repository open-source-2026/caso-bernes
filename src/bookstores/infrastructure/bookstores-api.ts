import {inject, Injectable} from '@angular/core';
import {BaseApi} from '../../shared/domain/infrastructure/base-api';
import {Bookstore} from '../domain/model/bookstore.entity';
import {BookStock} from '../domain/model/book-stock.entity';
import {HttpClient} from '@angular/common/http';
import {BookstoreApiEndpoint} from './bookstores-api-endpoint';
import {BookStockApiEndpoint} from './book-stock-api-endpoint';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BookstoresApi extends BaseApi {

  private readonly http = inject(HttpClient);
  private readonly bookstoresEndpoint = new BookstoreApiEndpoint(this.http);
  private readonly bookStocksEndpoint = new BookStockApiEndpoint(this.http);

  /**
   * Fetches the list of bookstores from the API.
   * @returns An Observable of an array of Bookstore entities.
   */
  getBookstores = (): Observable<Bookstore[]> =>
    this.bookstoresEndpoint.getAll();

  /**
   * Fetches a specific bookstore by its ID from the API.
   * @param bookstoreId - The ID of the bookstore to fetch.
   * @returns An Observable of the Bookstore entity.
   */

  getBookStore = (bookstoreId: number): Observable<Bookstore> =>
    this.bookstoresEndpoint.getById(bookstoreId);

  /**
   * Creates a new bookstore in the API.
   * @param bookstore - The Bookstore entity to create.
   * @returns An Observable of the created Bookstore entity.
   */

  createBookStore = (bookstore: Bookstore): Observable<Bookstore> =>
    this.bookstoresEndpoint.create(bookstore);

  /**
   * Updates an existing bookstore in the API.
   * @param bookstore - The Bookstore entity to update.
   * @returns An Observable of the updated Bookstore entity.
   */

  updateBookStore = (bookstore: Bookstore): Observable<Bookstore> =>
    this.bookstoresEndpoint.update(bookstore, bookstore.id);

  /**
   * Deletes a bookstore from the API.
   * @param bookstoreId - The ID of the bookstore to delete.
   * @returns An Observable of void.
   */

  deleteBookStore = (bookstoreId: number): Observable<void> =>
    this.bookstoresEndpoint.delete(bookstoreId);

  /**
   * Fetches the list of book stocks from the API.
   * @returns An Observable of an array of BookStock entities.
   */

  getBookStocks = (): Observable<BookStock[]> =>
    this.bookStocksEndpoint.getAll();

  /**
   * Fetches a specific book stock by its ID from the API.
   * @param bookStockId - The ID of the book stock to fetch.
   * @returns An Observable of the BookStock entity.
   */

  getBookStock = (bookStockId: number): Observable<BookStock> =>
    this.bookStocksEndpoint.getById(bookStockId);

  /**
   * Creates a new book stock in the API.
   * @param bookStock - The BookStock entity to create.
   * @returns An Observable of the created BookStock entity.
   */

  createBookStock = (bookStock: BookStock): Observable<BookStock> =>
    this.bookStocksEndpoint.create(bookStock);

  /**
   * Updates an existing book stock in the API.
   * @param bookStock - The BookStock entity to update.
   * @returns An Observable of the updated BookStock entity.
   */

  updateBookStock = (bookStock: BookStock): Observable<BookStock> =>
    this.bookStocksEndpoint.update(bookStock, bookStock.id);

  /**
   * Deletes a book stock from the API.
   * @param bookStockId - The ID of the book stock to delete.
   * @returns An Observable of void.
   */
  deleteBookStock = (bookStockId: number): Observable<void> =>
    this.bookStocksEndpoint.delete(bookStockId);



}
