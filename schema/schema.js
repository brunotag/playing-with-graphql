const graphql = require('graphql');
const _ = require('lodash');

const {
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList
} = graphql;

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args){
                return _.find(dummyAuthors, { id: parent.authorId });
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return _.filter(dummyBooks, { authorId: parent.id});
            }
        }
    })
});

// ** DUMMY DATA - BEGIN **

var dummyBooks = [
    { name: 'Via col vento', genre: 'Pesanton', id: '1', authorId: '1'},
    { name: 'Il codice Da Vinci', genre: 'Trash', id: '2', authorId: '2'},
    { name: 'Pinocchio', genre: 'Scuola', id: '3', authorId: '3'},
    { name: 'Petomania', genre: 'Comico', id: '4', authorId: '1'},
    { name: 'Natale in Birmania del sud', genre: 'Trash', id: '5', authorId: '2'},
    { name: 'Alluce valgo e altri malanni', genre: 'Medicina', id: '6', authorId: '3'},    
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
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return dummyBooks
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args){
                return dummyAuthors
            }
        }        
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});