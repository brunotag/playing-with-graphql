const graphql = require('graphql');

const model = require('../model/model');
const sequelize = require('../sql/connections').normalUserConnection;
const SqlAuthor = model.Author(sequelize);
const SqlBook = model.Book(sequelize);

const {
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve: (parent, args) => SqlAuthor.findByPk(parent.author_id).then(author => author)
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
                return SqlBook.findAll({where: { author_id: parent.id} });
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
            resolve: (parent, args) => SqlBook.findByPk(args.id).then(book => book)
        },
        author: {
            type: AuthorType,
            args: {
                id: { type: GraphQLID }
            },
            resolve: (parent, args) => SqlAuthor.findByPk(args.id).then(author => author)
        },
        books: {
            type: new GraphQLList(BookType),
            resolve: (parent, args) => SqlBook.findAll().then(books => books)
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve: (parent, args) => SqlAuthor.findAll().then(authors => authors)
        }        
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: GraphQLInt }
            },
            resolve: (parent, args) =>  
                SqlAuthor.create({                    
                    name: args.name,
                    age: args.age
                }).then(author => author)            
        },
        addBook: {
            type: BookType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                genre: {type: new GraphQLNonNull(GraphQLString)},
                author_id: {type: new GraphQLNonNull(GraphQLID)} 
            },
            resolve: (parent, args) =>  
                SqlBook.create({                    
                    name: args.name,
                    genre: args.genre,
                    author_id: args.author_id
                }).then(book => book)
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});