import {BaseResource, BaseResponse} from '../../shared/domain/infrastructure/base-response';

export interface BookstoreResource extends BaseResource {

  id: number;
  name: string;
  specialty: string;
  minimumCopies: number;


}

export interface BookstoresResponse extends BaseResponse {
  data: BookstoreResource[];
}
