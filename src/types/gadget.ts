export enum GadgetStatus {
  Available = "Available",
  Deployed = "Deployed",
  Destroyed = "Destroyed",
  Decommissioned = "Decommissioned"
}

export interface IGadget {
  id: string;
  name: string;
  status: GadgetStatus;
  decommissionedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IGadgetCreate {
  name: string;
  status: GadgetStatus;
}

export interface IGadgetWithProbability extends IGadget {
  missionSuccessProbability: number;
}