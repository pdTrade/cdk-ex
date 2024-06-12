FROM --platform=linux/x86_64 public.ecr.aws/lambda/nodejs:20
WORKDIR ${LAMBDA_TASK_ROOT}

COPY index.mjs ./

CMD [ "index.handler" ]
