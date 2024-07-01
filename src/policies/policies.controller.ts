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
import { ApiAcceptedResponse, ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Policy } from './policy.model';

@ApiTags('Policies')
@Controller('policies')
export class PoliciesController {
  constructor(private readonly policiesService: PoliciesService) {}

  @ApiCreatedResponse({ description: 'Policy created successfully', type: Policy })
  @ApiBadRequestResponse({ description: 'Invalid input' })
  @ApiOperation({ summary: 'Create a new policy' })
  @ApiBody({
    type: Policy,
    description: "The Description for the Post Body to be sent to create a new Policy.",
    examples: {
        a: {
            summary: "Empty Body",
            description: "When an empty body is used",
            value: {} as Policy
        },
        b: {
            summary: "Policy Body",
            description: "When a Policy body is used",
            value: Policy 
        }
    }
})
// @ApiBody({ type: Policy, description: 'Policy object' })
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
  @ApiOperation({ summary: 'Get all policies' })
  @Get()
  getAllPolicies() {
    return this.policiesService.getPolicies();
  }


  @ApiOkResponse({ description: 'Policy fetched successfully', type: Policy})
  @ApiOperation({ summary: 'Get a single policy' })
  @Get(':id')
  getPolicy(@Param('id') policyId: string) {
    return this.policiesService.getSinglePolicy(policyId);
  }

  @ApiAcceptedResponse({ description: 'Policy updated successfully', type: Policy})
  @ApiOperation({ summary: 'Update a policy' })
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
  @ApiOperation({ summary: 'Delete a policy' })
  @Delete(':id')
  removePolicy(@Param('id') policyId: string) {
      this.policiesService.deletePolicy(policyId);
      return null;
  }
}
