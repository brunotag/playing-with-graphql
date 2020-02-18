const graphql = require('graphql');
const _ = require('lodash');

const {
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema,
    GraphQLID,
    GraphQLInt
} = graphql;

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt }
    })
});

// ** DUMMY DATA - BEGIN **

var dummyBooks = [
    { name: 'Via col vento', genre: 'Pesanton', id: '1'},
    { name: 'Il codice Da Vinci', genre: 'Trash', id: '2'},
    { name: 'Pinocchio', genre: 'Scuola', id: '3'},
]

var dummyAuthors = [
    { name: 'Mario Rossi', age: 33, id: '1'},
    { name: 'Carlo Verdi', age: 44, id: '2'},
    { name: 'Luigi Bianchi', age: 55, id: '1'},
]

// ** DUMMY DATA - END **

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {
                id: { type: GraphQLID }
            },
            resolve(parent, args){                
                return _.find(dummyBooks, { id: args.id });
            }
        },
        author: {
            type: AuthorType,
            args: {
                id: { type: GraphQLID }
            },
            resolve(parent, args){                
                return _.find(dummyAuthors, { id: args.id });
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});