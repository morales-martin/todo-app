import * as cdk from "@aws-cdk/core";
import * as AmplifyHelpers from "@aws-amplify/cli-extensibility-helper";
import * as appsync from "@aws-cdk/aws-appsync";
import { AmplifyDependentResourcesAttributes } from "../../types/amplify-dependent-resources-ref";
//import * as iam from '@aws-cdk/aws-iam';
//import * as sns from '@aws-cdk/aws-sns';
//import * as subs from '@aws-cdk/aws-sns-subscriptions';
//import * as sqs from '@aws-cdk/aws-sqs';

export class cdkStack extends cdk.Stack {
  constructor(
    scope: cdk.Construct,
    id: string,
    props?: cdk.StackProps,
    amplifyResourceProps?: AmplifyHelpers.AmplifyResourceProps
  ) {
    super(scope, id, props);
    /* Do not remove - Amplify CLI automatically injects the current deployment environment in this input parameter */
    new cdk.CfnParameter(this, "env", {
      type: "String",
      description: "Current Amplify CLI env name",
    });

    const apiIdRef = "zry3fkaqangknbiux4v46tttei";
    const envRef = "dev";

    // Access other Amplify Resources
    const retVal: AmplifyDependentResourcesAttributes =
      AmplifyHelpers.addResourceDependency(
        this,
        amplifyResourceProps.category,
        amplifyResourceProps.resourceName,
        [
          {
            category: "api",
            resourceName: "todoapp",
          },
        ]
      );

    const beforeMappingVTL = `
$util.qr($ctx.stash.put("typeName", "Mutation"))
$util.qr($ctx.stash.put("fieldName", "deleteTodo"))
$util.qr($ctx.stash.put("conditions", []))
$util.qr($ctx.stash.put("metadata", {}))
$util.qr($ctx.stash.metadata.put("dataSourceType", "AMAZON_DYNAMODB"))
$util.qr($ctx.stash.metadata.put("apiId", "zry3fkaqangknbiux4v46tttei"))
$util.qr($ctx.stash.put("tableName", "Todo-zry3fkaqangknbiux4v46tttei-dev"))
$util.toJson({})
`;
    const afterMappingVTL = `
$util.toJson($ctx.prev.result)
`;
    const mutationDeleteTodosFnReq = `
## By default in a before template, all you need is a valid JSON payload.
## You can also stash data to be made available to the functions in the pipeline.
## Examples: 
## - $ctx.stash.put("email", $ctx.args.email)
## - $ctx.stash.put("badgeNumber", $ctx.args.input.badgeNumber)
## - $ctx.stash.put("username", $ctx.identity.username)

#set($ids = [])
#foreach($id in \${ctx.args.ids})
    #set($map = {})
    $util.qr($map.put("id", $util.dynamodb.toString($id)))
    $util.qr($ids.add($map))
#end

{
    "version" : "2022-05-29",
    "operation" : "BatchDeleteItem",
    "tables" : {
        "Todo-${apiIdRef}-${envRef}": $util.toJson($ids)
    }
}
`;
    const mutationDeleteTodosFnRes = `
## The after mapping template is used to collect the final value that is returned by the resolver. 
#if($ctx.error)
	$util.error($ctx.error.message, $ctx.error.type)
#else
	$util.toJson($ctx.result.data["Todo-${apiIdRef}-${envRef}"])
#end
`;

    const MutationDeleteTodosFn = new appsync.CfnFunctionConfiguration(
      this,
      "MutationDeleteTodosFn",
      {
        apiId: cdk.Fn.ref(retVal.api.todoapp.GraphQLAPIIdOutput),
        dataSourceName: "TodoTable", // DataSource name
        functionVersion: "2018-05-29",
        name: "MutationDeleteTodosFn",
        requestMappingTemplate: mutationDeleteTodosFnReq,
        responseMappingTemplate: mutationDeleteTodosFnRes,
      }
    );

    const resolver = new appsync.CfnResolver(this, "pipeline-resolver", {
      apiId: cdk.Fn.ref(retVal.api.todoapp.GraphQLAPIIdOutput),
      fieldName: "batchDelete",
      typeName: "Mutation", // Query | Mutation | Subscription
      kind: "PIPELINE",
      pipelineConfig: {
        functions: [MutationDeleteTodosFn.attrFunctionId],
      },
      requestMappingTemplate: beforeMappingVTL,
      responseMappingTemplate: afterMappingVTL,
    });
  }
}
