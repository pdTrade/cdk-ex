import { domain_name, frontend_subdomain } from "../../../../config.json";

import { CfnOutput, RemovalPolicy } from "aws-cdk-lib";
import { Distribution, ViewerProtocolPolicy } from "aws-cdk-lib/aws-cloudfront";
import { S3Origin } from "aws-cdk-lib/aws-cloudfront-origins";
import { BlockPublicAccess, Bucket } from "aws-cdk-lib/aws-s3";
import { BucketDeployment, Source } from "aws-cdk-lib/aws-s3-deployment";
import { Construct } from "constructs";
import { resolve } from "path";
import { ACM } from "../ACM";
import { Route53 } from "../Route53";
import { ARecord, RecordTarget } from "aws-cdk-lib/aws-route53";
import { CloudFrontTarget } from "aws-cdk-lib/aws-route53-targets";

interface Props {
  acm: ACM;
  route53: Route53;
}

export class S3 extends Construct {
  public readonly web_bucket: Bucket;

  public readonly web_bucket_deployment;

  public readonly distribution: Distribution;

  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id);

    this.web_bucket = new Bucket(scope, "WebBucket", {
      publicReadAccess: true,
      blockPublicAccess: BlockPublicAccess.BLOCK_ACLS,
      websiteIndexDocument: "index.html",
      // websiteErrorDocument: "error.html",
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    this.web_bucket_deployment = new BucketDeployment(
      scope,
      "WebBucketDeployment",
      {
        sources: [Source.asset(resolve(__dirname, "../../../..", "web"))],
        destinationBucket: this.web_bucket,
      }
    );

    this.distribution = new Distribution(scope, "FE-Distribution", {
      domainNames: [`${frontend_subdomain}.${domain_name}`],
      certificate: props.acm.certificate,
      defaultBehavior: {
        origin: new S3Origin(this.web_bucket),
        viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
    });

    new ARecord(scope, "FrontendAliasRecord", {
      zone: props.route53.hosted_zone,
      target: RecordTarget.fromAlias(new CloudFrontTarget(this.distribution)),
      recordName: `${frontend_subdomain}.${domain_name}`,
    });

    new CfnOutput(scope, "WebURL", { value: this.web_bucket.bucketWebsiteUrl });
  }
}
