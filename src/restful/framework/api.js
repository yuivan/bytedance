module.exports = {
  async init(ctx, next) {
    const key = ctx.params.list;
    ctx.list = ctx.app.$model[key];
    await next();
  },
  async get(ctx) {
    ctx.body = await ctx.list.findOne({ _id: ctx.params.id });
  },
  async create(ctx) {
    const res = await ctx.list.create(ctx.request.body);
    ctx.body = res;
  },
  async update(ctx) {
    const res = await ctx.list.updateOne(
      {
        _id: ctx.params.id,
      },
      ctx.request.body
    );
    ctx.body = res;
  },
  async del(ctx) {
    const res = await ctx.list.deleteOne({ _id: ctx.params.id });
  },
  async list(ctx) {
    ctx.body = await ctx.list.find({});
  },
};
