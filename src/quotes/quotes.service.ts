import { Injectable } from '@nestjs/common';
import { Quote, User } from '@prisma/client';
import { CreateQuoteDTO } from './DTO/create-quote.dto';
import { UpdateQuoteDTO } from './DTO/update-quote.dto';
import { PrismaService } from '../prisma/prisma.service';
import { QuotePaginationDTO } from './DTO/quote-pagination.dto';
import { DateNormalizer } from '../utils/datenormalizer';

@Injectable()
export class QuotesService {
  constructor(private prisma: PrismaService) {}

  async getPaginatedQuotes(
    pagination: QuotePaginationDTO,
  ): Promise<{ rows: Quote[]; pageCount: number; rowCount: number }> {
    const { skip, take } = pagination;

    const query = await this.prisma.quote.findMany({
      skip: pagination.skip,
      take: pagination.take,
    });

    const count = await this.prisma.quote.count();
    const res = {
      rows: query,
      pageCount: (skip + take) / take,
      rowCount: count,
    };
    return res;
  }

  async createQuote(data: CreateQuoteDTO, user: User): Promise<Quote> {
    const normalizedQuote = {
      ...data,
      userId: user.id,
      departure_date: DateNormalizer(data.departure_date),
      return_date: DateNormalizer(data.return_date),
      traveler_qty: Number(data.traveler_qty),
    };
    return this.prisma.quote.create({ data: normalizedQuote });
  }

  async getQuoteById(id: string): Promise<Quote | null> {
    return this.prisma.quote.findUnique({ where: { id } });
  }

  async deleteQuoteById(id: string): Promise<Quote> {
    return this.prisma.quote.delete({ where: { id } });
  }

  async updateQuote(id: string, data: UpdateQuoteDTO): Promise<Quote> {
    return this.prisma.quote.update({
      data,
      where: { id },
    });
  }

  // async filterQuotesList(filter: Prisma.QuoteFindManyArgs): Promise<Quote[]> {
  //   return this.prisma.findMany()
  //   const quote_list = this.quotes.filter((quote) => {
  //     // eslint-disable-next-line prefer-const
  //     for (let key in filter) {
  //       if (quote[key] === undefined || !filter[key].includes(quote[key])) {
  //         return false;
  //       }
  //     }
  //     return true;
  //   });
  //   return quote_list;
  //}
}
