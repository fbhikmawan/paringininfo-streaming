import type { Core } from '@strapi/strapi';

const controller = ({ strapi }: { strapi: Core.Strapi }) => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async index(ctx: any) {
    ctx.body = await strapi
      .plugin('asaid-strapi-plugin')
      // the name of the service file & the method.
      .service('service')
      .getWelcomeMessage();
  },

  // get video source entries 
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async getVideoSources(ctx: any) {
    ctx.body = await strapi
      .plugin("asaid-strapi-plugin")
      .service("service")
      .getVideoSources(ctx.query);
  },

  // get a single post
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async getSingleVideoSource(ctx: any) {
    ctx.body = await strapi
      .plugin('asaid-strapi-plugin')
      .service('service')
      .getSingleVideoSource(ctx.request.query);
  },

  // Upload a media file to Strapi Media Library
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async uploadMedia(ctx: any) {
    try {
      const { file } = ctx.request.files;
      const { videoSource, attribute } = ctx.request.body;
      const result = await strapi
        .plugin('asaid-strapi-plugin')
        .service('service')
        .uploadMedia(file, videoSource, attribute);
      ctx.body = result;
    } catch (error) {
      ctx.throw(400, error.message);
    }
  },

  // search for a post
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async getSearchQueryVideoSource(ctx: any) {
    ctx.body = await strapi
      .plugin('content-publisher')
      .service('service')
      .getSearchQuery(ctx.request.query);
  },

  // delete a post
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async deleteVideoSource(ctx: any) {
    ctx.body = await strapi
      .plugin('asaid-strapi-plugin')
      .service('service')
      .deleteVideoSource(ctx.request.query);
  },
});

export default controller;
