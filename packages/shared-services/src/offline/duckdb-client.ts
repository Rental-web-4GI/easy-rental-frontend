/**
 * DuckDB-Wasm client for local-first data storage.
 *
 * @author Easy Rental Team
 * @since 2026-05-31
 */

let dbInstance: unknown = null;

/**
 * Initializes DuckDB-Wasm in the browser.
 */
export async function initDuckDb(): Promise<unknown> {
  if (typeof window === 'undefined') {
    return null;
  }
  if (dbInstance) {
    return dbInstance;
  }
  try {
    const duckdb = await import('@duckdb/duckdb-wasm');
    const bundle = await duckdb.selectBundle(duckdb.getJsDelivrBundles());
    const worker = new Worker(bundle.mainWorker!);
    const logger = new duckdb.ConsoleLogger();
    const db = new duckdb.AsyncDuckDB(logger, worker);
    await db.instantiate(bundle.mainModule, bundle.pthreadWorker);
    dbInstance = db;
    return db;
  } catch {
    return null;
  }
}

/**
 * Returns the active DuckDB instance if initialized.
 */
export function getDuckDb(): unknown {
  return dbInstance;
}
