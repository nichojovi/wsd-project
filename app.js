import { Hono } from "https://deno.land/x/hono@v3.7.4/mod.ts";
import { getFeedback, incrementFeedback } from "./store.js";

const app = new Hono();

app.get("/feedbacks/:value", (c) => {
  const value = Number(c.req.param("value"));
  if (value >= 1 && value <= 3) {
    const count = getFeedback(value);
    return c.text(`Feedback ${value}: ${count}`);
  }
  return c.text("Invalid feedback value", 400);
});

app.post("/feedbacks/:value", (c) => {
  const value = Number(c.req.param("value"));
  if (value >= 1 && value <= 3) {
    incrementFeedback(value);
    return c.text("Feedback recorded");
  }
  return c.text("Invalid feedback value", 400);
});

export default app;