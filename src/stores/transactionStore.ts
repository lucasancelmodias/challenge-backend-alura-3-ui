import { writable } from "svelte/store";

export const isLoading = writable(false);

export async function getTransactions() {

    isLoading.set(true);
    const response = await fetch(`${process.env.API_URL}/transactionslog`);
	
    return response.json();
}
