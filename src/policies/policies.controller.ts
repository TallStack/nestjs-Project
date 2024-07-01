import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';

import { PoliciesService } from './policies.service';
import { ApiAcceptedResponse, ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Policy } from './policy.model';

@ApiTags('Policies')
@Controller('policies')
export class PoliciesController {
  constructor(private readonly policiesService: PoliciesService) {}

  @ApiCreatedResponse({ description: 'Policy created successfully', type: Policy })
  @ApiBadRequestResponse({ description: 'Invalid input' })
  @Post()
  addPolicy(
    @Body('title') policyTitle: string,
    @Body('description') policyDesc: string,
    @Body('price') policyPrice: number,
  ) {
    const generatedId = this.policiesService.addPolicy(
      policyTitle,
      policyDesc,
      policyPrice,
    );
    return { id: generatedId };
  }

  @ApiOkResponse({ description: 'Policies fetched successfully', type: Policy, isArray: true})
  @Get()
  getAllPolicies() {
    return this.policiesService.getPolicies();
  }


  @ApiOkResponse({ description: 'Policy fetched successfully', type: Policy})
  @Get(':id')
  getPolicy(@Param('id') policyId: string) {
    return this.policiesService.getSinglePolicy(policyId);
  }

  @ApiAcceptedResponse({ description: 'Policy updated successfully', type: Policy})
  @Patch(':id')
  updatePolicy(
    @Param('id') policyId: string,
    @Body('title') policyTitle: string,
    @Body('description') policyDesc: string,
    @Body('price') policyPrice: number,
  ) {
    this.policiesService.updatePolicy(policyId, policyTitle, policyDesc, policyPrice);
    return null;
  }

  @ApiAcceptedResponse({ description: 'Policy deleted successfully' })  
  @Delete(':id')
  removePolicy(@Param('id') policyId: string) {
      this.policiesService.deletePolicy(policyId);
      return null;
  }
}
