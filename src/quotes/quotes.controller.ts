import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Quote, User } from '@prisma/client';
import { GetUser } from '../auth/get-user.decorator';
import { CreateQuoteDTO } from './DTO/create-quote.dto';

import { UpdateQuoteDTO } from './DTO/update-quote.dto';

import { QuotesService } from './quotes.service';

@Controller('quotes')
@UseGuards(AuthGuard())
export class QuotesController {
  private logger = new Logger('QuotesController');
  constructor(private quotesService: QuotesService) {}

  @Get('/?')
  async getAllQuotes(
    @Query('skip') skip: string,
    @Query('take') take: string,
  ): Promise<{ rows: Quote[]; pageCount: number; rowCount: number }> {
    return await this.quotesService.getPaginatedQuotes({
      skip: parseInt(skip),
      take: parseInt(take),
    });
  }

  @Get('/:id')
  async getQuoteById(@Param('id') id: string): Promise<Quote> {
    return await this.quotesService.getQuoteById(id);
  }

  @Post()
  async createQuote(
    @Body() quoteData: CreateQuoteDTO,
    @GetUser() user: User,
  ): Promise<Quote> {
    return await this.quotesService.createQuote(quoteData, user);
  }

  @Delete('/:id')
  deleteQuoteById(@Param('id') id: string): void {
    this.quotesService.deleteQuoteById(id);
  }

  @Patch('/:id')
  updateQuoteById(
    @Param('id') id: string,
    @Body() quoteData: UpdateQuoteDTO,
  ): Promise<Quote> {
    return this.quotesService.updateQuote(id, quoteData);
  }

  //@Get()
  //getQuoteListWithFilter(@Body() filter: GetQuotesFilterSearchDTO): Quote[] {
  //  return this.quotesService.filterQuotesList(filter);
  //}
}
