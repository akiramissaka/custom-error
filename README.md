# Custom Error

>This is a Typescript implementation of an error class which extends the base class Error, adding some fields to support error handling specially on server side, but it can be used both on server side or client side.

## CustomError Constructor Properties

| property name | type | required | description |
| ----- | -------- | ----------- | -------- |
| publicMessage | string | `true` | A short message to describe the error that can be externalized, like in the body of an API response |
| debugMessage | string | `true` | A detailed message to describe the error for debug purposes |
| statusCode | typescript generic | `true` | It's a typescript generic, that is, the type is receveid as argument. |
| error | Error or undefined | `false` | If you instantiate a CustomError inside a catch block, you can store the original error object in this property |

## Examples

```typescript
const customError = new CustomError<'ERR00'|'ERR01'|'ERR02'>({
    debugMessage: 'a detailed message to support debugging',
    publicMessage: 'a message that can be public',
    statusCode: 'ERR01'
})
```

>Inside a catch:

```typescript
try {
    ...
} catch (error) {
    const customError = new CustomError<400|500>({
        debugMessage: 'a detailed message to support debugging',
        publicMessage: 'a message that can be public',
        statusCode: 400,
        error: error
    })
}
```