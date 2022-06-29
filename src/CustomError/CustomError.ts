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
    error: unknown // Error | undefined
}

/* interface ICustomErrorHandlerParams<T> {
    publicMessage: string
    debugMessage: string
    statusCode: T
    error: unknown
} */

/* export interface ITriggerableService {
    triggerService(customErrorData: ICustomErrorData): void
}

interface ICustomErrorConfigParams {
    // Other options can be placed here
}

interface IHasService extends ICustomErrorConfigParams {
    serviceReference: Error,
    defaultExecuteService: boolean
}

interface IHasNotService extends ICustomErrorConfigParams {
    serviceReference: null,
    defaultExecuteService: false
}

type CustomErrorConfigParams = IHasService | IHasNotService */

/**
 * Custom error class incremented with a few more properties for a better error handling that extends
 * native Error class.
 * Generic "T" refers to statusCode type. You can define a type with the status code options (ex:
 * type StatusCode = 400 | 403 | 500 ...) and pass it as type parameter when instantiating this class.
 *
 */
export class CustomError<T> extends Error implements ICustomError<T> {
    public readonly debugMessage: string;
    public readonly publicData: IPublicData<T>;
    public readonly originalErrorObj: Error | undefined;

    /* static defaultStatusCode: number;
    static isInitialized = false;
    static serviceReference: unknown;
    static defaultExecuteService: boolean; */

    private constructor ({ publicMessage, debugMessage, error, statusCode }: ICustomErrorParams<T>) {
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

    /* static init ({ defaultExecuteService, serviceReference }: CustomErrorConfigParams): void {
        if (CustomError.isInitialized) {
            // throw an error?
            return;
        }
        CustomError.serviceReference = serviceReference;
        CustomError.defaultExecuteService = defaultExecuteService;
    } */

    /* static handler<S> ({ publicMessage, debugMessage, error, statusCode }: ICustomErrorHandlerParams<S>): ICustomError<S> {
        const handledError = CustomError.handleUnknownErrorType(error);
        return new CustomError<S>({
            debugMessage: debugMessage,
            publicMessage: publicMessage,
            error: handledError,
            statusCode: statusCode,
        });
    } */

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
