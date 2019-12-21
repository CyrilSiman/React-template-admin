import {InMemoryCache} from 'apollo-cache-inmemory'
import constants from 'ROOT/services/constants'
import { HttpLink } from 'apollo-link-http'
import ApolloClient from 'apollo-client'

const httpLink = new HttpLink({
    uri: constants.GRAPHQL_URL,
    credentials: 'include',
    includeExtensions:false,
})

const cache = new InMemoryCache({
    dataIdFromObject: object => object._id || null
})
const client = new ApolloClient({
    cache,
    resolvers: {},
    link: httpLink,
})

const data = {
    showLeftMenu: false,
    isLoggedIn: false,
}

cache.writeData({data})

client.onResetStore(() => {
    cache.writeData({ data })
})


export default client