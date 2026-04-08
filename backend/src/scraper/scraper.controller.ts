import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { ScraperService, AthleteResult } from './scraper.service';

@Controller('scraper')
export class ScraperController {
  constructor(private readonly scraperService: ScraperService) {}

  @Get()
  async search(@Query('name') name: string): Promise<AthleteResult[]> {
    if (!name?.trim()) {
      throw new BadRequestException('O parâmetro "name" é obrigatório.');
    }
    return this.scraperService.searchAthlete(name);
  }
}
