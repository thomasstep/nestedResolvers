const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
  type Person {
    name: String
    awards: [String]
  }

  type College {
    name: String
    dean: Person
    notableGraduates: [String]
    numberOfStudents: Int
  }

  type Cost {
    tuition: Float
    costOfLiving: Float
    averageBooks: Float
    averageFinancialAid: Float
  }

  type University {
    colleges: [College]
    cost: Cost
  }

  type Query {
    university(name: String): University
  }
`;

// Hard coded datastore and functions
function getCostInfo(universityName) {
  // All universities will cost the same...
  return {
    tuition: 30000.15,
    costOfLiving: 13582.90,
    averageBooks: 976.88,
    averageFinancialAid: 2.00,
  };
}

function getColleges(universityName) {
  return ['ENGINEERING', 'ART'];
}

function getDean(collegeName) {
  // Only have support for two colleges
  if (collegeName.toUpperCase() === 'ENGINEERING') {
    return 'Alan Turing';
  } else if (collegeName.toUpperCase() === 'ART') {
    return 'Vincent Van Gogh';
  } else {
    return 'Not hired yet';
  }
}

function getNotableGraduates(collegeName) {
  // Only have support for two colleges
  if (collegeName.toUpperCase() === 'ENGINEERING') {
    return ['Alan Turing', 'Edsger Dijkstra'];
  } else if (collegeName.toUpperCase() === 'ART') {
    return ['Vincent Van Gogh', 'Pablo Picasso'];
  } else {
    return [];
  }
}

function getNumberOfStudents(collegeName) {
  // Only have support for two colleges
  if (collegeName.toUpperCase() === 'ENGINEERING') {
    return 80;
  } else if (collegeName.toUpperCase() === 'ART') {
    return 68;
  } else {
    return 0;
  }
}

function getAwards(deanName) {
  // Only have support for two colleges
  if (deanName === 'Alan Turing') {
    return ['Fellow of the Royal Society', 'Father of Computer Science'];
  } else if (deanName === 'Vincent Van Gogh') {
    return ['Van Gogh Museum'];
  } else {
    return [];
  }
}

const resolvers = {
  Query: {
    university: (parent, args, context, info) => ({ name: args.name }),
  },
  University: {
    cost: (parent, args, context, info) => {
      const costInfo = getCostInfo(parent.name);
      /**
       * Expects returned format:
       * {
       *    tuition: float
       *    costOfLiving: float
       *    averageBooks: float
       *    averageFinancialAid: float
       * }
       */
      return costInfo;
    },
    colleges: (parent, args, context, info) => {
      const colleges = getColleges(parent.name);
      return colleges;
    },
  },
  College: {
    name: (parent, args, context, info) => {
      return parent;
    },
    dean: (parent, args, context, info) => {
      return getDean(parent);
    },
    notableGraduates: (parent, args, context, info) => {
      return getNotableGraduates(parent);
    },
    numberOfStudents: (parent, args, context, info) => {
      return getNumberOfStudents(parent);
    },
  },
  Person: {
    name: (parent, args, context, info) => {
      return parent;
    },
    awards: (parent, args, context, info) => {
      const awards = getAwards(parent);

      return awards;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
