#!/bin/sh
REGION=$(printf '%s\n' "${AWS_REGION}")
API_ID=$(printf '%s\n' "${API_GATEWAY_ID}")
ENVIRONMENT=$(printf '%s\n' "${CONFIG_ENVIRONMENT}")
VPC_ID=$(printf '%s\n' "${VPC_LINK_ID}")
SERVICE_URL=$(printf '%s\n' "${SERVICE_URL}")
NOW=$(date)
VARIABLES=baseUrlService=$SERVICE_URL,vpcLinkId=$VPC_ID
BODY=file://tbf-adm-api.${ENVIRONMENT}.json
aws apigateway put-rest-api --rest-api-id $API_ID --region $REGION --mode overwrite --cli-binary-format raw-in-base64-out --body $BODY
if [ "$?" -ne 0 ];
then
    printf "Fail to update ApiGateway"
    exit 1;
fi
aws apigateway create-deployment \
--rest-api-id $API_ID \
--region $REGION \
--stage-name $ENVIRONMENT \
--stage-description 'Stage' \
--description 'Automated deployment to the stage' \
--variables $VARIABLES