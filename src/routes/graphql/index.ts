import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { graphql, parse, validate } from 'graphql';
import { schema } from './schema.js';
import depthLimit from 'graphql-depth-limit';
import { createSubscribedToUserLoader, createUserSubscribedToLoader } from './loaders.js';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req, reply) {
      const { query, variables } = req.body;

      const document = parse(query);

      const errors = validate(schema, document, [depthLimit(5)]);

      if (errors.length) {
        return reply.status(400).send({ errors });
      }

      return graphql({
        schema,
        source: query,
        contextValue: {
          loaders: {
            userSubscribedTo: createUserSubscribedToLoader(),
            subscribedToUser: createSubscribedToUserLoader(),
          },
        },
        variableValues: variables,
      });
    },
  });
};

export default plugin;
