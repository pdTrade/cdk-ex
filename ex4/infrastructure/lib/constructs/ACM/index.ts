import { domain_name } from "../../../../config.json";

import {
  Certificate,
  CertificateValidation,
} from "aws-cdk-lib/aws-certificatemanager";

import { Construct } from "constructs";
import { IHostedZone } from "aws-cdk-lib/aws-route53";

interface Props {
  hosted_zone: IHostedZone;
}

export class ACM extends Construct {
  public readonly certificate: Certificate;

  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id);

    this.certificate = new Certificate(scope, "Certificate", {
      domainName: domain_name,
      validation: CertificateValidation.fromDns(props.hosted_zone),
    });
  }
}
