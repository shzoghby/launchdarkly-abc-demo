export interface UserItem {
  key: string;
  name: string;
  office: string;
  email: string;
  title: string;
}

export interface ProductItem {
  id: number;
  name: string;
  price: number;
  category: string;
}

export const userList: UserItem[] = [{
  key: 'sem',
  name: 'Luke Cage',
  email: 'luke.cage@abc.com',
  office: 'Melbourne',
  title: 'Solution Engineering Manager'
},
{
  key: 'pm',
  name: 'Tommy Shelby',
  email: 'tommy.shelby@abc.com',
  office: 'Sydney',
  title: 'Product Manager'
},
{
  key: 'ai',
  name: 'Steve Jobs',
  email: 'steve.jobs@abc.com',
  office: 'Perth',
  title: 'AI Product Manager'
},
{
  key: 'demo-user1',
  name: 'Mel Gibson',
  email: 'mel.gibson@netflix.com',
  office: 'Melbourne',
  title: 'Demo End User'
},
{
  key: 'demo-user2',
  name: 'Mandy Moore',
  email: 'mandy.moore@netflix.com',
  office: 'Perth',
  title: 'Demo End User'
},
{
  key: 'demo-user3',
  name: 'Julia Roberts',
  email: 'julia.roberts@netflix.com',
  office: 'Sydney',
  title: 'Demo End User'
},
{
  key: 'user1',
  name: 'Harrison Ford',
  email: 'harrison.ford@hbo.com',
  office: 'Melbourne',
  title: 'End User'
},
{
  key: 'user2',
  name: 'Keanu Reeves',
  email: 'keanu.reeves@stan.com',
  office: 'Sydney',
  title: 'End User'
}
];

export const productList: ProductItem[] = [
  { id: 1, name: "Wireless Headphones", price: 99.99, category: "Electronics" },
  { id: 2, name: "Ergonomic Office Chair", price: 189.50, category: "Furniture" },
  { id: 3, name: "Stainless Steel Water Bottle", price: 25.00, category: "Home" },
  { id: 4, name: "Mechanical Keyboard", price: 120.00, category: "Electronics" },
  { id: 5, name: "Yoga Mat", price: 40.00, category: "Fitness" }
];
