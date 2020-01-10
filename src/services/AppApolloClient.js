import {InMemoryCache} from 'apollo-cache-inmemory'
import constants from 'ROOT/services/constants'
import { HttpLink } from 'apollo-link-http'
import {onError} from 'apollo-link-error'
import ApolloClient from 'apollo-client'

const authenticatedError = onError(  ({ response, graphQLErrors, networkError, operation, forward }) => {

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
    dataIdFromObject: object => object._id || null
})

const data = {
    showLeftMenu: false,
}

cache.writeData({data})


const client = new ApolloClient({
    cache,
    resolvers: {},
    link: authenticatedError.concat(httpLink),
})

client.onResetStore(() => {
    cache.writeData({ data })
})

export default client