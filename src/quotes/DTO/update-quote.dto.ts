import { IsEnum } from 'class-validator';
import { QuoteStatus, TransportMethod } from '@prisma/client';

export class UpdateQuoteDTO {
  departure_loc?: string;
  destination_loc?: string;
  departure_date?: Date;
  return_date?: Date;
  traveler_qty?: number;

  @IsEnum(QuoteStatus)
  status?: QuoteStatus;

  @IsEnum(TransportMethod)
  transportation?: TransportMethod;

  contact_info?: string;
}
