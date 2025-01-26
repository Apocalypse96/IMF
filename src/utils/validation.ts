import { GadgetStatus } from '../types/gadget';

export const validateGadgetStatus = (status: string): boolean => {
  return Object.values(GadgetStatus).includes(status as GadgetStatus);
};