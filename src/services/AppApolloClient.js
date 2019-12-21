import {InMemoryCache} from 'apollo-cache-inmemory'
import {onError} from 'apollo-link-error'
import {Observable} from 'apollo-link'
import constants from 'ROOT/services/constants'
import {createHttpLink} from 'apollo-link-http'
import {setContext} from 'apollo-link-context'
import ApolloClient from 'apollo-client'

const onErrorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) =>
            console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            )
        )
    }

    if (networkError) {
        console.log(`[Network error]: ${networkError}`)
    }
})

const refreshTokenLink = onError(  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors && graphQLErrors[0]) {
        if (graphQLErrors[0].message === 'Token expired') {
            return new Observable(observer => {
                fetch(constants.GRAPHQL_URL, {
                    method: 'POST',
                    credentials: 'include',
                    mode: 'cors',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({query: '{ operatorRefreshToken { access_token } }'}),
                }).then(refreshResponse => {
                    return refreshResponse.json()
                }).then(json => {
                    localStorage.setItem(constants.AUTH_TOKEN, json.data.operatorRefreshToken.access_token)
                    operation.setContext(({ headers = {} }) => ({
                        headers: {
                            // Re-add old headers
                            ...headers,
                            // Switch out old access token for new one
                            authorization: `Bearer ${json.data.operatorRefreshToken.access_token}` || null,
                        }
                    }))
                }).then(() => {
                    const subscriber = {
                        next: observer.next.bind(observer),
                        error: observer.error.bind(observer),
                        complete: observer.complete.bind(observer)
                    }
                    // Retry last failed request
                    forward(operation).subscribe(subscriber)
                })
                    .catch(error => {
                        // No refresh or client token available, we force user to login
                        localStorage.clear()
                        client.clearStore()
                        window.location = '/'
                        observer.error(error)
                    })
            })
        }
    }
    if  (networkError) {
        console.log(`[Network error]: ${networkError}`)
    }
})

const httpLink = createHttpLink({
    uri: constants.GRAPHQL_URL,
    credentials: 'include',
})

const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem(constants.AUTH_TOKEN)
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        }
    }
})



const cache = new InMemoryCache({
    dataIdFromObject: object => object.uuid || null
})
const client = new ApolloClient({
    cache,
    link: authLink.concat(refreshTokenLink).concat(onErrorLink).concat(httpLink),
})

const data = {
    isLoggedIn: !!localStorage.getItem(constants.AUTH_TOKEN)
}

cache.writeData({data})

export default client