<script lang="ts">
	import { isLoading, getTransactions } from "../stores/transactionStore";
	import { onMount } from "svelte/internal";
	import type { Transaction } from "../interfaces/Transactions";

	export async function updateTransactions() {
		const response = await getTransactions();
		transactions = response
			.map((tr: Transaction) =>{
				return {
					id: tr.id,
					transactionDay:new Date(tr.transactionDay),
					uploadDate: new Date(tr.uploadDate).toISOString()
				} 
			});
		isLoading.set(false);
	}

	onMount(async () => {
		updateTransactions();
	});
	$: transactions = Array<Transaction>();

	function formatDate(date : Date){
		const split = date.toString().split('T');
		
		const localized = new Date(split[0] as string).toLocaleDateString('pt-BR');
		const hours = split[1]?.split('.')[0];
		
		return `${localized} - ${hours}`;
	}
</script>

<main>
	<h1>Importações realizadas</h1>
	{#if $isLoading}
		<p>Loading...</p>
	{:else if transactions.length > 0}
		<table>
			<thead>
				<tr>
					<th>Data transações</th>
					<th>Data importação</th>
				</tr>
				{#each transactions as transaction}
					<tr>
						<td>
							<h3>{transaction.transactionDay.toLocaleDateString('pt-BR')}</h3>
						</td>
						<td>
							<h3>{formatDate(transaction.uploadDate)}</h3>
						</td>
					</tr>
				{/each}
			</thead>
		</table>
	{:else}
		<p>No transactions</p>
	{/if}
</main>

<style>
	h1 {
		text-align: center;
	}
	table {
		border-collapse: collapse;
		width: 100%;
	}

	td,
	th {
		border: 1px solid #dddddd;
		text-align: left;
		padding: 8px;
	}

	tr:nth-child(even) {
		background-color: #dddddd;
	}
</style>
