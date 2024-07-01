import { ApiProperty } from "@nestjs/swagger";

export class Policy {
  constructor(
    id: string,
    title: string,
    description: string,
    price: number,
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.price = price;
  }

  @ApiProperty({ example: '1'})
  public id: string;  
  @ApiProperty({ example: 'Retirement Annuity Policy'})  
  public title: string;
  @ApiProperty({ example: 'This is a retirement annuity policy'})
  public description: string;
  @ApiProperty({ example: 5000})
  public price: number;
}
