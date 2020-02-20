const graphql = require('graphql');

const model = require('../model/model');
const sequelize = require('../sql/connections').normalUserConnection;
const Author = model.Author(sequelize);
const Book = model.Book(sequelize);

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
            resolve: (parent, args) => Author.findByPk(parent.author_id).then(author => author)
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
                return Book.findAll({where: { author_id: parent.id} });
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {
                id: { type: GraphQLID }
            },
            resolve: (parent, args) => Book.findByPk(args.id).then(book => book)
        },
        author: {
            type: AuthorType,
            args: {
                id: { type: GraphQLID }
            },
            resolve: (parent, args) => Author.findByPk(args.id).then(author => author)
        },
        books: {
            type: new GraphQLList(BookType),
            resolve: (parent, args) => Book.findAll().then(books => books)
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve: (parent, args) => Author.findAll().then(authors => authors)
        }        
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});