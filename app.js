import { Hono } from "https://deno.land/x/hono@v3.7.4/mod.ts";
import { getFeedback, incrementFeedback } from "./store.js";
import { Eta } from "https://deno.land/x/eta@v3.1.0/src/index.ts";

const eta = new Eta({ views: `${Deno.cwd()}/templates/` });

const app = new Hono();

app.get("/", async (c) =>  {
  return c.html(await eta.render("index.eta"));
});

app.get("/feedbacks/:value", async (c) => {
  const value = Number(c.req.param("value"));
  if (value >= 1 && value <= 5) {
    const count = getFeedback(value);
    const it = {
      value: value,
      count: count
    }
    return c.html(await eta.render("page.eta", it));
  }
  return c.text("Invalid feedback value", 400);
});

app.post("/feedbacks/:value", (c) => {
  const value = Number(c.req.param("value"));
  if (value >= 1 && value <= 5) {
    incrementFeedback(value);
    return c.redirect('/');
  }
  return c.text("Invalid feedback value", 400);
});

export default app;