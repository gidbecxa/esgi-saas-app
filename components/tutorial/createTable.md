```sql
create table users (
  id bigserial primary key,
  firstName text,
  lastName text,
  email text,
  numeroEmployee text,
  pays text,
  telephone text,
  role text
);

insert into users(firstName, lastName, email, numeroEmployee, pays, telephone, role)
values
  ('John', 'Doe', 'john@example.com', '123456', 'USA', '+1234567890', 'commercial'),
  ('Alice', 'Smith', 'alice@example.com', '789012', 'UK', '+9876543210', 'comptable');
```

```sql
create table depenses (
  id bigserial primary key,
  username text,
  title text,
  category text,
  cost float,
  description text,
  file_url text
);

insert into depenses (username, title, category, cost, description, file_url)
values
  ('user1', 'Expense Title 1', 'Category 1', 100.50, 'Description of expense 1', 'https://example.com/file1.pdf'),
  ('user2', 'Expense Title 2', 'Category 2', 200.75, 'Description of expense 2', 'https://example.com/file2.pdf');
  ```