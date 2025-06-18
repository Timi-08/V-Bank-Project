const BASE_URL = "https://68415c16d48516d1d35b3a73.mockapi.io/api/v1";

export const mockApi = {
  createUser: (user) => {
    return fetch(`${BASE_URL}/UserDetails`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
  },
  getUsers: () => {
    return fetch(`${BASE_URL}/UserDetails`).then((res) => res.json());
  },
  getUserById: (id) => {
    return fetch(`${BASE_URL}/UserDetails/${id}`).then((res) => res.json());
  },
  createAccount: (account) => {
    return fetch(`${BASE_URL}/Account`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(account),
    });
  },
  getAccountsByUserId: (userId) => {
    return fetch(`${BASE_URL}/Account?id=${userId}`).then((res) => res.json());
  },
  updateAccount: (account) => {
    return fetch(`${BASE_URL}/Account/${account.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(account),
    });
  },

  createTransfer: async (data) => {
    const res = await fetch(`${BASE_URL}/transfers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  getAllAccounts: () => fetch(`${BASE_URL}/Account`).then((res) => res.json()),
};
