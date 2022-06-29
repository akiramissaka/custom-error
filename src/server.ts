import { CustomError } from './CustomError/CustomError';

// CustomError.init(/* serviço de callback */)

function testService (inputPayload: any): string {
    // const payload: IInputPayload = inputPayload && inputPayload.email;
    if (typeof !inputPayload === 'object') {
        // inputPayload.email.x;
        // const aaa = inputPayload as number / 2;
        return 'ok';
    }
    throw CustomError.handler({
        debugMessage: 'debug message',
        publicMessage: 'sem email',
        error: null,
    });
}

function teste (): void {
    try {
        const testVal = testService({ email: 'aaaa' });
        console.log(testVal);
    } catch (error) {
        console.log(error);
    }
}

teste();
