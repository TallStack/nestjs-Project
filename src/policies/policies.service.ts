import { Injectable, NotFoundException } from '@nestjs/common';

import { Policy } from './policy.model';

@Injectable()
export class PoliciesService {
  private policies: Policy[] = [];

  addPolicy(title: string, desc: string, price: number) {
    const policyId = Math.random().toString();
    const newPolicy = new Policy(policyId, title, desc, price);
    this.policies.push(newPolicy);
    return policyId;
  }

  getPolicies() {
    return [...this.policies];
  }

  getSinglePolicy(policyId: string) {
    const policy = this.findPolicy(policyId)[0];
    return { ...policy };
  }

  updatePolicy(policyId: string, title: string, desc: string, price: number) {
    const [policy, index] = this.findPolicy(policyId);
    const updatedPolicy = { ...policy };
    if (title) {
      updatedPolicy.title = title;
    }
    if (desc) {
      updatedPolicy.description = desc;
    }
    if (price) {
      updatedPolicy.price = price;
    }
    this.policies[index] = updatedPolicy;
  }

  deletePolicy(policyId: string) {
      const index = this.findPolicy(policyId)[1];
      this.policies.splice(index, 1);
  }

  private findPolicy(id: string): [Policy, number] {
    const policyIndex = this.policies.findIndex(prod => prod.id === id);
    const policy = this.policies[policyIndex];
    if (!policy) {
      throw new NotFoundException('Could not find policy.');
    }
    return [policy, policyIndex];
  }
}
