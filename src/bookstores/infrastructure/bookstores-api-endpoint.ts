import {BaseApiEndpoint} from '../../shared/domain/infrastructure/base-api-endpoint';
import {Bookstore} from '../domain/model/bookstore.entity';
import {BookstoresResponse, BookstoreResource} from './bookstores-response';
import {BookstoreAssembler} from './bookstore-assembler';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

/**
 * BookstoreApiEndpoint is a class that extends the BaseApiEndpoint class and provides methods to interact with the Bookstore API.
 */
export class BookstoreApiEndpoint extends BaseApiEndpoint<Bookstore, BookstoreResource, BookstoresResponse, BookstoreAssembler> {

  /**
   * Creates an instance of BookstoreApiEndpoint.
   * @param http - The HttpClient instance used for making HTTP requests.
   */

  constructor(http: HttpClient) {
    super(http, `${environment.platformProviderApiBaseUrl}${environment.platformProviderBookstoresEndpointPath}`, new BookstoreAssembler());
  }
}
