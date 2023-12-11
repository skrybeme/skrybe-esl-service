import express from 'express';
import {
  ConfirmationEmailSendingFailureErrorResponse,
  EmailAlreadyTakenErrorResponse,
  InternalServerErrorResponse,
  InvalidTokenErrorResponse,
  WrongEmailAddressFormatErrorResponse
} from '../../http/error-responses';
import { StatusCodes } from '../../http/status-codes';
import { addSubscriptionUseCase, deleteSubscriptionUseCase } from '../../container';
import {
  EmailAlreadyExists,
  UnreachableEmailAddress
} from '../../use-cases/add-subscription';
import { SubscriptionTokenNotFound } from '../../use-cases/delete-subscription';
import { InvalidEntity } from '../../entities/subscription';

const handleDelete = async (req: express.Request, res: express.Response) => {
  try {
    // TODO Handle request dto validation.
    await deleteSubscriptionUseCase(req.body)

    res.status(StatusCodes.NO_CONTENT).end();
  } catch(e: unknown) {
    if (e instanceof SubscriptionTokenNotFound) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json(new InvalidTokenErrorResponse());
    } else {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(new InternalServerErrorResponse());
    }
  }
}

const handleInsert = async (req: express.Request, res: express.Response) => {
  try {
    // TODO Handle request dto validation.
    await addSubscriptionUseCase(req.body)

    res.status(StatusCodes.CREATED).end();
  } catch(e: unknown) {
    if (e instanceof InvalidEntity) {
      res
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json(new WrongEmailAddressFormatErrorResponse());
    } else if (e instanceof EmailAlreadyExists) {
      res
        .status(StatusCodes.CONFLICT)
        .json(new EmailAlreadyTakenErrorResponse());
    } else if (e instanceof UnreachableEmailAddress) {
      res
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json(new ConfirmationEmailSendingFailureErrorResponse());
    } else {
      const message = (e as Error).message || (e as Error).stack || e;

      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(new InternalServerErrorResponse(message as string));
    }
  }
}

export default {
  handleDelete,
  handleInsert
};
