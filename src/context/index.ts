import { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";

export interface IDbContext {}

declare module "fastify" {
  interface FastifyInstance {
    dbContext: IDbContext;
  }
}

const prismaPlugin: FastifyPluginAsync = fp(async server => {});

export default prismaPlugin;
