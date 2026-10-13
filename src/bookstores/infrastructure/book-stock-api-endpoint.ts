import {BaseApiEndpoint} from '../../shared/domain/infrastructure/base-api-endpoint';
import {BookStock} from '../domain/model/book-stock.entity';
import {BookStockAssembler} from './book-stock-assembler';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {BookStockResource, BookStocksResponse} from './book-stocks-response';

/**
 * BookStockApiEndpoint is a class that extends the BaseApiEndpoint class and provides methods to interact with the BookStock API.
 */

export class BookStockApiEndpoint extends BaseApiEndpoint<BookStock,BookStockResource,BookStocksResponse,BookStockAssembler> {

  /**
   * Creates an instance of BookStockApiEndpoint.
   * @param http - The HttpClient instance used for making HTTP requests.
   */

  constructor(http: HttpClient) {
    super(http, `${environment.platformProviderApiBaseUrl}${environment.platformProviderBookStocksEndpointPath}`, new BookStockAssembler());
  }

}

