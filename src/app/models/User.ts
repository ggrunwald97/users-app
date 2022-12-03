export interface User {
  _id: number,
  name: string,
  email: string,
  gender: 'male' | 'female',
  status: 'active' | 'inactive',
}
