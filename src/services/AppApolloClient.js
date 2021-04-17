import constants from 'ROOT/services/constants'
import { ApolloClient, HttpLink, InMemoryCache, makeVar } from '@apollo/client'
import { onError } from "@apollo/client/link/error"

export const showLeftMenuVar =  makeVar(false)

const authenticatedError = onError(  ({ graphQLErrors, networkError }) => {

    if (graphQLErrors && graphQLErrors[0]) {

        const error = graphQLErrors[0]
        if (error.extensions && error.extensions.code === constants.ERROR_CODE_UNAUTHENTICATED) {
            localStorage.clear()
            window.location = '/'
        }
    }

    if  (networkError) {
        console.log(`[Network error]: ${networkError}`)
    }
})

const httpLink = new HttpLink({
    uri: constants.GRAPHQL_URL,
    credentials: 'include',
    includeExtensions:false,
})

const cache = new InMemoryCache({
    dataIdFromObject: object => object._id || null,
    typePolicies: { // Type policy map
        Query: {
            fields: {
                showLeftMenu: {
                    read () {
                        return showLeftMenuVar()
                    },
                },
            },
        },
    },
})


const client = new ApolloClient({
    cache,
    resolvers: {},
    link: authenticatedError.concat(httpLink),
})


export default client