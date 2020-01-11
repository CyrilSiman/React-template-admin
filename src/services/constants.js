const constants = {
    GRAPHQL_URL : process.env.REACT_APP_GRAPHQL_URL,
    IS_AUTHENTICATED: 'MYAPP_IS_AUTHENTICATED',

    ERROR_CODE_DUPLICATE : 'ERROR_CODE_DUPLICATE',
    ERROR_CODE_PASSWORD_DONT_MATCH : 'ERROR_CODE_PASSWORD_DONT_MATCH',
    ERROR_CODE_UNAUTHENTICATED : 'UNAUTHENTICATED',
    ERROR_CODE_USER_DONT_MATCH : 'ERROR_CODE_USER_DONT_MATCH',

    ERROR_CODE_TOKEN_EXPIRED : 'ERROR_CODE_TOKEN_EXPIRED',
    ERROR_CODE_TOKEN_NOT_RECOGNIZED : 'ERROR_CODE_TOKEN_NOT_RECOGNIZED',
}

module.exports = constants