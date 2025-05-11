export interface IcebreakerRequest {
  senderProfile: string;
  recipientProfile: string;
  language: string;
  problem: string;
  solution: string;
}

export interface IcebreakerResponse {
  messages: string[];
}
