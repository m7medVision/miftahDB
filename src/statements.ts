export const SQL_STATEMENTS = {
  // Gets a row from the table
  GET: "SELECT value, expires_at FROM miftahDB WHERE key = ? LIMIT 1",

  // Sets a row in the table
  SET: "INSERT OR REPLACE INTO miftahDB (key, value, expires_at) VALUES (?, ?, ?)",

  // Deletes a row from the table
  DELETE: "DELETE FROM miftahDB WHERE key = ?",

  // Deletes rows that have expired
  CLEANUP:
    "DELETE FROM miftahDB WHERE expires_at IS NOT NULL AND expires_at <= ?",

  // Renames a key
  RENAME: "UPDATE OR IGNORE miftahDB SET key = ? WHERE key = ?",

  // Creates a table if it doesn't exist
  CREATE_TABLE: `
      CREATE TABLE IF NOT EXISTS miftahDB (
        key TEXT PRIMARY KEY,
        value BLOB,
        expires_at INTEGER
      ) WITHOUT ROWID;
    `,

  // Creates an index on the expires_at column
  CREATE_INDEX:
    "CREATE INDEX IF NOT EXISTS idx_expires_at ON miftahDB(expires_at);",

  // Optimizes the database file, reducing its size.
  VACUUM: "VACUUM",

  // Deletes all rows from the table
  FLUSH: "DELETE FROM miftahDB",

  // Returns true if the key exists, false otherwise
  EXISTS: "SELECT EXISTS (SELECT 1 FROM miftahDB WHERE key = ? LIMIT 1)",

  // Returns the expiration date for the given key
  EXPIRE: "SELECT expires_at FROM miftahDB WHERE key = ? LIMIT 1",

  // Returns all keys that match the given pattern
  KEYS: "SELECT key FROM miftahDB WHERE key LIKE ?",

  // Returns all keys that match the given pattern with pagination
  PAGINATION: "SELECT key FROM miftahDB WHERE key LIKE ? LIMIT ? OFFSET ?",

  // Counts the total number of rows in the table
  COUNT: "SELECT COUNT(*) FROM miftahDB",
};
