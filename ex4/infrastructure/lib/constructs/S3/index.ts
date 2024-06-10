import { domain_name, frontend_subdomain } from '../../../../config.json';


import { CfnOutput, RemovalPolicy } from "aws-cdk-lib";
import { Distribution, ViewerProtocolPolicy } from "aws-cdk-lib/aws-cloudfront";
import { S3Origin } from "aws-cdk-lib/aws-cloudfront-origins";
import {
  BlockPublicAccess,
  Bucket,
} from "aws-cdk-lib/aws-s3";
import { BucketDeployment, Source } from "aws-cdk-lib/aws-s3-deployment";
import { Construct } from "constructs";
import { resolve } from "path";

export class S3 extends Construct {
  public readonly web_bucket: Bucket;

  public readonly web_bucket_deployment;

  public readonly distribution: Distribution;


  constructor(scope: Construct, id: string) {
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

    this.distribution = new Distribution(scope, 'FE-Distribution', {
      defaultBehavior: {
        origin: new S3Origin(this.web_bucket),
        viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      }
    })

    new CfnOutput(scope, "WebURL", { value: this.web_bucket.bucketWebsiteUrl });
  }
}
