const graphql = require('graphql');

const {GraphQLObjectType, GraphQLString, GraphQLSchema} = graphql;

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        genre: { type: GraphQLString }
    })
});

var dummyBooks = [
    { name: 'Via col vento', genre: 'Pesanton', id: '1'},
    { name: 'Il codice Da Vinci', genre: 'Trash', id: '2'},
    { name: 'Pinocchio', genre: 'Scuola', id: '3'},
]

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {
                id: { type: GraphQLString }
            },
            resolve(parent, args){
                for(var i=0;i<dummyBooks.length;i++){
                    if (dummyBooks[i].id == args.id) 
                        return dummyBooks[i];
                }
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});