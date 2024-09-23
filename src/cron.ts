import * as cache from "./cache.ts";

function scheduleCacheCleanup() {
  const cron_var = Deno.env.get("CLEAN_CACHE_CRON");
  let interval = 3600000; // Default to every hour in milliseconds

  if (cron_var !== undefined) {
    const cronValue = Number(cron_var);
    if (!isNaN(cronValue) && cronValue > 0) {
      interval = cronValue * 3600000; // Convert hours to milliseconds
    }
  }

  // Schedule the cache clearing
  setInterval(() => {
    cache.chatCache.clear();
    console.log("Cache cleared");
  }, interval);

  // Optionally, call it immediately
  cache.chatCache.clear();
}

export { scheduleCacheCleanup };
