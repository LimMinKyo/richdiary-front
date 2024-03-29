import {
  PaginationRequest,
  PaginationResponse,
} from 'api/common/pagination.dto';
import { Dividend } from '../entities/dividend.entity';

export interface GetDividendsMonthRequest extends PaginationRequest {
  date: string;
}

export interface GetDividendsMonthResponse
  extends PaginationResponse<Dividend> {}
