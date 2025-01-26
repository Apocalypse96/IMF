import { Router } from 'express';
import { RequestHandler } from 'express-serve-static-core';
import { ParamsDictionary } from 'express-serve-static-core';
import { authenticate } from '../middleware/auth';
import {
  getGadgets,
  createGadget,
  updateGadget,
  decommissionGadget,
  selfDestruct
} from '../controllers/gadgetController';
import { GadgetStatus } from '../types/gadget';

const router = Router();

// Define our parameter interfaces
interface IdParams extends ParamsDictionary {
  id: string;
}

interface StatusQuery {
  status?: GadgetStatus;
}

interface UpdateGadgetBody {
  status: GadgetStatus;
}

interface SelfDestructBody {
  confirmationCode: string;
}

// Type the handlers explicitly
const typedGetGadgets: RequestHandler<{}, any, {}, StatusQuery> = getGadgets;
const typedCreateGadget: RequestHandler = createGadget;
const typedUpdateGadget: RequestHandler<IdParams, any, UpdateGadgetBody> = updateGadget;
const typedDecommissionGadget: RequestHandler<IdParams> = decommissionGadget;
const typedSelfDestruct: RequestHandler<IdParams, any, SelfDestructBody> = selfDestruct;

// Routes with typed handlers
router.get('/', 
  authenticate,
  typedGetGadgets
);

router.post('/', 
  authenticate,
  typedCreateGadget
);

router.patch('/:id',
  authenticate,
  typedUpdateGadget
);

router.delete('/:id',
  authenticate,
  typedDecommissionGadget
);

router.post('/:id/self-destruct',
  authenticate,
  typedSelfDestruct
);

export default router;