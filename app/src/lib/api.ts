import { Card, Deck, DeckWithUserData, User } from "./types.ts";
import {
  getAuthenticatedUser,
  getAuthenticatedUserToken,
  removeAuthenticatedUserToken,
  storeAuthenticatedUserToken,
} from "./auth.ts";

const API_URL = import.meta.env.VITE_API_URL;

// Delete deck by id
export const deleteDeck = async (id: string): Promise<void> => {
  const token = getAuthenticatedUserToken();
  const response = await fetch(`${API_URL}/decks/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const responseJson = await response.json();

  if (!response.ok) {
    handleError(response, responseJson);
  }
};

// Create a new deck
export const createDeck = async (
  content: string,
): Promise<DeckWithUserData> => {
  const user = getAuthenticatedUser();
  const token = getAuthenticatedUserToken();

  const response = await fetch(`${API_URL}/decks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title: content }),
  });

  const responseJson = await response.json();

  if (!response.ok) {
    handleError(response, responseJson);
  }
  return {
    ...responseJson.data,
    user: user,
  };
};

// Update deck by id
export const updateDeck = async (
  id: string,
  updatedTitle: string,
): Promise<Deck | null> => {
  const user = getAuthenticatedUser();
  const token = getAuthenticatedUserToken();
  const response = await fetch(`${API_URL}/decks/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title: updatedTitle }),
  });
  const responseJson = await response.json();
  if (!response.ok) {
    handleError(response, responseJson);
  }
  return {
    ...responseJson.data,
    user: user,
  };
};

// returns all decks belonging to the user
export const fetchDecks = async (): Promise<DeckWithUserData[]> => {
  const user = getAuthenticatedUser();
  const token = getAuthenticatedUserToken();
  const response = await fetch(
    `${API_URL}/decks?username=${user.username}&withUserData=true`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const responseJson = await response.json();

  if (!response.ok) {
    handleError(response, responseJson);
  }
  return responseJson.data;
};

// Login, store the token, and return the user
export const login = async (
  username: string,
  password: string,
): Promise<User> => {
  const response = await fetch(`${API_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  const responseJson = await response.json();

  if (!response.ok) {
    throw new Error(
      `Error: ${response.status} - ${
        responseJson.message || response.statusText
      }`,
    );
  }

  const { access_token } = responseJson.data;

  if (!access_token) {
    throw new Error("Authentication token is missing from the response!");
  }

  storeAuthenticatedUserToken(access_token);
  const user = getAuthenticatedUser();
  return user;
};

// Logout and clear the token
export const logout = async (): Promise<void> => {
  // You can send a request to the server to perform server-side logout
  // Here we just clear the token
  removeAuthenticatedUserToken();
};

// Register a new user
export const register = async (
  username: string,
  password: string,
  displayName: string,
  avatar?: string,
): Promise<void> => {
  const response = await fetch(`${API_URL}/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password, displayName, avatar }),
  });
  const responseJson = await response.json();

  if (!response.ok) {
    throw new Error(
      `Error: ${response.status} - ${
        responseJson.message || response.statusText
      }`,
    );
  }
};

export const handleError = (response: Response, message?: string) => {
  if (response.status === 401) {
    removeAuthenticatedUserToken();
    throw new Error("Your session has expired. Please login again.");
  }

  throw new Error(
    `Error: ${response.status} - ${message || response.statusText}`,
  );
};

// for flashcards
// fetch all flashcards
export const fetchCards = async (deckId: string): Promise<Card[]> => {
  const token = getAuthenticatedUserToken();

  const response = await fetch(`${API_URL}/decks/${deckId}/cards`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const responseJson = await response.json();

  if (!response.ok) {
    handleError(response, responseJson.message);
  }

  return responseJson.data;
};

// create a new card
export const createCard = async (
  deckId: string,
  newFront: string,
  newBack: string,
): Promise<Card> => {
  const token = getAuthenticatedUserToken();

  const response = await fetch(`${API_URL}/decks/${deckId}/cards`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ front: newFront, back: newBack }),
  });
  const responseJson = await response.json();

  if (!response.ok) {
    handleError(response, responseJson.message);
  }

  return {
    ...responseJson.data,
  };
};

// delete a card
export const deleteCard = async (deckId: string, id: string): Promise<void> => {
  const token = getAuthenticatedUserToken();
  const response = await fetch(`${API_URL}/decks/${deckId}/cards/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const responseJson = await response.json();

  if (!response.ok) {
    handleError(response, responseJson);
  }
};

// update a card
export const editCard = async (
  deckId: string,
  id: string,
  updatedFront: string,
  updatedBack: string,
): Promise<Deck | null> => {
  const token = getAuthenticatedUserToken();
  const response = await fetch(`${API_URL}/decks/${deckId}/cards/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ front: updatedFront, back: updatedBack }),
  });
  const responseJson = await response.json();
  if (!response.ok) {
    handleError(response, responseJson);
  }
  return {
    ...responseJson.data,
  };
};

// Fetch a post given its id
export const fetchDeckById = async (id: string): Promise<Deck> => {
  const response = await fetch(`${API_URL}/decks/${id}`);
  const responseJson = await response.json();

  if (!response.ok) {
    handleError(response, responseJson.message);
  }

  return responseJson.data;
};
