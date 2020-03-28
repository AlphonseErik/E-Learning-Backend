export function FailureRespone(res: any, error: any): any {
    let status = error.status ? error.status : 500;
    res.status(status);
    res.json({
        message: error.message ? error.message : 'Unknown Error',
        error: error.name ? error.name : 'Unknown Error',
        status: status,
    });
}

export function SuccessRespone(res: any, result: any = {}) {
    res.json({
        result: result ? result : {},
        status: 200
    });
}