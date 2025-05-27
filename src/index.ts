
import { DataAPIClient } from "@datastax/astra-db-ts";

const client = new DataAPIClient("YOUR_TOKEN");
const db = client.db("https://0a127ff8-c122-465e-9dea-6994638a1ff8-us-east1.apps.astra.datastax.com");


interface Env {
  ASSETS: Fetcher;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    
    if (url.pathname.startsWith("/api/astra")) {
      const colls = await db.listCollections();
      return new Response(JSON.stringify({ collections: colls }), {
        headers: { "Content-Type": "application/json" }
      });
    }

    if (url.pathname.startsWith("/api/")) {
      return new Response("API logic response", { status: 200 });
    }

    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;
