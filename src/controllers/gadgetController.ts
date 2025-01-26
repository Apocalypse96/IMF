import { RequestHandler } from 'express-serve-static-core';
import { v4 as uuidv4 } from 'uuid';
import Gadget from '../models/gadget';
import { GadgetStatus } from '../types/gadget';
import { generateCodename } from '../utils/codename-generator';

// Types
interface IdParams {
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

interface CreateGadgetAttributes {
  id: string;
  name: string;
  status: GadgetStatus;
  createdAt: Date;
  updatedAt: Date;
}

export const getGadgets: RequestHandler<{}, any, any, StatusQuery> = async (req, res, next) => {
  try {
    const status = req.query.status;
    const where = status ? { status } : {};
    
    const gadgets = await Gadget.findAll({ where });
    const gadgetsWithProbability = gadgets.map(gadget => ({
      ...gadget.toJSON(),
      missionSuccessProbability: Math.floor(Math.random() * 30) + 70
    }));
    
    res.json(gadgetsWithProbability);
  } catch (error) {
    next(error);
  }
};

export const createGadget: RequestHandler = async (req, res, next) => {
  try {
    const now = new Date();
    const gadgetData: CreateGadgetAttributes = {
      id: uuidv4(),
      name: generateCodename(),
      status: GadgetStatus.Available,
      createdAt: now,
      updatedAt: now
    };

    const gadget = await Gadget.create(gadgetData);
    res.status(201).json(gadget);
  } catch (error) {
    next(error);
  }
};

export const updateGadget: RequestHandler<IdParams, any, UpdateGadgetBody> = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const gadget = await Gadget.findByPk(id);
    if (!gadget) {
      res.status(404).json({ message: 'Gadget not found' });
      return;
    }

    await gadget.update({ 
      status,
      updatedAt: new Date()
    });
    res.json(gadget);
  } catch (error) {
    next(error);
  }
};

export const decommissionGadget: RequestHandler<IdParams> = async (req, res, next) => {
  try {
    const { id } = req.params;
    const gadget = await Gadget.findByPk(id);
    
    if (!gadget) {
      res.status(404).json({ message: 'Gadget not found' });
      return;
    }

    await gadget.update({
      status: GadgetStatus.Decommissioned,
      decommissionedAt: new Date(),
      updatedAt: new Date()
    });

    res.json(gadget);
  } catch (error) {
    next(error);
  }
};

export const selfDestruct: RequestHandler<IdParams, any, SelfDestructBody> = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { confirmationCode } = req.body;

    if (!confirmationCode || confirmationCode !== process.env.CONFIRMATION_CODE) {
      res.status(400).json({ message: 'Invalid confirmation code' });
      return;
    }

    const gadget = await Gadget.findByPk(id);
    if (!gadget) {
      res.status(404).json({ message: 'Gadget not found' });
      return;
    }

    await gadget.update({ 
      status: GadgetStatus.Destroyed,
      updatedAt: new Date()
    });
    res.json({ message: 'Gadget self-destruct sequence completed' });
  } catch (error) {
    next(error);
  }
};