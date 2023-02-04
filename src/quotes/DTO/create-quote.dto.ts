import { QuoteStatus, TransportMethod } from '@prisma/client';
import { IsNotEmpty } from 'class-validator';

export class CreateQuoteDTO {
  @IsNotEmpty()
  readonly departure_loc: string;

  @IsNotEmpty()
  readonly destination_loc: string;

  @IsNotEmpty()
  readonly departure_date: string;

  @IsNotEmpty()
  readonly return_date: string;

  @IsNotEmpty()
  readonly traveler_qty: number;

  @IsNotEmpty()
  readonly transportation: TransportMethod;

  @IsNotEmpty()
  readonly contact_info: string;

  @IsNotEmpty()
  readonly status: QuoteStatus;

  @IsNotEmpty()
  readonly price: number;
}
