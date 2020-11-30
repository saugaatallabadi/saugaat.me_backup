---
template: BlogPost
path: /rest-api-sorting-filtering-pagination/
date: 2020-07-10T15:08:12.174Z
title: 'REST API: Sorting, Filtering, and Pagination'
thumbnail: /assets/pexels-startup-stock-photos-7367.jpg
---

Web applications often have tables of data, whether it's the list of items for sale on Amazon, or notes in Evernote, and so on. Usually, users of the application are going to want to filter the results or sort through that data in some way.

If the dataset is pretty small, maybe a few hundred results, the API can return all the data at once and the front end will handle all the filtering, and no more API calls are required. Most of the time, however, the data could consist of tens of thousands to millions of rows, and it's better to just get the data you need from smaller API calls as opposed to trying to request a million results every time the page loads.

Recently, I made a backend API for some list endpoints, and implemented **filtering, sorting, and pagination**. There's not really a set standard for creating these types of endpoints, and almost every one I've come across is different in some way. I made a few notes on what made sense to me, so this resource could be helpful for someone who is working on designing an API.

#### [](https://www.taniarascia.com/#goals)Goals

In this article I'll make an example **API endpoint** and **SQL query** for various sort, paginate, and filter APIs, with `users` as the table for all examples.

#### [](https://www.taniarascia.com/#contents)Contents

-   [Response](https://www.taniarascia.com/#response)
-   [Pagination](https://www.taniarascia.com/#pagination)
-   [Sorting](https://www.taniarascia.com/#sorting)

    -   [Ascending vs. Descending](https://www.taniarascia.com/#ascending-vs-descending)
    -   [Single column](https://www.taniarascia.com/#single-column)
    -   [Multiple columns](https://www.taniarascia.com/#multiple-columns)
-   [Filtering](https://www.taniarascia.com/#filtering)

    -   [String (exact)](https://www.taniarascia.com/#string-exact)
    -   [String (exact, multiple)](https://www.taniarascia.com/#string-exact-multiple)
    -   [String (partial)](https://www.taniarascia.com/#string-partial)
    -   [Number (exact)](https://www.taniarascia.com/#number-exact)
    -   [Number (greater than)](https://www.taniarascia.com/#number-greater-than)
    -   [Number (less than)](https://www.taniarascia.com/#number-less-than)
    -   [Number (range)](https://www.taniarascia.com/#number-range)
    -   [Date (range)](https://www.taniarascia.com/#date-range)

[](https://www.taniarascia.com/#response)Response
-------------------------------------------------

When using any pagination or filtering in an API, you're going to want to know how many results you have, how many results there are total, and what page you're on.

API Response

```
{
  content: [], // all the response items will go in this array
  page: 1, // current page
  results_per_page: 5, // how many items available in "content"
  total_results: 100 // total number of items
}
```

From there, you can discern that there are 20 pages with `total_results / results_per_page` and anything else you might need for the front end.

[](https://www.taniarascia.com/#pagination)Pagination
-----------------------------------------------------

Pagination is how you move between the pages when you don't want to retrieve all the results at once.

-   **Page** and **results per page** are required inputs
-   For the SQL query, `offset` is equal to `(page - 1) * results_per_page`

```
GET /users?page=3&results_per_page=20
```

```
SELECT * FROM users
LIMIT 20
OFFSET 40
```

[](https://www.taniarascia.com/#sorting)Sorting
-----------------------------------------------

Sorting allows you to order the results by any field, in ascending or descending order.

### [](https://www.taniarascia.com/#ascending-vs-descending)Ascending vs. Descending

I always forget what ascending and descending mean for alphabetical, numerical, and date-based responses, so I wrote this up for reference.

| Type | Order | Example | Description |
| --- | --- | --- | --- |
| Alphabetical | Ascending | `A - Z` | First to last |
| Alphabetical | Descending | `Z - A` | Last to first |
| Numerical | Ascending | `1 - 9` | Lowest to highest |
| Numerical | Descending | `9 - 1` | Highest to lowest |
| Date | Ascending | `01-01-1970 - Today` | Oldest to newest |
| Date | Descending | `Today - 01-01-1970` | Newest to oldest |

### [](https://www.taniarascia.com/#single-column)Single column

If you only need to sort one column at a time, you could put the column name in `sort_by` and the sort direction in `order`.

```
GET /users?sort_by=first_name&order=asc
```

```
SELECT * FROM users
ORDER BY first_name ASC
```

### [](https://www.taniarascia.com/#multiple-columns)Multiple columns

If the ability to sort multiple columns is required, you could comma-separate each `column:order` pair and put it in one `sort` parameter. This could also be used for a single column if you prefer the syntax.

```
GET /users?sort=first_name:asc,age:desc
```

```
SELECT * FROM users
ORDER BY first_name ASC, age DESC
```

[](https://www.taniarascia.com/#filtering)Filtering
---------------------------------------------------

Filtering is by far the most complex of the three. There are several ways to handle it. Some APIs will use a `POST` and pass all the data in the body of the request for searching. This might be necessary for advanced searching in some situations, but a `GET` is preferable.

Some API will attempt to put everything on a single `filter` parameter, like this:

```
GET users?filter={"first_name":["Tania","Joe"],"age":[30,31,32]}
```

However, this will have to be URI encoded.

I've opted for treating each parameter as a column in the database.

### [](https://www.taniarascia.com/#string-exact)String (exact)

Exact search by a single column.

```
GET /users?first_name=Tania
```

```
SELECT * FROM users
WHERE first_name = 'Tania'
```

### [](https://www.taniarascia.com/#string-exact-multiple)String (exact, multiple)

Depending on how you want to handle the API, multiple options for a single column can be handled [in different ways](https://stackoverflow.com/questions/24059773/correct-way-to-pass-multiple-values-for-same-parameter-name-in-get-request). If splitting by comma isn't an issue, it might be the easiest. You might also just want to repeat the parameter name or use a custom delimiter.

```
GET /users?first_name=Tania,Joe
GET /users?first_name=Tania&first_name=Joe
GET /users?first_name[]=Tania&first_name[]=Joe
```

```
SELECT * FROM users
WHERE first_name IN ('Tania', 'Joe')
```

> Some systems might require using `[]` for multiple parameters of the same name, and some might now allow `[]`, so I provided both options.

### [](https://www.taniarascia.com/#string-partial)String (partial)

Often, searches are expected to be partial, so that when I look for "Tan" it will show me "Tania" and "Tanner". The solution I liked was using `like:Tan` as value as opposed to modifying the parameter (such as `first_name[like]=Tan`).

```
GET /users?first_name=like:Tan
```

```
SELECT * FROM users
WHERE first_name LIKE '%Tan%'
```

### [](https://www.taniarascia.com/#number-exact)Number (exact)

Exact number search on a column.

```
GET /users?age=30
```

```
SELECT * FROM users
WHERE age = 31
```

### [](https://www.taniarascia.com/#number-greater-than)Number (greater than)

Similar to `like:`, you can use `gt:` to handle greater than. Adding the option for `gte:`(greater than or equal) is also an option.

```
GET /users?age=gt:21
```

```
SELECT * FROM users
WHERE age > 21
```

### [](https://www.taniarascia.com/#number-less-than)Number (less than)

Same with `lt:` for less than `lte:` for less than or equal.

```
GET /users?age=lt:21
```

```
SELECT * FROM users
WHERE age < 21
```

### [](https://www.taniarascia.com/#number-range)Number (range)

If you need a range between two number values, using `[and]` in between them could be one option. This one could get complicated, depending on if you want to allow both greater than and greater than or equal, or other options.

```
GET /users?age=gt:12[and]lt:20
```

```
SELECT * FROM users
WHERE age > 12 AND age < 20
```

### [](https://www.taniarascia.com/#date-range)Date (range)

If you need a range between two dates, you can use `start` and `end`, or `since` and `to`.

```
GET /users?start=01-01-1970&end=09-09-2020
```

```
SELECT * FROM users
WHERE created_at BETWEEN '01-01-1970' AND '09-09-2020'
```

[](https://www.taniarascia.com/#conclusion)Conclusion
-----------------------------------------------------

These examples are pretty simple and cover basic use cases. If your API is very complicated, you might need to change it up to add more options, particularly with ranges, and various combinations of "and" and "or". Hopefully this will be a helpful starting point!