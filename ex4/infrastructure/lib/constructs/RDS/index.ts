import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as rds from 'aws-cdk-lib/aws-rds';
import { Construct } from "constructs";

interface Props {
  vpc: ec2.Vpc;
}

export class RDS extends Construct {
  public readonly instance: rds.DatabaseInstance;

  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id)


    this.instance = new rds.DatabaseInstance(scope, "MySQL-RDS", {
      engine: rds.DatabaseInstanceEngine.mysql({
        version: rds.MysqlEngineVersion.VER_8_0_36
      }),
      instanceType: ec2.InstanceType.of(
        ec2.InstanceClass.T3,
        ec2.InstanceSize.MICRO,
      ),
      port: 3306,
      vpc: props.vpc
    })

  }
}
