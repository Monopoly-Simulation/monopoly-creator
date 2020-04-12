const low = window.require('lowdb');
const FileSync =  window.require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);

db.defaults({
  text: '',
})

export async function set(t: string): Promise<void> {
  await db.update('text', () => t).write();
}

export async function get(): Promise<string> {
  return await db.get('text').value();
}
