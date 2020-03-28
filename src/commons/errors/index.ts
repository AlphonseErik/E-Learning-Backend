import NotFoundException from './NotFoundException';
import UnauthorizedException from './UnauthorizedException';
import BadRequestException from './BadRequestException';
import InternalServerErrorException from './InternalServerErrorException';


export {
    NotFoundException,
    UnauthorizedException,
    BadRequestException,
    InternalServerErrorException,
}

export const ErrorMessages = {
    SystemError: 'System Failure',
    ErrNotFoundData: 'Data Not Found',
}