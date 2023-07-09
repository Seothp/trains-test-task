export type Characteristic = {
  speed: number;
  force: number;
  engineAmperage: number;
};

export type Train = {
  name: string;
  description: string;
  characteristics: Characteristic[];
};