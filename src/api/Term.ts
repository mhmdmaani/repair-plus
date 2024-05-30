export class Term {
  static async get() {
    const data = await fetch('/api/term').then((res) => res.json());
    return data;
  }

  static async create(data: any) {
    const res = await fetch('/api/term', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());
    return res;
  }
}
