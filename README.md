# nestedResolvers
Run `npm install` then `node app.js`.

Sample query:
```
query {
  university(name: "something") {
    colleges {
      dean {
        awards
        name
      }
      notableGraduates
      numberOfStudents
    }
    cost {
      tuition
      averageBooks
      averageFinancialAid
      costOfLiving
    }
  }
}
```

This is meant to accompany a [blog post I wrote about writing GraphQL resolvers](https://thomasstep.dev/dev/javascript/2020/03/12/writing-graphql-resolvers.html).
To keep everything simple, the "data sources" are just hardcoded values and the `university`'s `name` input does not matter.
This is more to show how to write functions that will correctly resolve the given schema.
