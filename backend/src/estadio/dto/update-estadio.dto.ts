import { PartialType } from '@nestjs/swagger';
import { CreateEstadioDto } from './create-estadio.dto';

export class UpdateEstadioDto extends PartialType(CreateEstadioDto) {}
