export interface UserItem {
  key: string;
  name: string;
  office: string;
  email: string;
  title: string;
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
  key: 'dev',
  name: 'Tony Stark',
  email: 'tony.stark@abc.com',
  office: 'Melbourne',
  title: 'Senior Developer'
}
];