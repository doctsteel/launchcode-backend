import { IsOptional } from 'class-validator';
import { QuoteStatus, TransportMethod } from '@prisma/client';

export class GetQuotesFilterSearchDTO {
  @IsOptional()
  departure_loc?: string;

  @IsOptional()
  destination_loc?: string;

  @IsOptional()
  transportation?: TransportMethod;

  @IsOptional()
  status: QuoteStatus;
}
