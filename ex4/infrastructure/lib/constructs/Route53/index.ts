import { domain_name } from "../../../../config.json";

import { HostedZone, IHostedZone } from "aws-cdk-lib/aws-route53";
import { Construct } from "constructs";

export class Route53 extends Construct {
  public readonly hosted_zone: IHostedZone;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    this.hosted_zone = HostedZone.fromLookup(scope, "HostedZone", {
      domainName: domain_name,
    });
  }
}
