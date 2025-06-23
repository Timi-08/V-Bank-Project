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
    return fetch(`${BASE_URL}/UserDetails?id=${userId}`).then((res) =>
      res.json()
    );
  },
  updateAccount: (account) => {
    return fetch(`${BASE_URL}/UserDetails/${account.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(account),
    });
  },
  getAllAccounts: () =>
    fetch(`${BASE_URL}/UserDetails`).then((res) => res.json()),

  createTransfer: async (data) => {
    const res = await fetch(`${BASE_URL}/TransactionDetails`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  getTransfers: () => {
    return fetch(`${BASE_URL}/TransactionDetails`).then((res) => res.json());
  },
  setTransactions: (transactions) => {
    return fetch(`${BASE_URL}/TransactionDetails`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(transactions),
    });
  },
};
