import type { Core } from '@strapi/strapi';

const controller = ({ strapi }: { strapi: Core.Strapi }) => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async index(ctx: any) {
    ctx.body = await strapi
      .plugin('asaid-strapi-plugin')
      .service('service')
      .getWelcomeMessage();
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async getVideoSources(ctx: any) {
    ctx.body = await strapi
      .plugin("asaid-strapi-plugin")
      .service("service")
      .getVideoSources(ctx.query);
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async getSingleVideoSource(ctx: any) {
    ctx.body = await strapi
      .plugin('asaid-strapi-plugin')
      .service('service')
      .getSingleVideoSource(ctx.request.query);
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async uploadMedia(ctx: any) {
    try {
      const { file } = ctx.request.files;
      const result = await strapi
        .plugin('asaid-strapi-plugin')
        .service('service')
        .uploadMedia(file);
      ctx.body = result;
    } catch (error) {
      ctx.throw(400, error.message);
    }
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async processMedia(ctx: any) {
    try {
      const { videoSource, attributes, tempFolder, tempSourcePath } = ctx.request.body;
      const result = await strapi
        .plugin('asaid-strapi-plugin')
        .service('service')
        .processMedia(videoSource, attributes, tempFolder, tempSourcePath);
      ctx.body = result;
    } catch (error) {
      ctx.throw(400, error.message);
    }
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async getSearchQueryVideoSource(ctx: any) {
    ctx.body = await strapi
      .plugin('content-publisher')
      .service('service')
      .getSearchQuery(ctx.request.query);
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async deleteVideoSource(ctx: any) {
    ctx.body = await strapi
      .plugin('asaid-strapi-plugin')
      .service('service')
      .deleteVideoSource(ctx.request.query);
  },
});

export default controller;