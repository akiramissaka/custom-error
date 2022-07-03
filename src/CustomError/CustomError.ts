interface IPublicData<T> {
    statusCode: T
    message: string
}

interface ICustomErrorData<T> {
    readonly originalErrorObj: Error | undefined
    readonly debugMessage: string
    readonly publicData: IPublicData<T>
}

export interface ICustomError<T> extends Error, ICustomErrorData<T> {}

interface ICustomErrorParams<T> {
    publicMessage: string
    debugMessage: string
    statusCode: T
    error?: unknown // Error | undefined
}

export class CustomError<T> extends Error implements ICustomError<T> {
    public readonly debugMessage: string;
    public readonly publicData: IPublicData<T>;
    public readonly originalErrorObj: Error | undefined;

    /**
     * Custom error class incremented with a few more properties for a better error handling that extends
     * native Error class.
     * Generic "T" refers to statusCode type. You can define a type with the status code options (ex:
     * type StatusCode = 400 | 403 | 500 ...) and pass it as type parameter when instantiating this class.
     *
     */
    constructor ({ publicMessage, debugMessage, error, statusCode }: ICustomErrorParams<T>) {
        super(publicMessage);
        const handledError = CustomError.handleUnknownErrorType(error);
        this.debugMessage = debugMessage;
        this.publicData = {
            message: publicMessage,
            statusCode: statusCode,
        };
        this.originalErrorObj = handledError;
        console.log('this.stack', this.stack);
    }

    private static handleUnknownErrorType (error: unknown): Error | undefined {
        switch (true) {
            case error instanceof Error:
                return error as Error;
            /* case typeof error === 'string':
                return new Error(error as string); */
            default:
                return undefined;
        }
    }
}
